# zs-input-number step=1 致小数输入受限
苏州市房地产监测V3 的 zs-input-number 组件因默认 step 配置仅允许整数输入，导致小数输入被限制。

## 问题根因
- 默认 `step-strictly: true` 且 `step` 为 1，仅允许整数倍输入
- `precision=2` 只控显示不解决步进限制

## 关键修复
- `zs-input-number.vue` 未传 `step` 时按 `precision` 推导（`precision=2`→`step=0.01`）
- `presale-permit-helpers.js` 的 `fillAndSavePlan` 增加 `1.25` 输入断言防回归

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/092.md
- 涉及文件：zs-input-number.vue、presale/permit/plan/detail.vue、presale-permit-helpers.js、package.json、vite.config.js、PresalePlanFillForm.vue、main.js、element.js
- 来源会话：b6064b79-ffff-4208-838f-ab32633f8d33；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_bug",
  "source_extraction_id": "1056cdb0ea05475b865e7d490ec11c28",
  "version": 1,
  "memory_type": "entities"
}
-->