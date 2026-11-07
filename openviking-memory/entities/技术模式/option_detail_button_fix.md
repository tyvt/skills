# 选项表决详情操作按钮不显示修复
太仓G端选项表决详情页操作按钮（提前结束、延期等）不显示，需统一权限指令与状态判断。

## 问题根因
- bug2436 将按钮从 `v-hasPermi` 改为 `hasPerm()` + `v-if`，与维修资金表决等页面不一致，部分环境下按钮不渲染
- `decisionState`、`bizState` 可能为数字，而 `showRevoke` 用 `['1','2','5'].includes(this.form.decisionState)`，数字 5 时 includes 失败
- `v-hasPermi` 指令缺陷：仅有 update 钩子，首次挂载不校验权限，无权限隐藏后不恢复 display

## 修复方案
- `optionDecision/detail.vue`：操作按钮改回 `v-show` + `v-hasPermi`（与 ownerDecision 一致）
- 权限同时支持 `estate:optionDecision:*` 和 `estate:ownerDecision:*`
- 用 `decisionStateValue`、`isSubmittedBiz` 等计算属性统一状态判断
- 延期（状态 5）时也会显示对应按钮

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 6bb25673 选项表决详情未显示提前结束等按钮；修复后正常
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/detail.vue、src/directive/permission/hasPermi.js、src/mixins/detailMixins.js、src/router
- 所属项目：太仓G；来源会话：6bb25673-a3f0-4f17-9c69-8943d17f4cb8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_detail_button_fix",
  "source_extraction_id": "78e0df094dee43b49796d6b7e7fe13b6",
  "version": 1,
  "memory_type": "entities"
}
-->