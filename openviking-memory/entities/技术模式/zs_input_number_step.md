# zs-input-number 步进限制致小数输入失败
苏州市房地产监测V3 的 zs-input-number 默认 step-strictly 且 step=1 仅允许整数输入，precision=2 仅控显示，修复后按 precision 推导 step。

## 问题根因
- zs-input-number 默认 step-strictly: true 且 step 为 1，仅允许整数倍输入
- precision=2 仅控制显示，不解决小数输入限制

## 修复方案
- 未传 step 时 zs-input-number.vue 按 precision 推导（如 precision=2 对应 step=0.01）
- presale-permit-helpers.js 的 fillAndSavePlan 增 1.25 输入断言防回归

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/140.md
- 涉及文件：presale/permit/plan/detail.vue、package.json、vite.config.js、PresalePlanFillForm.vue、main.js、element.js、zs-input-number.vue
- 来源会话：b6064b79-ffff-4208-838f-ab32633f8d33；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_number_step",
  "source_extraction_id": "622bc94388724ad38c296348aac87c4e",
  "version": 1,
  "memory_type": "entities"
}
-->