# 变更列表查看按备案busCode解析路由调错接口
苏州市房地产监测V3 中变更列表「查看」误用备案 busCode 解析路由，导致调错详情接口。

## 问题根因
- `companyChangeManage/index.vue` 列表「查看」通过 `navigateToTodoTask` 按备案 `busCode` 解析路由且仅传 `formMode: 'view'`
- 变更单 ID 误调备案详情接口（如 `getCompanyRecordDetail`）

## 修复方案
- 按变更类型跳转对应变更详情路由（如 `company/companyManagement/change/detail` 设 `isChange=true` 调 `getCompanyRecordChangeDetail`）
- 资质与人员同理跳转各自变更详情路由

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/006.md
- 涉及文件：zhi2-web-admin/src/views/company/companyChangeManage/index.vue、api/company/companyChangeManage.js、companyManagement/change/detail.vue、utils/companyRecordChangeRoute.js、api/company/companyAdminChange.js
- 所属项目：苏州市房地产监测V3；来源会话：01a1619b-c75f-7553-b4af-dfe3ee83454d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "change_view_route",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 2,
  "memory_type": "entities"
}
-->