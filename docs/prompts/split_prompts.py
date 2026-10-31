#!/usr/bin/env python3
"""يقسم PROMPTS_0N_*.md إلى ملف لكل صورة داخل docs/prompts/chN/ (لمازن). الاستعمال: python3 split_prompts.py PROMPTS_01_CH1.md"""
import re, sys, os, shutil
src = sys.argv[1]
n = re.search(r"PROMPTS_0(\d)", src).group(1)
out = f"ch{n}"; os.makedirs(out, exist_ok=True)
txt = open(src, encoding="utf-8").read()
parts = re.split(r"\n(?=### \d+ — )", txt)
count = 0
for p in parts:
    m = re.match(r"### (\d+) — ([\w-]+)\n", p)
    if not m: continue
    num, iid = int(m.group(1)), m.group(2)
    body = p[m.end():].split("\n## ")[0].split("\n---")[0].rstrip()
    f = re.search(r"الملف: `([^`]+)`", body)
    dest = f.group(1) if f else "?"
    png = iid + ".png"
    ref = "nour.png" if "nour.png" in body else "village.jpg"
    head = f"""# صورة {num:02d} — {iid}

> **الخطوة 1:** ارفق مع هذا الملف في جيمناي: `00_RULES_FOR_GEMINI.md` (إن لم تكن مرفوعة في نفس المحادثة) + صورة المرجع `_references/{ref}`.
> **الخطوة 2:** قل لجيمناي: «نفّذ هذا الملف: ولّد صورة واحدة فقط».
> **الخطوة 3:** حين ترضى عن الصورة احفظها باسم **`{png}`** (هذا الاسم بالضبط) وأرسلها لـ Claude A ليحوّلها ويضعها في `{dest}`.

"""
    open(f"{out}/{num:02d}_{iid}.md", "w", encoding="utf-8").write(head + body + "\n")
    count += 1
print(count, "files in", out)
