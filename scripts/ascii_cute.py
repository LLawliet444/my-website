#!/usr/bin/env python3
"""Visualize the cute_logos.png image as ASCII art to identify regions."""
from PIL import Image
import numpy as np

SRC = "/Users/xinxinzhang/Documents/my_web/public/images/cute_logos.png"
img = Image.open(SRC).convert("RGBA")
arr = np.array(img)
h, w = arr.shape[:2]
print(f"Image: {w}x{h}")

rgb = arr[:, :, :3].astype(int)
brightness = rgb.mean(axis=2)
ink = brightness < 200

# Downsample to ~140 columns
target_cols = 140
scale = w / target_cols
target_rows = int(h / scale)

chars = " .:-=+*#%@"
print("=" * target_cols)
for r in range(target_rows):
    line = ""
    for c in range(target_cols):
        y0 = int(r * scale)
        y1 = int((r + 1) * scale)
        x0 = int(c * scale)
        x1 = int((c + 1) * scale)
        block = ink[y0:y1, x0:x1]
        ratio = block.mean()
        idx = min(int(ratio * len(chars)), len(chars) - 1)
        line += chars[idx]
    print(line)
