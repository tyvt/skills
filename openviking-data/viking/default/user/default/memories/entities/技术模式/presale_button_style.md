# 预售域按钮样式统一
苏州市房地产监测V3 的 zhi2-web-admin 按需求统一了预售域按钮文案与图标。

## 按钮文案
- 「批量删除」改为「删除」：PresaleBuildingTable.vue（子表工具栏）、EntrustBuildingTable.vue（委托楼幢列表工具栏）、entrust-sale-helpers.js（E2E 按钮文案同步）
- 工具栏仍保留 el-icon-delete，仅改显示文字

## 图标调整
- PermitPlanPanel.vue：compact 的「维护」，以及「维护预售方案」「编辑预售方案」上的 el-icon-edit 均已去掉

## 涉及文件
- zhi2-web-admin/src/views/presale/permit/components/PresaleBuildingTable.vue
- zhi2-web-admin/src/views/presale/entrustSale/components/EntrustBuildingTable.vue
- zhi2-web-admin/e2e/fixtures/entrust-sale-helpers.js
- zhi2-web-admin/src/views/presale/permit/components/PermitPlanPanel.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 刷新预售许可申请详情页即可看到效果
- 所属项目：苏州市房地产监测V3；来源会话：5c21d128-6eca-4044-a0fe-b74043e3170a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_button_style",
  "source_extraction_id": "11c8801bf8684342866a4b4661e1ae1f",
  "version": 1,
  "memory_type": "entities"
}
-->