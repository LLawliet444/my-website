#!/usr/bin/env python3
"""Final crops: title tags + cat + heart + fish (icons only)."""
import os
from PIL import Image

SRC = "/Users/xinxinzhang/Documents/my_web/public/images/cute_logos.png"
OUT_DIR = "/Users/xinxinzhang/Documents/my_web/public/images/cute"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGBA")
w, h = img.size

PAD = 6

# Title tags from row 1
title_crops = {
    "title-recent":   (101, 42, 388, 130),     # 最近写了啥 ✏️
    "title-projects": (465, 41, 727, 131),     # 我的项目 📁
    "title-about":    (810, 40, 1058, 128),    # 关于我 🙂
}

# Icons from row 9 (full bounds — the r9_a is just a cat, no speech bubble)
icon_crops = {
    "cat":   (153, 1006, 341, 1130),   # full black cat
    "fish":  (439, 1020, 582, 1090),   # blue fish
    "heart": (721, 1026, 813, 1112),   # pink heart
}

for name, (x0, y0, x1, y1) in {**title_crops, **icon_crops}.items():
    crop = img.crop((max(0, x0-PAD), max(0, y0-PAD), min(w, x1+PAD), min(h, y1+PAD)))
    out = os.path.join(OUT_DIR, f"{name}.png")
    crop.save(out)
    print(f"{name}: {crop.size[0]}x{crop.size[1]} -> {out}")
