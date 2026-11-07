
# 全局自动附加路由菜单审计头
园区 zhi2-web-admin 通过 axios 拦截器对所有请求自动附加 zs-menu-name、zs-menu-path、zs-data-id 审计头。

## 实施方案
- pageRequestContext.js 新增 getPageRequestHeaders()：zs-menu-name 取自路由 meta.title，zs-menu-path 取自路由 meta.filePath，zs-data-id 通过 getId() 从路由 URL 解析（解析不到则不传）
- request.js 请求拦截器对所有请求调用 getPageRequestHeaders()，替代原先仅保存/新增/删除时附加的逻辑

## 废弃说明
- 原 pendingOperHeaders 机制及 enableDetailSaveHeaders、enableListDeleteHeaders 等函数保留为空实现，避免影响现有引用，后续可逐步清理

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：zhi2-web-admin/src/utils/pageRequestContext.js、src/utils/request.js
- 所属项目：园区公共收益；来源会话：ff4a3fa0-96f2-4d49-b056-026882c79105；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_request_headers",
  "source_extraction_id": "6fca0bfeff2a4ec9beac3ad9d9f2ba6e",
  "version": 3,
  "memory_type": "entities"
}
-->