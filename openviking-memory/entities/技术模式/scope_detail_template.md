# 经纪机构经营范围查看态改用DetailTemplate
苏州市房地产监测V3 中经纪/租赁机构详情页经营范围改为 DetailTemplate 纯文本展示，不再单独渲染 textarea 组件。

## 问题位置
- `src/views/company/companyManagement/components/AgencyEntryNetworkSections.vue`（被 `AgencyEntryNetworkDetail.vue` 和 `AgencyEntryNetworkAdminDetail.vue` 引用）
- 原查看态先剔除经营范围 `omitBusinessScopeDetailItems`，再用禁用 `zs-textarea` 单独渲染

## 修改内容
- 删除 `AgencyEntryNetworkSections.vue` 查看态单独渲染经营范围的 `zs-textarea` 区块，`DetailTemplate` 成为唯一展示
- `basicInfo` 不再剔除经营范围（`return items`）并移除对应 import
- 删除 `agencyBasicInfoContent.js` 中已无引用的 `omitBusinessScopeDetailItems` 函数

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：2fb8c750-78d4-45fc-a328-8beb9fe2d50c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scope_detail_template",
  "source_extraction_id": "8b3fd04925784d4a9e921898df472afd",
  "version": 1,
  "memory_type": "entities"
}
-->