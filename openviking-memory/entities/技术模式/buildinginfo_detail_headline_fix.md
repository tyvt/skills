# 楼幢信息详情页表格间距与按钮对齐修复
苏州市房地产监测V3 的 buildinginfo/detail.vue 修复了表格上方无间距与按钮未对齐标题的问题。

## 问题根因
- Headline 的 scoped 样式写了 `padding: 0 var(--detail-content-padding)`，覆盖全局 `.collapse-content` 的 `padding-top`
- `<template #right>` 在 Vue 2 运行时编译插槽未正确挂载，按钮落到内容区顶部

## 修复内容
- Headline 改为只设置左右内边距，顶部间距由全局 `--detail-content-padding`（16px）控制
- 按钮改用 Vue 2 `slot="right"` 写法与 `collapse-header-actions` 类，避免套用 `operation-button-container` 样式

## 验证与归属
- 刷新后「新增」「删除」与「楼幢信息」标题同行垂直居中，表格与标题栏间距 16px
- 涉及文件：buildinginfo/detail.vue、Headline/index.vue、AppendixPackageSection/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：55183d55-3907-40ff-8f33-f2afa3023b7a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildinginfo_detail_headline_fix",
  "source_extraction_id": "006a04fcf9644149a135bbe7d42014c7",
  "version": 1,
  "memory_type": "entities"
}
-->