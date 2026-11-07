- 项目嵌入 App 时 H5 不显示系统导航栏：在 `pages.json` 的 `globalStyle` 用 `// #ifdef H5` 设置 `navigationStyle: "custom"`，微信小程序不受影响仍用系统导航栏。
- 真机 WebView 若仍见顶栏，可再加 `uni-page-head` 的 CSS 兜底。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "惠山二期H5嵌入App隐藏导航栏",
  "source_extraction_id": "288cea82c458414199984d059f42f600",
  "version": 1,
  "memory_type": "preferences"
}
-->