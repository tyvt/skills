# 从业人员备案与申请菜单拆分G端先选机构
苏州市房地产监测V3中仅「从业人员备案」菜单主管端可增删，先弹窗选企业/机构并将companyRecordId写入路由query。

## 功能约定
- 仅「从业人员备案」菜单（非 `*Apply*` 路由）主管端可增删
- 先弹窗选企业/机构（`/company/companyRecord/page` + `organType`）
- `companyRecordId` 写入路由 query 并于 init/save 传递

## 逻辑封装
- 逻辑封装于 `personnelCompanySelect.js` 与 `personnelListManageMixin.js`
- 列表组件 `AgencyPersonnelList.vue` 等复用

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/018.md
- 涉及文件：路由信息.json、staffManagement/personnelRecord/index.vue、detail.vue、components/index.vue、shareholder-menu-routes.json、toB/personnelRecord/index.vue、components/detail.vue、institution/personnel/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：9640b75a-83e0-424b-a33c-daef0e9e80bf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_record_menu_split",
  "source_extraction_id": "c77880165b094fe3a94ba8cb2b5fcca5",
  "version": 1,
  "memory_type": "entities"
}
-->