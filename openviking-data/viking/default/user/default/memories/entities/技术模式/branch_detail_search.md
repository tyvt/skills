# 分支机构详情路径搜索结论
苏州市房地产监测V3 代码库中无 `branch/detail` 路径，分支机构逻辑集中在 `companyManagement` 模块。

## 核心结论
- 代码库中无 `branch/detail` 路径
- 分支机构（子企业）相关逻辑集中在 `companyManagement` 模块
- 核心详情组件为 `components/detail.vue`（`CompanyRecordDetail`），含 `parentCompanyRecordId`、`branch`、`organType`、`selectCompany()`（选上级企业，`filterParams: { branch: 0 }`）、`tabList` 中「分支机构信息」
- 分支机构**查看**通过 `property/detail` 路由跳转

## 相关文件
- `src/views/company/companyManagement/components/detail.vue`
- `src/views/company/companyManagement/components/subCompanyRecordTable.vue`
- `src/views/company/companyManagement/components/index.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：f5dcb5a6-f261-45b9-ac85-1b4c882bd893
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_detail_search",
  "source_extraction_id": "7503ced734cb48b59a6ed3ddd3ef916d",
  "version": 1,
  "memory_type": "entities"
}
-->