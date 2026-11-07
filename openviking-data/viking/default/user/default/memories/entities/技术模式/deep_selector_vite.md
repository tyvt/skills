# deep_selector_vite
Vue2 私有深度选择器 /deep/ 在 Vite+Dart Sass 下会导致构建硬失败，需全库改写为 :deep()。

## 现象
- CI 跑 vite build 报 [vite:css][sass] expected selector，定位到 ReportItemsTable.vue:46 `.report-number-input /deep/ .el-input__inner`。
- 本地可能不报，CI 全量构建必红；残留文件平时跑不起来不报，只在 CI 暴露。

## 根因
- /deep/ 是 Vue2 私有深度选择器语法，webpack vue-loader 会预处理；Vite 走标准 Dart Sass 编译，/deep/ 非合法选择器，编译阶段抛错。
- 属构建期硬失败而非样式不生效，与已知 #1045 scoped @import scss 弃用警告（低级别告警）不同。

## 解决方案
- 统一把 `.parent /deep/ .child` 改写为 `.parent :deep(.child)`，与项目内已有 :deep() 写法一致。
- 按目录全库扫描清掉所有残留，不要换成 ::v-deep 混存，避免复发。
- 改完重新跑真实构建验证，而非只看 dev 起来没报错。

## 验证与涉及
- 验证：会话 1a0cb28a 用户贴 CI 报错 expected selector 指向 ReportItemsTable.vue:46；随后一并改掉共 4 文件 14 处（ReportItemsTable 1、zs-input-number 7、WorkOrderActionDialog 3、BatchReplyDialog 3），全库已无 /deep/。
- 涉及文件：zhi2-web-admin/src/views/publicQuery/monthlyReport/components/ReportItemsTable.vue、zhi2-web-admin/src/components/zs-input-number/zs-input-number.vue、zhi2-web-admin/src/views/property/workOrder/order/components/WorkOrderActionDialog.vue、zhi2-web-admin/src/views/property/workOrder/order/components/BatchReplyDialog.vue
- 所属项目：苏住房G；来源会话：1a0cb28a-633d-40bd-a6a4-f109ce7e0d93；代码基线：d5eee56

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deep_selector_vite",
  "source_extraction_id": "3a85eaede4c4445db42f39130147b4c2",
  "version": 1,
  "memory_type": "entities"
}
-->