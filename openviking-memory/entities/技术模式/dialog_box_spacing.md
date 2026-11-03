# dialog-box 左右边距叠加致间距过大
在苏州市房地产监测V3中，dialog-box 因左右边距叠加导致间距过大，已改用 gap 修复。

## 问题根因
- 左侧 margin-right: 24px 与右侧 padding-left: 20px 叠加使 dialog-box 间距达 44px

## 修复方案
- 移除两侧边距并改用 gap: 16px 对齐详情页常用区块间距

## 涉及文件
- 苏州市房地产监测V3/路由信息.json
- 苏州市房地产监测V3/package.json
- zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue
- zhi2-web-admin/src/views/commercialHousingSales/presale/contractMainInfo/index.vue
- zhi2-web-admin/src/views/commercialHousingSales/presale/contractView/components/chooseHouseDialog.vue
- zhi2-web-admin/src/views/building/houseLimit/components/HouseSelectDialog.vue
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/e2e/fixtures/contract-sign-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/027.md
- 来源会话：aa2afcf7-1398-4cdf-93b4-30183eff923a
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_box_spacing",
  "source_extraction_id": "1eff560d266446f4988cb669dab21459",
  "version": 1,
  "memory_type": "entities"
}
-->