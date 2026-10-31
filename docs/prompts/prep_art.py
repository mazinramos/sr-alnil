#!/usr/bin/env python3
"""يحوّل صور جيمناي (PNG/JPG باسم id.png) إلى WebP بالمقاس والمسار الصحيحين.
الاستعمال: python3 prep_art.py <مجلد_الصور_الخام> <جذر_الريبو>
- يقرأ جداول المسارات من docs/prompts/ch*/NN_id.md (سطر «الملف»).
- الشخصيات والأيقونات: يزيل الخلفية الرمادية الفاتحة (ملء من الحواف) ثم يصغّر.
- الخلفيات: قص مركزي 3:2 ثم تصغير.  الحدود: خلفية 250KB، بورتريه 200KB، أيقونة 40KB."""
import sys, os, re, glob, io
import numpy as np
from PIL import Image, ImageFilter
from collections import deque

raw, repo = sys.argv[1], sys.argv[2]
dest_of = {}
for f in glob.glob(os.path.join(repo, "docs/prompts/ch*/[0-9][0-9]_*.md")):
    iid = re.match(r"\d+_(.+)\.md", os.path.basename(f)).group(1)
    m = re.search(r"الملف: `([^`]+)`", open(f, encoding="utf-8").read())
    if m: dest_of[iid] = m.group(1)

def remove_bg(im, tol=28):
    a = np.array(im.convert("RGB")).astype(int); h, w, _ = a.shape
    corners = [a[0,0], a[0,w-1], a[h-1,0], a[h-1,w-1]]
    ref = np.median(np.array(corners), axis=0)
    close = (np.abs(a - ref).sum(axis=2) <= tol * 3)
    seen = np.zeros((h, w), bool); q = deque()
    for x in range(w):
        for y in (0, h-1):
            if close[y,x] and not seen[y,x]: seen[y,x] = True; q.append((y,x))
    for y in range(h):
        for x in (0, w-1):
            if close[y,x] and not seen[y,x]: seen[y,x] = True; q.append((y,x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and close[ny,nx] and not seen[ny,nx]:
                seen[ny,nx] = True; q.append((ny,nx))
    alpha = Image.fromarray(np.where(seen, 0, 255).astype("uint8")).filter(ImageFilter.GaussianBlur(1.2))
    out = im.convert("RGBA"); out.putalpha(alpha); return out

def save(im, path, limit_kb):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    for q in range(85, 30, -5):
        buf = io.BytesIO(); im.save(buf, "WEBP", quality=q, method=6)
        if buf.tell() <= limit_kb * 1024: break
    open(path, "wb").write(buf.getvalue()); return q, buf.tell() // 1024

for f in sorted(glob.glob(os.path.join(raw, "*"))):
    iid, ext = os.path.splitext(os.path.basename(f))
    if ext.lower() not in (".png", ".jpg", ".jpeg", ".webp"): continue
    d = dest_of.get(iid)
    if not d: print("؟ لا أعرف مسار", iid); continue
    im = Image.open(f).convert("RGB")
    if d.startswith("public/art/chars/"):
        im = remove_bg(im); size, lim = (768, 768), 200
    elif d.startswith("public/art/items/"):
        im = remove_bg(im); size, lim = (256, 256), 40
    elif "puzzle" in d:
        size, lim = (1024, 1024), 250
    else:
        size, lim = (1536, 1024), 250 if "/ui/" not in d else 300
    w, h = im.size; tw, th = size
    r = tw / th
    if abs(w / h - r) > 0.01:
        nw, nh = (int(h * r), h) if w / h > r else (w, int(w / r))
        l, t = (w - nw) // 2, (h - nh) // 2
        im = im.crop((l, t, l + nw, t + nh))
    im = im.resize(size, Image.LANCZOS)
    q, kb = save(im, os.path.join(repo, "artifacts/nile-secrets", d), lim)
    print(f"✓ {iid} → {d}  ({kb}KB, q{q})")
