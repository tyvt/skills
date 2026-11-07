# Building Unit Lazy Tree Component
The 苏州市房地产监测V3 project extracted the duplicated building-unit left tree from contract refund and payment dialogs into a shared lazy-loading component BuildingUnitLazyTree.vue.

## Background
- ContractDialog.vue and BuildingDialog.vue previously duplicated el-tree + loadNode to render the building-unit left tree

## Solution
- Added views/components/BuildingUnitLazyTree.vue as a shared component
- Lazily loads buildings/units via listFy/listNofenye (bizState: '2') and listUnitinfo
- Integrated into ContractDialog.vue, BuildingDialog.vue, PaymentNoticeDialog.vue and other dialogs for unified reuse

## Verification
- Evidence: src=苏州市房地产监测V3/100.md
- Files: supervision/deposit/refund/detail.vue, PaymentNoticeDialog.vue, ContractDialog.vue, BuildingDialog.vue, selectDialog.js, etc.
- Project: 苏州市房地产监测V3; Session: 85cb61cc-a222-4e94-9f77-255ce248f02c; Codebase: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：85cb61cc-a222-4e94-9f77-255ce248f02c


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "building_lazy_tree",
  "source_extraction_id": "c897409ca5db4fc997b9baffac0093bb",
  "version": 1,
  "memory_type": "entities"
}
-->
