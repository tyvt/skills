# DetailTemplate 同类布局问题全局修复
苏州市房地产监测V3 完成 exchangeContract 同类布局问题全局排查与修复，扩展脚本自动修复 350+ 文件。

## 修复脚本与规则
- 扩展 zhi2-web-admin/scripts/fix-detail-form-layout.mjs，扫描 2317 个 .vue 文件
- DetailTemplate 后 `<template v-else>` 改为 `<el-row v-else :gutter="24">`（支持任意 v-if 条件）
- Headline 内嵌 zs-form 提升为 zs-form 包裹 Headline；Headline 内直接放 el-col 用 `<el-row :gutter="24">` 包裹
- el-col :span="24" 包裹 Headline 去掉多余包裹层；el-row v-else 内嵌套 el-col :span="24" 展开内层 el-col

## 修复结果与涉及文件
- 累计自动修复 350+ 文件（含 detail 页及同类 Dialog）
- 涉及文件：company/brand/detail.vue、commercialHousingSales/presale/specialcontract/detail.vue、components/contractTable.vue 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：9cef6548-281c-458c-8b71-7f1779b265a0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_layout_fix",
  "source_extraction_id": "d465aecbeb4342b69de5b9a977f1992c",
  "version": 1,
  "memory_type": "entities"
}
-->