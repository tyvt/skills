# 质保金额提示逻辑修复
质保弹窗金额提示原用 `guaranteeDate` 与当天比较，与表格 `warrantyFlagG` 判定分歧导致提示相反，已在 `maintenanceFeeDtlDialog.vue` 中统一改用 `warrantyFlagG` 与 `costG`。

## 问题根因
- 表格用接口下发的 `warrantyFlagG === '1'` 表示「当前在质保期内」，再用 `costG > 0` 判断是否提示金额
- 弹窗原逻辑用 `guaranteeDate` 与「今天」比较，和后台对 `warrantyFlagG` 的判定可能不一致（例如截止日当天、时区、业务规则等）
- 两者分歧导致「表格有/没有提示，弹窗相反」的情况

## 修复方案
- `showGuaranteeAmountHint` 统一使用 `warrantyFlagG === '1'` 判定，不再用 `guaranteeDate` 与当前日期比较
- 金额仍按表格使用 `costG`（概算金额），与「概算金额」列一致
- 在 `form` 中新增 `warrantyFlagG`，便于详情接口合并字段和重置
- `dialogMode === 'view'` 时 `showGuaranteeAmountHint` 直接返回 false

## 涉及项目与归属
- 所属项目：园区物管2.0（项目标识 2-0）
- 涉及文件：`d:\repository\园区物管2.0\zhi2-web-admin\src\views\maintenance\maintenanceApply\components\maintenanceFeeDtlDialog.vue`
- 来源会话ID：0e145147-abb9-4862-9f20-b936ec9fd6cf
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "warranty_flag_hint_fix",
  "source_extraction_id": "ef88b507fc49405e8ead6fd3aef8878b",
  "version": 2,
  "memory_type": "entities"
}
-->