# ref8443字体本地化修复
苏住房防汛C端 H5 ref8443 页面字体加载根因修复及反转，2026-11-06。

## 字体加载根因
- 参考站 theme.css 字体指向 figma CDN（本机不通），参考站实际渲染系统字体；本端此前加本地 @font-face 加载真 Noto（同句宽143px vs 参考站182px）导致观感差异
- 移除本地 @font-face、去掉 .ui-ref8443{font-synthesis:none}，使本端与参考站共用 theme.css 字体声明→渲染一致
- commit 24e8e19（2026-11-06 被用户反转：要求把 figma 字体本地化进仓库以加速刷新）

## 字体本地化新方向（2026-11-06）
- 用户要求把 figma 字体加载到本地仓库，避免每次刷新慢（源：2026-11-06 消息46）
- theme.css 第1-6行 6 条 @font-face 指向 figma CDN，含两个 VF 文件：NotoSansSC-VF_2（字重400/500/700）、PlusJakartaSans_wght__2（字重400/500/600）
- 本地 src/static/fonts/ref8443/ 已有同名文件：NotoSansSC-VF_2.woff2（11.2MB）、PlusJakartaSans_wght__2.woff2（79KB），实为 gzip 压缩（magic 1F 8B），解压后为 TrueType（magic 00 01 00 00），非真实 woff2
- 计划：解压后用 fonttools+brotli 将 TTF 转为真实 woff2，改 @font-face src 指向本地路径；在 worktree 执行（截至 2026-11-06 消息65 尚未完成 @font-face 改写）
- 此方向反转 commit 24e8e19 的「移除本地 @font-face」方案，将使本端渲染真实 figma 字体（与参考站系统字体不再一致，像素差将变化）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_font_localization",
  "source_extraction_id": "88ae84c0b79f44a4bf63ac09d0173b11",
  "version": 1,
  "memory_type": "entities"
}
-->