# 物业管理区域变更区域概览变更记录
淮安物管物业管理区域变更详情中，区域概览字段需注册到变更记录对比的技术修复模式。

## 问题根因
- 变更记录弹窗通过 `changeRecordMixins` 的 `allChangeContentInfo` 仅合并 `contentInfo`、`contentInfo2`、`contentInfo3` 等计算属性。
- 区域概览字段（占地面积、总建筑面积、地上/地下面积、楼幢数量、房屋总数）仅在模板渲染并带 `isAreaFieldChanged`，未纳入任何 `contentInfo*`，变更记录不可见。

## 修复方案
- 在 `complexChange/detail.vue` 新增 `contentInfo3`，注册区域概览字段：`landArea`、`totalFloorArea`、`aboveFloorArea`、`underFloorArea`、`totalBuilding`、`totalHouse`。
- 面积类用 `type: 'amount'` 带 `㎡` 单位；数量类通过 `formatDisplay` 显示「幢」「户」后缀。
- `changeRecordMixins` 自动收集 `contentInfo3`，无需改弹窗组件。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：3badcbf0-1f78-46b6-adad-d5ac25a98bda
- 涉及文件：property/complexChange/detail.vue、mixins/changeRecordMixins.js、utils/contentInfoChange.js、property/complex/detail.vue
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complexchange_areafields",
  "source_extraction_id": "4ebd15bf71a8499ab4122103a7acac56",
  "version": 1,
  "memory_type": "entities"
}
-->