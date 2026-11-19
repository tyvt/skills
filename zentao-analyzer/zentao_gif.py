#!/usr/bin/env python3
"""zentao_gif.py — 用 ffmpeg 把有序 PNG 帧合成 GIF，用于回写展示操作过程。

agent-browser 原生只能截静态 PNG；本脚本把多帧截图拼成 GIF（禅道按图片内嵌，
自动循环播放，无需 video 通道）。

用法：
  python zentao_gif.py <frames_dir> <out.gif> [--fps 5] [--width 900] [--pattern "frame*.png"]

stdout（单行）：
  OK <绝对路径>    合成成功
  ERR <reason>     失败（退出码非 0）
"""

import argparse
import glob
import os
import shutil
import subprocess
import sys

FFMPEG = os.environ.get("ZENTAO_FFMPEG") or r"D:\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe"


def main():
    ap = argparse.ArgumentParser(description="把有序 PNG 帧合成 GIF")
    ap.add_argument("frames_dir", help="帧目录")
    ap.add_argument("out", help="输出 gif 路径")
    ap.add_argument("--fps", type=int, default=5, help="帧率，默认 5")
    ap.add_argument("--width", type=int, default=900, help="缩放宽度，默认 900（等比）")
    ap.add_argument("--pattern", default="frame*.png", help="帧匹配通配符，默认 frame*.png")
    args = ap.parse_args()

    if not os.path.isdir(args.frames_dir):
        print("ERR frames dir not found: %s" % args.frames_dir)
        return 2
    frames = sorted(glob.glob(os.path.join(args.frames_dir, args.pattern)))
    if len(frames) < 2:
        print("ERR need >=2 frames, got %d (pattern=%s)" % (len(frames), args.pattern))
        return 2

    ffmpeg = FFMPEG if os.path.isfile(FFMPEG) else shutil.which("ffmpeg")
    if not ffmpeg:
        print("ERR ffmpeg not found (set ZENTAO_FFMPEG)")
        return 2

    out = os.path.abspath(args.out)
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    # 用 concat demuxer 避免按序号命名要求；逐帧时长 = 1/fps
    list_file = os.path.join(os.path.dirname(out), ".zentao_frames.txt")
    try:
        with open(list_file, "w", encoding="utf-8") as fh:
            for f in frames:
                fh.write("file '%s'\n" % f.replace("'", "'\\''"))
                fh.write("duration %s\n" % (1.0 / args.fps))
            fh.write("file '%s'\n" % frames[-1].replace("'", "'\\''"))
        palette = os.path.join(os.path.dirname(out), ".zentao_palette.png")
        vf = "scale=%d:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" % args.width
        cmd = [ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", list_file,
               "-vf", vf, "-loop", "0", out]
        r = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        if r.returncode != 0 or not os.path.isfile(out):
            print("ERR ffmpeg failed: %s" % r.stdout.decode("utf-8", "replace")[-300:])
            return 1
        with open(out, "rb") as fh:
            if fh.read(4) != b"GIF8":
                print("ERR output is not a GIF")
                return 1
        print("OK %s" % out)
        return 0
    except Exception as e:  # noqa: BLE001
        print("ERR %s" % e)
        return 1
    finally:
        for tmp in (list_file, os.path.join(os.path.dirname(out), ".zentao_palette.png")):
            if os.path.isfile(tmp):
                try:
                    os.unlink(tmp)
                except OSError:
                    pass


if __name__ == "__main__":
    sys.exit(main())
