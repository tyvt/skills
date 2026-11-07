# Blob 下载接口 JSON 错误兼容
产品2.0 下载模板类接口设 responseType:'blob' 后，后端报错被封装成二进制，现有 JSON 解析链路失效，需 downloadBlobFileWithCheck + 错误拦截器解析 Blob。

## 问题现象
- HTTP 4xx/5xx 时 axios 进错误拦截器，但 response.data 是 Blob 读不到 msg，只能提示通用「Request failed with status code 400」
- HTTP 200 但 body 是 JSON 错误时，会被直接当成 Excel 文件下载成坏文件

## 根因
- Blob 响应把 JSON 错误体也封装成二进制，项目现有按 JSON 解析 msg 的链路完全失效

## 解决方案
- 在 src/utils/request.js 错误拦截器里判断 response.data 是 Blob 时，用 FileReader/text() 解析出 JSON 并展示后端 msg
- 在 src/utils/index.js 新增 downloadBlobFileWithCheck 工具：下载前先检查 Blob 是否为 JSON 错误响应（content-type 或首字节），是错误则弹提示、不是才触发保存
- 各下载模板调用点统一改用该工具，未关联房屋等业务性报错能显示后端具体文案

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 3f404cf2，改 request.js 错误拦截器 + utils/index.js 新增 downloadBlobFileWithCheck + import.vue 的 getTemplate 换用该工具
- 涉及文件：zhi2-web-admin/src/utils/request.js、zhi2-web-admin/src/utils/index.js、zhi2-web-admin/src/views/property/spFeeBill/components/import.vue
- 所属项目：产品2.0；来源会话ID：3f404cf2-9522-42c1-aa00-9a2837b4eb10；代码基线：018ae18

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "blob_download_json_error",
  "source_extraction_id": "643fcefaa41f48a5a04312521a319012",
  "version": 1,
  "memory_type": "entities"
}
-->