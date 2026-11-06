
- 所有通过 axios 拦截器发出的接口请求都自动附加 zs-menu-name、zs-menu-path、zs-data-id 审计请求头，无需手动触发
- zs-menu-name 取自当前路由 meta.title，zs-menu-path 取自路由 meta.filePath，zs-data-id 通过 getId() 从当前路由 URL 解析（解析不到则不传）
- 通过 pageRequestContext.js 的 getPageRequestHeaders() 实现，在 request.js 请求拦截器中对所有请求调用，替代原仅保存/新增/删除时附加的逻辑
- 原 enableDetailSaveHeaders、enableListDeleteHeaders 等手动打标函数保留为空实现，后续可逐步清理
- 适用于园区公共收益项目 zhi2-web-admin（pageRequestContext.js、request.js）


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "接口请求头menu-name与menu-path添加范围",
  "source_extraction_id": "c7a49d90ffe84975b691194a3bab1e33",
  "version": 2,
  "memory_type": "preferences"
}
-->