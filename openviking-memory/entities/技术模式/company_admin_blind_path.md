# 企业Admin详情路由盲拼路径致404
苏州市房地产监测V3 的 zhi2-web-admin 中 companyAdmin/detail.vue 未复用统一导航解析，盲拼路径致跳转404。

## 问题根因
- 无 `:tableid` 时使用 `${basePath}/${changeId}` 盲拼路径跳转易 404
- 未复用 `ruoyi.js` 的 `buildDetailNavigation` 统一解析

## 修复方案
- 优先调用 `buildNavigationByFilePath` 或对齐 `routeName`+`query` 分支
- 用 `isRoutablePath` 校验后 `push`
- 涉及文件：zhi2-web-admin/src/views/company/companyAdmin/detail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/284.md
- 涉及文件：companyAdmin/detail.vue、utils/ruoyi.js、utils/resolveChangeId.js、constants/companyOrgan.js、companyAdminChange/detail.vue、e2e/fixtures/company-admin-menu-config.js、staffManagement/components/detail.vue、toB/companyRecord/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：1db266bb-7787-45df-adac-8911fbfb7729；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_admin_blind_path",
  "source_extraction_id": "f1c4654c51974fa2a2a5c10e8aeed237",
  "version": 1,
  "memory_type": "entities"
}
-->