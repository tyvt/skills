# 下载模板接口JSON报错兼容修复
产品2.0 下载账单模板接口报错时返回 JSON 被当作 Blob 处理，需兼容 JSON 错误响应。

## 问题原因
- `importTemplate` 使用 `responseType: 'blob'`
- HTTP 4xx/5xx 时 axios 错误拦截器 `response.data` 为 Blob 读不到 `msg`
- HTTP 200 但 body 为 JSON 错误时会误当 Excel 下载

## 修复要点
- `src/utils/request.js` 错误拦截器支持解析 Blob 中 JSON 展示 `msg`
- `src/utils/index.js` 新增 `downloadBlobFileWithCheck` 下载前判断是否为 JSON 错误
- `spFeeBill/components/import.vue` 的 `getTemplate` 改用该方法

## 涉及文件
- zhi2-web-admin/src/utils/request.js
- zhi2-web-admin/src/utils/index.js
- zhi2-web-admin/src/views/property/spFeeBill/components/import.vue
- zhi2-web-admin/src/views/property/bill/components/import.vue

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：3f404cf2-9522-42c1-aa00-9a2837b4eb10

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "download_template_json",
  "source_extraction_id": "3f14e79c13954057ad98487b06daa383",
  "version": 1,
  "memory_type": "entities"
}
-->