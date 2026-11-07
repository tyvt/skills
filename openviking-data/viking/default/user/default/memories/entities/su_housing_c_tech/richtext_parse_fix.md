# 流程指南富文本 Parse Error 白屏修复
苏住房C 小程序流程指南详情（如业主大会议事规则通知）因书名号被误解析为 HTML 标签导致正文白屏，已通过转义非法尖括号修复。

## 问题根因
- 流程指南详情通过 `ZsRichText` → `formatRichTextContent` → `rich-text` 渲染 HTML
- 第二篇指南（业主大会相关）正文写成 `关于印发<业主大会>议事规则》等示范文本的通知》`，其中 `<业主大会>` 被当 HTML 标签解析失败，导致标题能显示、正文白屏

## 修复内容
- 在 `formatRichTextContent` 中新增 `escapeInvalidHtmlAngleBrackets`，将非合法 HTML 标签的 `<` 转义为 `&lt;`
- 正则：`String(html).replace(/<(?!\/?[a-zA-Z!])/g, '&lt;')`
- 修复作用于所有使用 `ZsRichText` 的页面

## 涉及文件与归属
- 涉及文件：`src/utils/index.js`、`src/pages_my/onlineService/PolicyDetail.vue`、`src/pages_my/onlineService/index.vue`、`src/pages/news/components/ListDetail.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：3a1c5d68-e7a3-441a-a399-b1778fbaea6f；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "richtext_parse_fix",
  "source_extraction_id": "4b4211148dcb4ca980c39c04cc0e7fe5",
  "version": 1,
  "memory_type": "entities"
}
-->
