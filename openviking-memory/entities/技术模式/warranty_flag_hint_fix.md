# Warranty Flag Hint Fix
质保弹窗金额提示原用 `guaranteeDate` 与当天比较，与表格 `warrantyFlagG` 判定分歧致提示相反，已统一改用 `warrantyFlagG` 与 `costG`。

## 问题根因
- 弹窗 `showGuaranteeAmountHint` 原逻辑用 `guaranteeDate` 与当天比较
- 表格用 `warrantyFlagG === '1'` 判定，两者分歧导致提示相反

## 修复方案
- `maintenanceFeeDtlDialog.vue` 的 `showGuaranteeAmountHint` 统一采用 `warrantyFlagG` 与 `costG`
- 在 form 中新增 `warrantyFlagG` 供详情接口合并与重置

## 验证与归属
- 涉及文件：`maintenanceFeeDtlDialog.vue`
- 来源会话ID：0e145147-abb9-4862-9f20-b936ec9fd6cf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "warranty_flag_hint_fix",
  "source_extraction_id": "f596bc30279349fea2ae1f4d44877d40",
  "version": 1,
  "memory_type": "entities"
}
-->