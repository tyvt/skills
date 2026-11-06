# 项目楼盘表保存请求头异常修复（苏住房G）
苏住房G 项目修复保存「项目楼盘」时因宗地号含中文导致请求头报错的问题。

## 问题原因
- 保存时请求拦截器 `request.js` 的 `getLandPlotCodeRequestHeaders` 将表单 `landPlotCode`（宗地号）写入 `zs-remark` 请求头
- HTTP 请求头仅允许 ISO-8859-1 字符，宗地号含中文时 `setRequestHeader` 报错：`String contains non ISO-8859-1 code point`
- 页面加载（GET）不带 `landPlotCode`，故仅保存时触发

## 修复内容
- 在 `pageRequestContext.js` 对 `zs-remark` 使用与 `zs-menu-name` 相同的 `toAsciiHeaderValue` 编码：`'zs-remark': toAsciiHeaderValue(landPlotCode)`

## 涉及文件与归属
- 涉及：`request.js`、`pageRequestContext.js`、`building/project/detail.vue`、`detailMixins.js`、`form.js`
- 所属项目：苏住房G；来源会话：369f9db2-2fde-436c-9e46-1d22237a54a6
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_save_fix",
  "source_extraction_id": "7de707754b5c430297ab66535487c776",
  "version": 1,
  "memory_type": "entities"
}
-->