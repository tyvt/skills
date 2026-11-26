---
audit_status: valid
last_checked: 2026-11-26T16:25:02+08:00
verdict_note: 步骤条布局偏好；all/src/components/StepBar/StepBar.vue 等命中 step-bar(6)、nowrap，flex-1/--after 做法与现状一致。
---
- When building step bars, avoid root container `items-center` that shrinks flex children; add `w-full` to step bar, set `.step` to `flex:1` and draw connectors with `::after`, and add `white-space:nowrap` to labels.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "step_bar_layout",
  "source_extraction_id": "3bb0712c3896440ab28175df8082cca0",
  "version": 1,
  "memory_type": "preferences"
}
-->