# 从业人员备案与申请菜单拆分
苏州市房地产监测V3 项目中主管部门与企业端从业人员备案菜单的增删权限及新增前选机构的交互模式。

## 权限与行为
- 仅「从业人员备案」菜单（非 *Apply* 路由）：主管端（G）与企业端（B）均可新增/批量删除/行内删除，规则与 B 端一致
- 「从业人员备案申请」菜单：主管端仍不可增删，B 端不变

## 主管端新增流程
- G 端新增先弹窗选企业/机构（接口 `/company/companyRecord/page` + `organType`）
- 选中后 `companyRecordId` 写入路由 query，并在 init/save 中传递

## 涉及文件与归属
- 公共：`personnelCompanySelect.js`、`personnelListManageMixin.js`
- 列表页：`AgencyPersonnelList.vue`、`LeasePersonnelList.vue`、`staffManagement/components/index.vue`、`toB/personnelRecord/components/index.vue`
- 详情页：`AgencyPersonnelDetail.vue`、`LeasePersonnelDetail.vue`、`staffManagement/components/detail.vue`、`toB/.../detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：9640b75a-83e0-424b-a33c-daef0e9e80bf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_menu_split",
  "source_extraction_id": "fd6dce0e4752429b8b3fdac526a80eeb",
  "version": 1,
  "memory_type": "entities"
}
-->