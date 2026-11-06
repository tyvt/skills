# 从业人员信息筛选区重复姓名字段修复
苏州市房地产监测V3 主管部门端「从业人员信息」筛选区重复姓名字段问题已修复。

## 问题根因
- G 端 `formItems` 中存在冗余「人员姓名」（`name`）筛选项，与「从业人员姓名」重复

## 修复内容
- `AgencyPersonnelList.vue` 移除冗余 `name` 筛选项及 `queryParams` 中 `name` 参数
- G 端保留 `keyWord`、`personnelType`、`bizState`、`companyName`、`agencyBranchId`
- E2E 用例增加断言：筛选区仅 1 个「从业人员姓名」标签，无「人员姓名」

## 验证与归属
- 主管部门端 E2E 测试通过：`pageManage` 接口 1 passed
- 涉及文件：`AgencyPersonnelList.vue`、`agency-personnel-real-api-flow.spec.js`
- 所属项目：苏州市房地产监测V3；来源会话：c1779a4f-3141-425a-bf33-25bd2342d93d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "agency_personnel_dup_name_fix",
  "source_extraction_id": "366a442c32ce460e8f96d6df14fbd0d7",
  "version": 1,
  "memory_type": "entities"
}
-->