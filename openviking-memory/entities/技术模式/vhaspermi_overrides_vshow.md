# v-hasPermi 覆盖 v-show 致按钮误显
太仓G端按钮混用 `v-show` + `v-hasPermi`，指令直接设 `el.style.display` 覆盖 `v-show` 隐藏，致有权限时忽略业务判断而显示。

## 问题根因
- `v-hasPermi` 指令直接修改 `el.style.display`（见 `hasPermi.js`）
- 状态变更后 `v-show` 隐藏被其覆盖，按钮持续显示，与后端 `decisionState` 无关
- 用户有权限时忽略 `showRevote` 等业务判断而显示按钮

## 修复约定
- 改用 `v-if` 合并权限判断 `checkPermission([...])`，不混用 `v-show` + `v-hasPermi`
- 涉及按钮：撤销（revoke）、「提前开始」等

## 验证与归属
- 验证证据：会话 149638fc 与 627ed433 用户报按钮误显/仍显示
- 涉及文件：ownerDecision/detail.vue、sortDecison/detail.vue、optionDecision/detail.vue、generalDecision/detail.vue、directives/permission/hasPermi.js、utils/permission.js、maintainDecision/detail.vue、api/estate/ownerDecision.js、repairFunds/usage/publicity/components/StartPublicityBtn.vue、mixins/detailMixins.js
- 所属项目：太仓G；来源会话：149638fc-44a7-4dab-b512-5ab121c6a255、627ed433-0312-4248-8d0c-0ba8b9adafb6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vhaspermi_overrides_vshow",
  "source_extraction_id": "b3c0a8593584475eb37a8ad50767e7d1",
  "version": 1,
  "memory_type": "entities"
}
-->