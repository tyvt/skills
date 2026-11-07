# Zs Select 对话框导致右侧空白
组件 `zs-select-dialog` 使用了默认的绝对定位和固定高度的 `dialog-box`，导致右侧留下空白。

## 描述
- 项目苏州房地产监测 V3，前端 zhi2-web-admin。
- `zs-select-dialog` 以绝对定位和固定高度放置表格，导致视觉回退。

## 解决方案
- 在 `presale-select-building-dialog` 中设置 `dialog-right` 宽度为 100% 以取消绝对定位。
- `dialog-box` 改为 `height:auto`。
- `resolveBuildingList` 兼容 `records`/`res.rows` 以减少错误的空白显示。

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/011.md
- 涉及文件: presale/permit/components/PresaleSelectBuildingDialog.vue; components/zs-select-dialog/zs-select-dialog.vue; building/houseLimit/components/HouseSelectDialog.vue; presale/cashsale/components/CashsaleSelectBuildingDialog.vue; presale/permit/components/PresaleBuildingTable.vue; supervision/riskmanage/riskregister/components/superviseDialog.vue; presale/permitSelectConstants.js; property/decision/components/SelectComplexDialog.vue
- 会话: b5dcbf27-aa94-4d27-a97a-978ba9a2e7cd; 代码库: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：b5dcbf27-aa94-4d27-a97a-978ba9a2e7cd


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_dialog_whitespace",
  "source_extraction_id": "187c2553208941ddaccffd0b0decd66f",
  "version": 1,
  "memory_type": "entities"
}
-->
