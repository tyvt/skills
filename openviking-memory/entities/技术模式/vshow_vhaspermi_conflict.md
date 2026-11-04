# 提前开始按钮混用v-show与v-hasPermi致状态变更后不隐藏
太仓G端 ownerDecision/detail.vue 等页面按钮混用 v-show 与 v-hasPermi 指令，导致状态变更后按钮错误显示。

## 问题根因
- 「提前开始」按钮同时使用 `v-show` 和 `v-hasPermi`
- `v-hasPermi` 直接修改元素 `style.display`，覆盖 `v-show` 的隐藏效果
- 状态变为 `decisionState=2` 后，`v-show` 想隐藏但 `v-hasPermi` 把 display 设回 `''`

## 修复约定
- 将「提前开始」「延期」「撤销」「结果维护」等按钮统一改为 `v-if` + `checkPermission`
- 不再混用 `v-show` + `v-hasPermi`，参照「提前结束」按钮写法

## 验证与归属
- 验证证据：会话 627ed433 用户报提前开始成功后按钮仍显示
- 涉及文件：ownerDecision/detail.vue、optionDecision/detail.vue、sortDecison/detail.vue、directives/permission/hasPermi.js
- 所属项目：太仓G；来源会话：627ed433-0312-4248-8d0c-0ba8b9adafb6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vshow_vhaspermi_conflict",
  "source_extraction_id": "d3b28c99a0db46578f9102cf955f5f7e",
  "version": 1,
  "memory_type": "entities"
}
-->