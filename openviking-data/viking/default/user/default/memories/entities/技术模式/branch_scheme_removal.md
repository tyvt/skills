# 分支机构信息详情去掉「服务方案」
苏州市房地产监测V3 项目 zhi2-web-admin 中分支机构信息详情页已移除「服务方案」整块内容。

## 修改内容
- `AgencyBranchDetail.vue`：查看态删除「服务方案」表格区块（左侧锚点一并消失）；编辑态删除底部 `ServiceSchemePanel`；同步去掉 `schemeList`、收费类型字典、保存时 `schemeList` 提交逻辑
- 删除仅用于该页的 `ServiceSchemePanel.vue`
- `buildSavePayload` 仍是字段白名单，不再提交服务方案数据；若后端 `/company/agencyBranch/submit` 仍强制要求服务方案，保存可能报错，需后端放宽校验

## 未改动范围
- 机构注册审核详情 `company/institutionRegister/detail.vue` 和企业端「服务方案」列表模块仍保留

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：56c16879-b869-4c53-a45f-31cf519e5fa1
- 涉及文件：`AgencyBranchDetail.vue`、`ServiceSchemePanel.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_scheme_removal",
  "source_extraction_id": "28abe140eda94388b87f73b3086a18be",
  "version": 1,
  "memory_type": "entities"
}
-->