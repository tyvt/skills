# 路由meta缺busCode审核报错修复
路由 meta 缺 busCode 导致审核流程未维护报错的修复方案。
## 问题说明
- 原 AgencyPersonnelDetail.vue 的 auditBusCode 硬依赖 this.$route.meta?.busCode，菜单未配置或错配时 ensureFlowConfigured 查无果报"审核流程未维护完成"
## 修复方案
- 改用 resolvePersonnelAppendixBusCode 统一解析，路由无配置回退备案编码 jgcyryba
## 相关文件
- approval.js、flowApi.js、personnelRecordApply/detail.vue、personnelRecord/detail.vue、ZsSubmit/index.vue、personnel-record-menu-routes.json、personnelRecord.js

<!-- MEMORY_FIELDS
{
  "category": "前端代码概念",
  "name": "route_meta_buscode_fix",
  "source_extraction_id": "90d64a134b0b45a79727c9f6ef908860",
  "version": 1,
  "memory_type": "entities"
}
-->