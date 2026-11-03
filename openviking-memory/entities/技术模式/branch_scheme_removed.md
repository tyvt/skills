# 分支机构详情页移除服务方案模块
苏州市房地产监测V3 的 `AgencyBranchDetail.vue` 已删除「服务方案」表格及 `ServiceSchemePanel`，提交不再携带服务方案数据。
## 改动要点
- 删除「服务方案」表格及 `ServiceSchemePanel` 组件
- 移除 `schemeList` 与保存提交逻辑
- `buildSavePayload` 白名单不再提交服务方案数据
## 后端约束
- 后端 `/company/agencyBranch/submit` 若强制校验服务方案将报错，需放宽校验
## 未改动范围
- 机构注册审核详情 `company/institutionRegister/detail.vue` 未改动
## 验证与归属
- 验证证据：来源会话 56c16879-b869-4c53-a45f-31cf519e5fa1
- 涉及文件：`AgencyBranchDetail.vue`、`ServiceSchemePanel.vue`、`company/institutionRegister/detail.vue`
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_scheme_removed",
  "source_extraction_id": "5f5198d2b46443abad5d1a01cf1edbb4",
  "version": 1,
  "memory_type": "entities"
}
-->