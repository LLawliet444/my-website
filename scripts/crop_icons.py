#!/usr/bin/env python3
"""Crop icons from various rows in cute_logos.png."""
import os
from PIL import Image

SRC = "/Users/xinxinzhang/Documents/my_web/public/images/cute_logos.png"
OUT_DIR = "/Users/xinxinzhang/Documents/my_web/scripts/identify"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGBA")
w, h = img.size

PAD = 8
# Row 7-8 (y ~ 770-934): 4 icons with text labels
row7 = {
    "r7_a": (118, 772, 224, 887),
    "r7_b": (358, 776, 466, 881),
    "r7_c": (584, 771, 708, 884),
    "r7_d": (837, 770, 961, 890),
}
# Row 9-10: larger icons (with text below)
row9 = {
    "r9_a": (153, 1006, 341, 1136),    # cat with text?
    "r9_b": (439, 1020, 582, 1121),   # heart with text?
    "r9_c": (721, 1026, 813, 1112),    # fish with text?
    "r9_d": (924, 976, 1133, 1118),   # larger
    "r9_e": (1141, 1079, 1188, 1130), # small
}

for name, (x0, y0, x1, y1) in {**row7, **row9}.items():
    crop = img.crop((max(0, x0-PAD), max(0, y0-PAD), min(w, x1+PAD), min(h, y1+PAD)))
    out = os.path.join(OUT_DIR, f"{name}.png")
    crop.save(out)
    print(f"{name}: {crop.size[0]}x{crop.size[1]} -> {out}")
