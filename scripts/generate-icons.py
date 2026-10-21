#!/usr/bin/env python3
"""Generate PNG app icons without third-party libraries."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ICONS = PUBLIC / "icons"

INK = (11, 31, 58, 255)
GOLD = (232, 184, 109, 255)
CARD = (20, 49, 84, 255)
WHITE = (244, 247, 251, 255)


def png(width: int, height: int, pixels: list[tuple[int, int, int, int]]) -> bytes:
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        for x in range(width):
            r, g, b, a = pixels[y * width + x]
            raw.extend((r, g, b, a))

    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + chunk(b"IEND", b"")


def draw_icon(size: int, maskable: bool = False) -> bytes:
    pixels: list[tuple[int, int, int, int]] = []
    cx = cy = size / 2
    pad = size * 0.18 if maskable else size * 0.08
    radius = (size / 2) - pad
    for y in range(size):
        for x in range(width_x := size):
            dx = x + 0.5 - cx
            dy = y + 0.5 - cy
            dist = (dx * dx + dy * dy) ** 0.5
            if dist > radius:
                pixels.append((0, 0, 0, 0) if maskable else INK)
                continue
            color = CARD
            # speech bubble
            bx, by, bw, bh = cx, cy - size * 0.04, size * 0.28, size * 0.18
            if ((x + 0.5 - bx) / bw) ** 2 + ((y + 0.5 - by) / bh) ** 2 <= 1:
                color = GOLD
            # tail
            if cy + size * 0.02 <= y <= cy + size * 0.16 and abs(x - (cx - size * 0.08)) <= (y - cy) * 0.35:
                color = GOLD
            # three dots
            for nx in (cx - size * 0.09, cx, cx + size * 0.09):
                nd = ((x + 0.5 - nx) ** 2 + (y + 0.5 - (cy - size * 0.05)) ** 2) ** 0.5
                if nd <= size * 0.025:
                    color = INK
            pixels.append(color)
    return png(size, size, pixels)


def write(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def main() -> None:
    write(PUBLIC / "apple-touch-icon.png", draw_icon(180))
    write(ICONS / "icon-192.png", draw_icon(192))
    write(ICONS / "icon-512.png", draw_icon(512))
    write(ICONS / "icon-512-maskable.png", draw_icon(512, maskable=True))
    print("icons written")


if __name__ == "__main__":
    main()
