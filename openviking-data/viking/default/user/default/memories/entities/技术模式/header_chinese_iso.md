
# 请求头含中文触发ISO限制并导致虚假服务器错误
在 园区公共收益 (zhi2-web-admin) 项目中，浏览器将请求头限制为 ISO-8859-1；`pageRequestContext.js` 将含中文的 `landPlotCode` 写入 `zs-remark` 请求头，触发 xhr 异常并被报告为服务器错误。

## 根因
- 浏览器将请求头值限制为 ISO-8859-1
- `pageRequestContext.js` 将含中文的 `landPlotCode` 写入 `zs-remark` 请求头
- xhr 异常被 `request.js` 捕获并报告为服务器错误

## 解决方案
- 对该请求头的值中的中文字符进行编码或过滤

## 涉及文件
- 工具类：`pageRequestContext.js`、`ruoyi.js`、`request.js`
- Mixins：`form.js`、`listMixins.js`、`table.js`
- Api 与视图：`api/index.js`、`property/complex/detail.vue`

## 验证与来源
- 证据：extracted source=workbuddy session=ceb36a3f-e16b-42a0-aa46-df6b3904665d
- 项目：园区公共收益


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "header_chinese_iso",
  "source_extraction_id": "90c73514e50f41c38ba0d322cbec7cd4",
  "version": 2,
  "memory_type": "entities"
}
-->