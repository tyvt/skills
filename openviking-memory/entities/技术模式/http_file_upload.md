# http_file_upload
H5 项目接入 file 上传并和现有 http 行为对齐，uni.uploadFile 复用 request 拦截逻辑。

## 实现说明
- interceptor.ts 新增 applyHttpRequestOptions，复用 uni.request 的 query 拼 URL、H5 代理前缀、baseUrl、Authorization
- src/http/http.ts 新增 httpFile + http.file，入参 (url, data, config?)，data 支持 filePath/files、formData、name（默认 'file'）
- 与 http() 一致：showLoading/loadingText、hideErrorToast、JSON 解析、401 跳转登录、code!==200 的 toast 与 reject
- 未处理 x-encrypt 解密（普通 http 里有），若上传接口加密需单独加解密逻辑
- CustomRequestOptions 补充 showLoading、loading 等类型

## 涉及文件
- interceptor.ts
- src/http/http.ts
- src/api/file.ts

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 来源会话ID：03f4ca48-ccd0-4b81-a7c1-40a64931718d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "http_file_upload",
  "source_extraction_id": "f465183229974b809c45bcccc793f620",
  "version": 1,
  "memory_type": "entities"
}
-->