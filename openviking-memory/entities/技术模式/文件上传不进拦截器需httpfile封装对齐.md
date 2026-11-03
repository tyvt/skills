# 文件上传不进拦截器需httpFile封装对齐
uni.uploadFile 默认不走全局 request 拦截器，导致 query 拼 URL、H5 代理前缀、Authorization 等缺失。

## 问题根因
- uni.uploadFile 默认不走全局 request 拦截器
- 导致 query 拼 URL、H5 代理前缀、Authorization 等缺失

## 解决方案
- interceptor.ts 新增 applyHttpRequestOptions 复用配置
- src/http/http.ts 封装 httpFile 对齐 showLoading、401 跳转等行为
- 未处理 x-encrypt 解密

## 涉及文件
- interceptor.ts
- src/http/http.ts

## 验证与归属
- 验证：extracted source=cursor session=03f4ca48-ccd0-4b81-a7c1-40a64931718d
- 来源会话ID：03f4ca48-ccd0-4b81-a7c1-40a64931718d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "文件上传不进拦截器需httpFile封装对齐",
  "source_extraction_id": "d3a37d7a74404efd9cb7a275d22e9e8d",
  "version": 1,
  "memory_type": "entities"
}
-->