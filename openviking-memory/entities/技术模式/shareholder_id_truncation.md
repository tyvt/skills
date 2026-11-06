# 股东详情主键Number截断修复
苏州市房地产监测V3 修复 `/company/shareholder/detail` 因 `Number()` 转换雪花ID截断导致详情异常的问题。

## 问题根因
- `detail.vue` 的 `getDetailParams()` 曾用 `Number(this.id)` 转换，雪花ID超 `Number.MAX_SAFE_INTEGER` 被截断，后端收错主键
- 项目已有防护链路：`getId()`（`ruoyi.js`）路由主键为字符串，`jsonParseSafeIds.js` 提供安全ID解析与请求体转换
- 其它详情页（预售许可、房源限制等）`getDetailParams()` 直接 `return this.id`，未转 number
- 全局排查 `zhi2-web-admin/src` 仅两处把业务主键转成 number

## 修复与规范
- 应避免在 `getDetailParams()` 中对业务主键使用 `Number()`，直接返回字符串ID以适配雪花ID

## 涉及文件与归属
- 涉及：`company/shareholder/detail.vue`、`ruoyi.js`、`jsonParseSafeIds.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：a32faed2-0d46-4ca1-9093-a9c63ba5842d；验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shareholder_id_truncation",
  "source_extraction_id": "d43c17bee8564355a22797fedfa17728",
  "version": 1,
  "memory_type": "entities"
}
-->