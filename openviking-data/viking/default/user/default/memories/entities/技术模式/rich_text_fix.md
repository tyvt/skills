
# 富文本字段接口渲染失败统一修复
苏住房C 大量返回富文本字段的接口无法渲染，已通过 `formatRichTextContent` 增强与 `ZsRichText` 组件统一修复。

## 问题根因
- 图片相对路径无法加载：接口返回的富文本里图片多为 `/zs-fym/...` 相对路径，`rich-text` 组件（尤其小程序）无法直接加载，页面显示空白
- 接口返回格式不统一：部分配置类接口（如 `getConfigKey`）返回 `{ configValue: "..." }` 对象而非 HTML 字符串，直接传给 `rich-text` 无法渲染

## 修复要点
- 增强 `formatRichTextContent`（`utils/index.js`）：自动从 `configValue`、`content`、`msgContent` 等字段提取内容；解码 HTML 实体（`&lt;p&gt;` → `<p>`）；将图片和 `background-url` 中的相对路径转为完整 URL
- 新增 `ZsRichText` 组件：封装 `rich-text`，渲染前自动调用 `formatRichTextContent`，避免各页面重复处理
- 统一替换：公告、新闻、政策、协议、问卷、公示等约 20 处 `rich-text` 改为 `ZsRichText`
- 修复配置接口页面

## 涉及文件
- src/utils/index.js
- src/api/gateway.js
- src/pages_owner/decision/detail.vue
- src/pages/news/components/ListDetail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：0bc1d7be-3e28-4c25-90a8-6816570ec803；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rich_text_fix",
  "source_extraction_id": "81e24c7fac0540d9acc9252dc29ce269",
  "version": 1,
  "memory_type": "entities"
}
-->