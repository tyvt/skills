# 学习园地页签单行滚动改造
苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c）学习园地页签从「换行无滚动」改为「单行不换行+隐藏滚动条+可横向滚动」。

## 改动要点
- 文件：`src/styles/theme.css` 第 302–303 行 `.scroll-tabs` 规则
- `flex-wrap:nowrap` + `white-space:nowrap` → tab 排成一行不换行
- `overflow-x:auto` → 内容超出时仍可横向滑动
- `scrollbar-width:none` / `::-webkit-scrollbar{display:none}` → 隐藏滚动条（微信/移动端 WebView 与桌面浏览器均生效）

## 需求来源
- Lead 要求：不换行，只是去掉滚动条，还是要滚动（2026-11-09）

## 验证与归属
- 验证：`npm run build` 成功，nginx（端口 8095，root 指向本项目 dist）部署，390×844 视口实测 `nowrap`、`scrollWidth 440 > clientWidth 390` 可滚动、`scrollbarH=0`
- Git：分支 `dev`，提交 `97c9460`，已推送 `origin/dev`（`6a7ca98..97c9460`）
- 未纳入提交：`src/pages/data/ref-assets.ts`（数智模块构建生成静态资源）、`dist-bak-20261109141802/`（构建备份目录）
- 所属项目：苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c）；来源会话时间：2026-11-09

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scroll_tabs_nowrap",
  "source_extraction_id": "9f834412c80645c1a8c24d880f569528",
  "version": 1,
  "memory_type": "entities"
}
-->