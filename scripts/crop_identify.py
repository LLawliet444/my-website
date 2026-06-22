#!/usr/bin/env python3
"""Crop various regions from cute_logos.png for identification."""
import os
from PIL import Image

SRC = "/Users/xinxinzhang/Documents/my_web/public/images/cute_logos.png"
OUT_DIR = "/Users/xinxinzhang/Documents/my_web/scripts/identify"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGBA")
w, h = img.size

# Title tags from row 1 (with padding)
PAD = 8
# Bounding boxes from connected components (with their text included)
boxes = {
    "tag1_recent": (101, 42, 388, 130),     # probably 最近写了啥
    "tag2_projects": (465, 41, 727, 131),   # probably 我的项目
    "tag3_about": (810, 40, 1058, 128),     # probably 关于我
    "tag4_?" : (103, 179, 417, 268),
    "tag5_?": (490, 176, 832, 280),
    "tag6_?": (896, 176, 1236, 281),
}

for name, (x0, y0, x1, y1) in boxes.items():
    crop = img.crop((max(0, x0-PAD), max(0, y0-PAD), min(w, x1+PAD), min(h, y1+PAD)))
    out = os.path.join(OUT_DIR, f"{name}.png")
    crop.save(out)
    print(f"{name}: {crop.size[0]}x{crop.size[1]} -> {out}")
