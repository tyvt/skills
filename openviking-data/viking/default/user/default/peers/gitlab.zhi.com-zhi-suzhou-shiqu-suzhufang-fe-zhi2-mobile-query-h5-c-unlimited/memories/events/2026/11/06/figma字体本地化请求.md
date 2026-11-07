# Summary
用户要求将 figma 字体加载到本地仓库，避免每次刷新很慢（2026-11-06）。助手发现 theme.css 第1-6行 6 条 @font-face 指向 figma CDN，本地 src/static/fonts/ref8443/ 已有 NotoSansSC-VF_2、PlusJakartaSans_wght__2 文件，但实为 gzip 压缩的 TTF（非 woff2）。计划解压后用 fonttools 转真实 woff2 并改 @font-face 指向本地路径，在 worktree 执行（截至消息65 未完成 @font-face 改写）。
# 2026-11-06 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: figma字体先加载到本地仓库里面吧，不然每次刷新都很慢
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: You want to localize the Figma-hosted fonts so page refresh isn't slow. Let me first look at how fonts are currently referenced.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Clear picture: 6 `@font-face` rules (theme.css lines 1-6) point to `https://static.figma.com/font/...` — two VF (variable font) files:
- `NotoSansSC-VF_2` (used by weights 400/500/700)
- `PlusJakartaSans_wght__2` (used by 400/500/600)

I need to download these two woff2 files into the repo (e.g., `src/static/fonts/`) and update the `@font-face` `src` URLs to local paths. Let me first check static dir structure and how assets are referenced.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: There's already a `src/static/fonts/ref8443` directory. Let me see what's in the fonts dirs.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Interesting — the font files **already exist locally** in `src/static/fonts/ref8443/`:
- `NotoSansSC-VF_2.woff2` (11.2 MB)
- `PlusJakartaSans_wght__2.woff2` (79 KB)

But the `@font-face` rules in theme.css still point to the remote `https://static.figma.com/font/...` URLs. So the fix is simply to repoint `@font-face` `src` to the local static font files. Let me verify these local files are valid woff2 (magic `wOF2`) and check how theme.css is loaded (so I use the correct URL path — `/static/fonts/ref8443/...`).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The magic shows `?` (non-ASCII bytes display issue). Let me check the actual bytes in hex to confirm it's a real woff2 (`77 4F 46 32` = "wOF2").
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: The bytes start with `1F 8B 08 08` — that's **gzip magic** (`1F 8B`), NOT woff2 (`77 4F 46 32`). So these local files are **gzip-compressed** (the server served them with gzip Content-Encoding and they were saved compressed). They need to be decompressed to get the actual woff2.

Let me decompress and verify.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Decompressing gives magic `00 01 00 00` — that's **TrueType/OpenType (TTF/OTF)** font format, not woff2. So the Figma URL served a raw TTF (mislabeled as woff2, and gzip-encoded).

So the actual font bytes are **TTF** (decompressed: NotoSans ~17.7MB, PlusJakarta ~176KB). These are usable as web fonts if I:
1. Save the decompressed TTF, reference with `format('truetype')`, OR
2. Better: convert to real woff2 for smaller size (but no guaranteed converter offline).

Given the goal is just "load fonts locally so refresh isn't slow," the simplest robust approach: save the decompressed fonts locally and update `@font-face` to reference them as `format('truetype')`. But 17.7MB TTF is large — woff2 would be much smaller. Let me check if a woff2 tool is available (fonttools/python, or node woff2 package).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Python + **fonttools 4.63.0** is available — it can compress TTF → woff2 (via `brotli` which fonttools uses). Let me check brotli is available, then convert. This gives small, fast-loading woff2 files (matching original intent).
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: brotli + woff2 support are available. I'll convert the decompressed TTF to real woff2 with fonttools. But first — the fonts are **variable fonts** (VF: `NotoSansSC-VF_2`). Converting VF TTF to woff2 preserves variation. Let me do the conversion properly via a Python script, saving valid woff2 into the fonts dir (overwriting the gzip-fake files).

This is a repo asset change → I'll do it in a worktree per the rules. Let me create one.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited]**: Now write a Python conversion script that decompresses the originals (from the main dir, read-only source) and writes proper woff2 into the worktree fonts dir.

<!-- MEMORY_FIELDS
{
  "event_name": "figma字体本地化请求",
  "goal": "本地化figma字体",
  "summary": "用户要求将 figma 字体加载到本地仓库，避免每次刷新很慢（2026-11-06）。助手发现 theme.css 第1-6行 6 条 @font-face 指向 figma CDN，本地 src/static/fonts/ref8443/ 已有 NotoSansSC-VF_2、PlusJakartaSans_wght__2 文件，但实为 gzip 压缩的 TTF（非 woff2）。计划解压后用 fonttools 转真实 woff2 并改 @font-face 指向本地路径，在 worktree 执行（截至消息65 未完成 @font-face 改写）。",
  "ranges": "46-65",
  "source_extraction_id": "f499bb7d6a8147daa0a873506593b7a1",
  "version": 1,
  "memory_type": "events"
}
-->