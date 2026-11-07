# 预售模板.el-input全宽撑满日期选择器
苏州市房地产监测V3 预售模板中 `.narrative-block` 内 `.el-input` 设 `width: 100%` 导致日期选择器撑满整行。

## 根因与修复
- 根因为 `.narrative-block` 内 `.el-input` 设置 `width: 100%` 导致日期选择器撑满整行
- 调整为仅 `textarea` 全宽，幢号输入框与日期选择器恢复紧凑 inline 宽度（48px / 100px）

## 涉及文件
- `src/views/presale/permit/components/PresalePlanFillForm.vue`
- `.workbuddy/memory/2026-09-11.md`
- `src/views/presale/permit/plan/detail.vue`
- `e2e/fixtures/presale-permit-helpers.js`
- `src/views/presale/permit/permitConstants.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/171.md
- 来源会话ID：76e18476-410b-48e2-8684-b252aafae89d
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_el_input_width",
  "source_extraction_id": "295ffa7531404838aa299598fc454f39",
  "version": 1,
  "memory_type": "entities"
}
-->