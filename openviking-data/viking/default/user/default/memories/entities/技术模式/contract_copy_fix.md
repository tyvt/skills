# 复制合同新增页失效修复
苏州市房地产监测V3 中 copyContract 因残留 query.id 及手写路径导致新增页失效的修复。

## 原因说明
- 整段复制 `this.$route.query` 仅改 formMode=add，id 仍留在 query，新增页 getId() 优先读 query.id 被当成带旧主键详情
- 手写 path+'/add' 跳转未用列表统一 buildDetailNavigation，部分 backUrl/菜单结构下可能拼错路径
- 复制合同正文依赖 Vuex sourceContractNo，保存时由 getForm() 带给 /presale/template/add，若新增页打不开或带旧 id 整条链路失效

## 修改说明
- 用 buildDetailNavigation('add','add',listRoute) 跳转，并 delete query.id
- 用 router.resolve 得到的 path 写入 sessionStorage，与 detailMixins 缓存键一致，并预填基本信息（去掉 templateI...）

## 涉及文件
- ruoyi.js
- commercialHousingSales/presale/template/detail.vue
- detailMixins.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：3e714370-2838-4c2e-9f79-bb7a5d6a2438
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_copy_fix",
  "source_extraction_id": "0e3ce808053c40fd9e9a60c5229563fe",
  "version": 1,
  "memory_type": "entities"
}
-->