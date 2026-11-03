# .dialog-left flex:1 致弹窗留白
80% width dialogs had excess whitespace on the left after adding flex:1 to .dialog-left for height alignment.

## 现象
- 为对齐高度给 .dialog-left 添加 flex:1，致 80% 宽弹窗中左侧拉伸过宽留白。

## 根因
- flex:1 使左侧栏在宽弹窗中过度拉伸，与 zs-dialog 默认左栏宽度不匹配。

## 解决方案
- 改为 flex: 0 0 290px 与 width/max-width: 290px（对齐 zs-dialog 默认左栏）。
- 右侧维持 flex:1 占满剩余。

## 涉及文件
- commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue、zs-select-dialog.vue、maintenance/accountOpen/elevator/components/ElevatorOpeningDialog.vue、zs-dialog.vue、commercialHousingSales/presale/contractView/components/chooseHouseDialog.vue、commercialHousingSales/presale/contractMainInfo/index.vue、vite.config.js。

## 关联信息
- 验证证据：src=苏州市房地产监测V3-leftover/003.md
- 来源会话：f882f9ab-4b6d-42b0-8cfa-ee45d52f7c6b
- 项目：苏州市房地产监测V3（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "dialog_left_flex",
  "source_extraction_id": "c67ea4aee5d04fa28bdc88471a622b14",
  "version": 1,
  "memory_type": "entities"
}
-->