# 经纪机构入驻网络详情页 el-form-item 缺 el-form 祖先报错
苏州市房地产监测V3 中 `companyManagement/components/AgencyEntryNetworkSections.vue` 直接使用 `<el-form-item>` 但整棵组件树无 `<el-form>` 祖先，导致查看页必现 Vue warn 报错。

## 问题根因
- `AgencyEntryNetworkSections.vue` 直接使用 `<el-form-item>`，父级 `AgencyEntryNetworkAdminDetail.vue`、`AgencyEntryNetworkDetail.vue` 均无 `<el-form>` 祖先
- Element UI 的 `el-form-item` 通过 `inject: ['elForm']` 获取表单上下文，取不到时 `form` 计算属性读 `undefined.$options` 触发报错
- 详情页（view 态）「业务范围」块的 form-item 不受 `v-else` 保护，始终渲染，故查看页必现

## 解决方案
- 在 `AgencyEntryNetworkSections.vue` 中，「基本信息」编辑态与「业务范围」块的 `el-form-item` 外层各包一层 `<el-form :model="form" label-width="auto">`
- 新增 scoped 样式把 grid 移到 `.section-form > .el-form` 相关层级（原 `.section-form` 为 3 列 grid）

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/company/companyManagement/components/AgencyEntryNetworkSections.vue、AgencyEntryNetworkAdminDetail.vue、AgencyEntryNetworkDetail.vue、components/Headline/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：6a44b07c-5c77-4c89-bebf-6f7395f38ffe；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_network_formitem",
  "source_extraction_id": "c5d95a38a9c04a809be2e123d4710d6d",
  "version": 1,
  "memory_type": "entities"
}
-->