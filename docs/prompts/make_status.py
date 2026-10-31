#!/usr/bin/env python3
"""يولّد docs/prompts/STATUS.md: كل صورة مخطّطة | موجودة / مؤقتة / ناقصة | الطبقة.
الاستعمال من جذر الريبو:  python3 docs/prompts/make_status.py
- المصدر: ملفات الصور الفردية docs/prompts/ch1..ch5/NN_id.md (سطر «الملف» وسطر «الطبقة»).
- «ناقصة»: الملف غير موجود في public/art. «مؤقتة»: موجود لكنه نفس صورة النسخة الأولى المسجّلة في PLACEHOLDERS.md
  (تُقارَن بأول نسخة أضيفت للملف في git، فإذا استُبدلت بصورة فعلية تصير «موجودة» تلقائياً بلا تعديل يدوي).
- طبقة صورة اللغز c4-l2-puzzle تُحسب A (كما في make_readme.py)."""
import re, glob, os, subprocess, sys
from datetime import date

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ART = os.path.join(ROOT, "artifacts", "nile-secrets", "public", "art")
PH_FILE = os.path.join(ART, "PLACEHOLDERS.md")

def git(*args):
    return subprocess.run(["git", "-C", ROOT, *args], capture_output=True)

# مسارات مؤقتة مذكورة في PLACEHOLDERS.md (صور الخلفيات cN/lM.webp فقط؛ بورتريهات النسخة الأولى الأربعة نهائية)
listed = set()
if os.path.exists(PH_FILE):
    # نقبل ما ورد بين شرطتين خلفيتين فقط، مثل `c2/l1.webp`
    listed = set(re.findall(r"`(c\d/l\d\.webp)`", open(PH_FILE, encoding="utf-8").read()))

def is_placeholder(rel):
    """رجّع True إن كان الملف ما زال نسخة النسخة الأولى."""
    if rel not in listed: return False
    path = os.path.join(ART, rel)
    full = f"artifacts/nile-secrets/public/art/{rel}"
    r = git("log", "--diff-filter=A", "--format=%H", "--", full)
    commits = r.stdout.decode().split()
    if r.returncode != 0 or not commits:
        return True                      # لا تاريخ git: نعتمد قائمة PLACEHOLDERS.md
    first = git("show", f"{commits[-1]}:{full}")
    if first.returncode != 0: return True
    return open(path, "rb").read() == first.stdout

rows, seen = [], set()
for f in sorted(glob.glob(os.path.join(ROOT, "docs", "prompts", "ch[1-5]", "[0-9][0-9]_*.md"))):
    base = os.path.basename(f)
    if base.startswith("00_"): continue
    txt = open(f, encoding="utf-8").read()
    m = re.search(r"الملف: `public/art/([^`]+)`", txt)
    if not m: continue
    dest = m.group(1)
    num, iid = re.match(r"(\d+)_(.+)\.md", base).groups()
    if iid in seen: continue
    seen.add(iid)
    ch = int(os.path.basename(os.path.dirname(f))[2:])
    lay = re.search(r"الطبقة (\w)", txt)
    layer = lay.group(1) if lay else "B"
    if iid.endswith("-puzzle"): layer = "A"
    if not os.path.exists(os.path.join(ART, dest)): status = "ناقصة"
    elif is_placeholder(dest): status = "مؤقتة"
    else: status = "موجودة"
    kind = "شاشة" if dest.startswith("ui/") else "بورتريه" if dest.startswith("chars/") else "أيقونة" if dest.startswith("items/") else "خلفية"
    rows.append(dict(ch=ch, n=int(num), id=iid, dest=dest, status=status, layer=layer, kind=kind))

order = {"ناقصة": 0, "مؤقتة": 1, "موجودة": 2}
tot = len(rows)
cnt = lambda **k: sum(all(r[a] == b for a, b in k.items()) for r in rows)
L = ["# STATUS — حالة صور اللعبة", "",
     f"> مولَّد آلياً بـ `python3 docs/prompts/make_status.py` (آخر تحديث {date.today().isoformat()}). لا تعدّله يدوياً. الحالة: **موجودة** (صورة فعلية) | **مؤقتة** (صورة من النسخة الأولى تُستبدل بنفس الاسم) | **ناقصة** (لا ملف؛ تسقط الواجهة لبديل). الطبقة A لازمة للتسليم.", "",
     f"**المخطّط {tot} صورة:** موجودة {cnt(status='موجودة')}، مؤقتة {cnt(status='مؤقتة')}، ناقصة {cnt(status='ناقصة')}.",
     f"**الطبقة A:** موجودة {cnt(status='موجودة', layer='A')} من {cnt(layer='A')}، مؤقتة {cnt(status='مؤقتة', layer='A')}، ناقصة {cnt(status='ناقصة', layer='A')}.",
     f"**الطبقة B:** موجودة {cnt(status='موجودة', layer='B')} من {cnt(layer='B')}، مؤقتة {cnt(status='مؤقتة', layer='B')}، ناقصة {cnt(status='ناقصة', layer='B')}.", ""]
for ch in range(1, 6):
    rs = [r for r in rows if r["ch"] == ch]
    L += [f"## دفعة الفصل {ch} ({len(rs)})", "", "| # | ID | النوع | الملف | الحالة | الطبقة |", "|---|---|---|---|---|---|"]
    for r in sorted(rs, key=lambda r: r["n"]):
        L.append(f"| {r['n']:02d} | `{r['id']}` | {r['kind']} | `{r['dest']}` | {r['status']} | {r['layer']} |")
    L.append("")
L += ["## المتبقي (غير موجودة) حسب الأولوية", ""]
rest = [r for r in rows if r["status"] != "موجودة"]
for lay in ("A", "B"):
    xs = [r for r in sorted(rest, key=lambda r: (order[r["status"]] * 0 + r["ch"], r["n"])) if r["layer"] == lay]
    L.append(f"**الطبقة {lay} ({len(xs)}):** " + (", ".join(f"`{r['id']}`" + (" (مؤقتة)" if r["status"] == "مؤقتة" else "") for r in xs) or "لا شيء"))
    L.append("")
open(os.path.join(ROOT, "docs", "prompts", "STATUS.md"), "w", encoding="utf-8").write("\n".join(L))
print(tot, "images;", {s: cnt(status=s) for s in order})
