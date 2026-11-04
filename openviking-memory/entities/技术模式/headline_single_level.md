# 合同详情标题层级扁平化
苏州市房地产监测V3 的 `specialcontract` 模块将父 Headline 套子 Headline 改为子表组件独占一个 Headline，按钮上移。

## 改动文件
- `specialcontract/detail.vue`：删除父 `Headline`（title-text="合同信息"）包裹子 `contractTable` 的结构，改为 `contractTable` 直接带 `title-text`
- `specialcontract/components/contractTable.vue`：默认文本由「明细」改为「合同信息」

## 设计约定
- 遵循仓库既有约定（如 `businessItemTable`/`assetTable`），子表组件独占一个 Headline
- 原结构：合同信息(父)套明细(子)，按钮挂在子层；现按钮随子表组件上移

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：ed41ad4f-538d-41dd-8437-aa4dccefa372；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_single_level",
  "source_extraction_id": "8b3fd04925784d4a9e921898df472afd",
  "version": 1,
  "memory_type": "entities"
}
-->