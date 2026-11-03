# zs-dialog弹窗不居中因transform覆盖
zs-dialog 打开动画 transform 覆盖 translateX(-50%) 且拖拽指令固定 top 致不居中，已修复为 flex 居中。

## 问题根因
- zs-dialog 打开动画将 transform 写成 scale3d(1,1,1) 覆盖 translateX(-50%)
- v-dialogDrag 固定 top:15vh 非垂直居中

## 修复方案
- drag.js 打开时不写 absolute/15vh/translateX，改由 wrapper flex 居中仅拖拽时绝对定位
- zs-dialog.vue 增加 flex 水平垂直居中；关闭清除内联 position/left/top/transform

## 验证与归属
- 验证证据：src=cursor session=13d9e93b-10ce-47af-a240-665dac7d8d84
- 涉及文件：system/menu/index.vue、components/zs-dialog/zs-dialog.vue、directives/dialog/drag.js、projectManagement/customerProject/detail.vue、package.json
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_center",
  "source_extraction_id": "b35c8cec348f4300ac901e68405922f1",
  "version": 1,
  "memory_type": "entities"
}
-->