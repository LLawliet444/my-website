#!/usr/bin/env python3
"""Detect bounding boxes of all logos in cute_logos.png using connected components."""
import os
from PIL import Image
import numpy as np
from collections import deque

SRC = "/Users/xinxinzhang/Documents/my_web/public/images/cute_logos.png"
img = Image.open(SRC).convert("RGBA")
arr = np.array(img)
h, w = arr.shape[:2]
print(f"Image: {w}x{h}")

rgb = arr[:, :, :3].astype(int)
brightness = rgb.mean(axis=2)
# Colored backgrounds (pink, blue, yellow) are also non-white, so use a
# separate approach to detect ink (dark pixels)
ink = brightness < 200

# Dilate to merge nearby strokes of same logo
def dilate(mask, r):
    if r <= 0:
        return mask
    out = mask.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            if dx == 0 and dy == 0:
                continue
            shifted = np.zeros_like(mask)
            ys = slice(max(0, dy), h + min(0, dy))
            xs = slice(max(0, dx), w + min(0, dx))
            ty = slice(max(0, -dy), h + min(0, -dy))
            tx = slice(max(0, -dx), w + min(0, -dx))
            shifted[ty, tx] = mask[ys, xs]
            out |= shifted
    return out

dilated = dilate(ink, 6)

visited = np.zeros((h, w), dtype=bool)
components = []
for y in range(h):
    for x in range(w):
        if dilated[y, x] and not visited[y, x]:
            q = deque()
            q.append((y, x))
            visited[y, x] = True
            miny, maxy, minx, maxx = y, y, x, x
            count = 0
            while q:
                cy, cx = q.popleft()
                count += 1
                if cy < miny: miny = cy
                if cy > maxy: maxy = cy
                if cx < minx: minx = cx
                if cx > maxx: maxx = cx
                for ny, nx in ((cy-1, cx), (cy+1, cx), (cy, cx-1), (cy, cx+1)):
                    if 0 <= ny < h and 0 <= nx < w and dilated[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = True
                        q.append((ny, nx))
            bh = maxy - miny + 1
            bw = maxx - minx + 1
            # Keep components of reasonable size
            if count > 800 and bh > 30 and bw > 30:
                components.append((miny, maxy, minx, maxx, count, bh, bw))

print(f"Found {len(components)} components")
# Sort by position (top, then left)
components.sort(key=lambda c: (c[0] // 100, c[2]))
for i, (miny, maxy, minx, maxx, count, bh, bw) in enumerate(components):
    print(f"  #{i:2d}: y=[{miny:4d},{maxy:4d}] x=[{minx:4d},{maxx:4d}] size={bh:3d}x{bw:3d} px={count:5d}")
