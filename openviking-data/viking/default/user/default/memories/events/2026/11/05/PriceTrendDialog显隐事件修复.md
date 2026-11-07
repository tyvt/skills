# Summary
2026-11-05，产品2.0 修复 maintenance/maintenanceApply/components/PriceTrendDialog.vue：不再在 prop 上使用 v-model，改为 :visible 配合 @update:visible 控制对话框显隐。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】fact
【标题】D:/repository/产品2.0/zhi2-w
【内容】当前进度总结如下： **已完成的修复** 1. **maintenance/initiation/detail.vue** - 将误放在 `#prepend` 里的 `#append` 提到与 `#prepend` 同级。 2. **maintenance/maintenanceApply/components/PriceTrendDialog.vue** - 不在 prop 上使用 v-model，改为 `:visible` + `@update:visible`。 3. **maintenance/maintenanceProject/detail.vue** - 同上，修正 `#prepend` / `#append` 的嵌套，改为同级。 4. **property/complex/components/StatisticsDialog.vue** - `#title` 只包标题并提前闭合，主体内容放到默认插槽，`#footer` 与 `#title` 同级。 5. **property/complexDeliveryApply/detail.vue** - `-if` 改为 `v-if`；`<template #footer>` 移出 form-box，作为 `zs-dialog` 的直接子节点。 6. **property/spotChecking/checkingDia
【验证证据】extracted source=cursor project=2-0
【涉及文件】**maintenance/initiation/detail.vue ; **maintenance/maintenanceApply/components/PriceTrendDialog.vue ; **maintenance/maintenanceProject/detail.vue ; **property/complex/components/StatisticsDialog.vue
【所属项目】2-0
【来源会话ID】74b0cccb-98ed-4ca2-b756-cfe54408c16b
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "PriceTrendDialog显隐事件修复",
  "goal": "修复prop v-model用法",
  "summary": "2026-11-05，产品2.0 修复 maintenance/maintenanceApply/components/PriceTrendDialog.vue：不再在 prop 上使用 v-model，改为 :visible 配合 @update:visible 控制对话框显隐。",
  "ranges": "5-12",
  "source_extraction_id": "250d9c7abad647a092e8e1f658ea7961",
  "version": 1,
  "memory_type": "events"
}
-->