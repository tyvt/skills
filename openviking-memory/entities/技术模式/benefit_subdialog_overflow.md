# benefit 明细弹窗去 Headline 嵌套防底部按钮遮挡
资产租赁申请下的 subAdvertiseDialog / subVenueDialog 等明细弹窗，用 Headline 再包一层会多出边框并与 DetailTemplate 查看态 border 叠加，溢出时盖住 Footer。

## 问题背景
- 弹窗内用 `Headline` 包裹会多出边框，与 `DetailTemplate` 查看态 `border` 叠加。
- 内容溢出时会盖住 Footer，出现「取消点不了」。

## 解决方案
- 移除弹窗内 `Headline` 包裹；查看模式 `DetailTemplate` 设 `:border="false"`。
- 弹窗根或内容容器设 `overflow: hidden` 并底部按钮右对齐，与全局 `sub-container` 去竖线规范一并验收。

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：会话 e326e1ef 中 subAdvertiseDialog 移除 Headline、overflow:hidden 修复取消按钮；subVenueDialog 同步。
- 涉及文件：zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subAdvertiseDialog.vue、zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subVenueDialog.vue
- 所属项目：园区公共收益；来源会话ID：e326e1ef-cd40-49fe-b333-beabfaaa0ee3；代码基线：36a9a7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_subdialog_overflow",
  "source_extraction_id": "a0dff37d982d44f1904b307947a717bd",
  "version": 1,
  "memory_type": "entities"
}
-->