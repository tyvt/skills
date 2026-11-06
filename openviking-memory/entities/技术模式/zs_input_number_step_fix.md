# 容积率小数输入修复
苏州市房地产监测V3 中 `zs-input-number` 组件未传 `step` 时按 `precision` 自动推导，解决容积率等小数字段无法输入问题。

## 问题根因
- `zs-input-number` 默认 `step-strictly: true` 且 `step=1`，只允许整数倍输入
- `precision=2` 仅控制显示格式，不能解决步进限制

## 修复内容
- `zs-input-number.vue`：未传 `step` 时按 `precision` 推导（`precision=2` → `step=0.01`；未设置 → `step=1`；显式传入以调用方为准）
- `presale-permit-helpers.js` 的 `fillAndSavePlan` 增加容积率 `1.25` 输入与断言防回归

## 影响范围
- 同页 `landAreaTotal`、`planBuildAreaTotal` 及 `PresalePlanFillForm` 所有 `precision=2` 字段无需逐个改页面

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zs-input-number.vue`、`presale-permit-helpers.js`、`plan/detail.vue`、`package.json`
- 所属项目：苏州市房地产监测V3；来源会话：b6064b79-ffff-4208-838f-ab32633f8d33；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_number_step_fix",
  "source_extraction_id": "acdf608e6c0e448bb2d07a9151e852b1",
  "version": 1,
  "memory_type": "entities"
}
-->