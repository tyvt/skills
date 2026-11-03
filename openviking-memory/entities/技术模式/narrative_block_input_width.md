# 叙事块内输入框全宽致日期选择器撑满整行
苏州市房地产监测V3 的 `.narrative-block` 内 `.el-input` 设 `width:100%` 导致日期选择器撑满整行，已改为仅 textarea 全宽并恢复紧凑 inline 宽度。

## 问题根因
- `.narrative-block` 内 `.el-input` 被设为 `width: 100%`
- 竣工/交付/工程进度的幢号输入框与日期选择器因此撑满整行

## 修复方案
- 改为仅 `textarea` 保持全宽
- 幢号输入框恢复 `48px` 紧凑 inline 宽度
- 日期选择器恢复 `100px` 紧凑 inline 宽度

## 涉及文件
- zhi2-web-admin/src/views/presale/permit/components/PresalePlanFillForm.vue
- .workbuddy/memory/2026-09-11.md
- zhi2-web-admin/src/views/presale/permit/plan/detail.vue
- zhi2-web-admin/e2e/fixtures/presale-permit-helpers.js
- zhi2-web-admin/src/views/presale/permit/permitConstants.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/155.md
- 来源会话：76e18476-410b-48e2-8684-b252aafae89d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "narrative_block_input_width",
  "source_extraction_id": "5226bb432f51444c806d951babd78102",
  "version": 1,
  "memory_type": "entities"
}
-->