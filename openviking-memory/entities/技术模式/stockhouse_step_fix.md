---
audit_status: valid
last_checked: 2026-11-26T22:14:49+08:00
verdict_note: 苏住房C/zhi2-mobile-shimin 实机存在 stockHouseSign/apply.vue 与 steps.vue，步骤条修复文件属实。
---
# 步骤条缺w-full与flex:1致收缩重叠
苏住房C 移动端 `stockHouseSign/apply.vue` 根容器 `items-center` 使步骤条 flex 子项收缩，`steps.vue` 未均分宽度。

## 问题根因
- `apply.vue` 根容器 `items-center` 使步骤条 flex 子项收缩
- `steps.vue` 未均分宽度导致收缩重叠

## 修复要点
- 步骤条加 `w-full`
- `.step` 设 `flex: 1` 并改用 `::after` 绘连线
- 标签增 `white-space: nowrap`

## 涉及文件
- src/pages_transaction/stockHouseSign/apply.vue
- src/pages_transaction/stockHouseSign/components/steps.vue
- src/pages_guard/guardApply/index.vue
- src/pages_guard/components/stepSchedule.vue

## 验证与归属
- 验证证据：extracted source=cursor session=d2267fb0-e77b-4d10-b674-4345440abdf1
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：d2267fb0-e77b-4d10-b674-4345440abdf1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stockhouse_step_fix",
  "source_extraction_id": "0b1118a667fb4be79fab1154368de06d",
  "version": 1,
  "memory_type": "entities"
}
-->