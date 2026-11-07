# H5项目benefit.js改用@/http/http请求封装
H5项目中 benefit.js 从 import api from '@/api' 改为统一走 import { http } from '@/http/http'，与 property.ts、repair.js 写法保持一致。

## 主要变更
- 请求封装：import { http } from '@/http/http'，原 @/api 在工程无对应入口文件，与其余 API 模块不一致
- 函数签名：全部改为 export async function xxx(..., options = {})，第四参合并 showLoading: true 与 ...options，便于调用方传 showLoading: false 等
- GET：http.get(url, query, {}, { showLoading: true, ...options })，带路径参数（如 projectId）用第二参传 {}
- POST：getListPropertySubItem 使用 http.post(url, data, {}, { showLoading: true, ...options })

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 涉及文件：@src/api/benefit.js、property.ts、repair.js
- 所属项目：H5；来源会话：cd0867d2-9384-495f-bd33-2f01b7443794；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_http_refactor",
  "source_extraction_id": "7146bf7d99e4433bb774d137ebb2fa4f",
  "version": 1,
  "memory_type": "entities"
}
-->