# data() 中状态名称不一致导致 undefined
在项目 苏州市房地产监测V3 中，`chooseHouseDialog.vue` 在 `data()` 中声明了 `selection.origin/target`，但 methods 使用了 `selectedOrigin/Target`，导致在 `forEach` 中出错。

## 问题根因
- `chooseHouseDialog.vue` 的 `data()` 声明了 `selection.origin/target`
- methods 使用了未初始化的 `selectedOrigin/Target`，在调用 `forEach` 时出错

## 解决方案
- `data()` 改为声明 `selectedOrigin: []` 和 `selectedTarget: []`，移除了 `selection`
- `onClose` 重置状态；`handleDown/Up` 在没有选择时返回

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：62a1ffcb-1ad7-433b-9cc8-6f6f5585bd2e
- 验证证据: src=苏州市房地产监测V3/269.md
- 涉及文件: chooseHouseDialog.vue, index.vue (commercialHousingSales/presale/contractMainInfo), contract-sign-helpers.js
- 所属项目: 苏州市房地产监测V3; 会话: 62a1ffcb-1ad7-433b-9cc8-6f6f5585bd2e; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_state_fix",
  "source_extraction_id": "8b596fb5c71140e8af7f969beaff9a2d",
  "version": 1,
  "memory_type": "entities"
}
-->