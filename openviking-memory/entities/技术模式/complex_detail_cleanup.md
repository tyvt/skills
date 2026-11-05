# publicQuery 物业综合体详情页冗余代码清理
产品2.0 的 zhi2-web-admin 中清理 `publicQuery/complex/detail.vue` 从物业详情页复制但未使用的代码。

## 清理内容
- 文件从 601 行减至 506 行
- 移除 import/组件：`area` mixin（与 `detailMixins` 重复）、`PROPERTY_COMPLEX_TYPE`、`houseTable`、`propertyServicesTable`
- 移除 data 字段：弹窗/列表状态 `showProjectDialog`、`showCompanyDialog`、`isQueryDialogVisible`、`isQrCodeDialogVisible`、`isBuildingAuth`；未引用列表 `projectList`、`committeeList`、`contractList`、`propertyCommitteeVoList`；`form` 中未展示字段（如 `projectName`、`otherHouse`、`remark`）
- 移除样式：`.property-type-*` 相关（模板无对应 DOM）
- 接口返回时仍通过 `detailCallback` 的 `{ ...this.form, ...response.data }` 合并进来

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/publicQuery/complex/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/complex/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/detailMixins.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/area.js

## 验证与归属
- 所属项目：产品2.0；来源会话：117b67e8-4e61-4da7-9503-e0038e998ea7；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_detail_cleanup",
  "source_extraction_id": "8a43c32a273941439109c1eae5f6e5e3",
  "version": 1,
  "memory_type": "entities"
}
-->