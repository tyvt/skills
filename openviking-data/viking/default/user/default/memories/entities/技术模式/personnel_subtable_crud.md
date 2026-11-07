# 从业人员详情子表弹窗式增删改查改造
苏州市房地产监测V3 中 AgencyPersonnelDetail 的三个子表已统一为 ServiceSchemePanel 风格弹窗式增删改查。

## 改动摘要
- `EducationTable.vue`：弹窗维护培训年度/主题/机构/日期/备注
- `CertificateList.vue`：弹窗维护证书类型/证号/发证机关/日期/等级
- `CareerList.vue`：弹窗维护机构/人员类型/日期/变动原因/投诉/当前状态
- 统一交互：edit/add 模式有工具栏新增/删除+行操作查看/编辑/删除；view（`disabled=true`）仅查看；数据通过 `v-model` 维护本地数组
- `AgencyPersonnelDetail.vue` 子表移出 `zs-form`，view/edit/add 共用组件；新增 `subTableDisabled`（`formMode === 'view'`）；`buildSavePayload()` 补充 `certificateList`、`careerList`；移除 view 模式保存按钮

## 涉及文件
- EducationTable.vue
- CertificateList.vue
- CareerList.vue
- AgencyPersonnelDetail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：26c334d5-c3fb-4915-b838-b612917bc654；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_subtable_crud",
  "source_extraction_id": "ab84d021aea649a287e577acdb50812d",
  "version": 1,
  "memory_type": "entities"
}
-->