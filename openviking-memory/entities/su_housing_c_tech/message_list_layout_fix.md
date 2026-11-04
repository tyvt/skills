# Message List Item Layout Misalignment Fix
In Su Zhu Fang C (zhi2-mobile-shimin), the message list item originally placed icon, title, and tag on the same row with summary on a separate line, causing summary misalignment and title compression. Fixed by a left bell icon with red dot, right first-row title + tag + time, second-row summary, title font-weight 600.

## Root Cause
- message.vue list item originally placed icon, title, and tag on same row with summary on separate line, causing summary misalignment and title compression

## Solution
- Adjusted to left bell icon with red dot, right first row title + tag + time, second row summary
- Title font-weight 600
- If title does not show, check whether dictionary msg_bus_code_H5 is loaded

## Involved Files
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/message/message.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/message/index.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/message/message.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_my/robot/index.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/msg.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_main/message/index.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsDict/ZsDict.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/components/ZsCheckbox/ZsCheckbox.vue

## Verification and Attribution
- Verification evidence: extracted source=cursor session=1b6b9470-2d5b-4ade-a9e6-8d19594ebac4
- Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "message_list_layout_fix",
  "source_extraction_id": "3cbdf3040fb54620be57d598c520b61e",
  "version": 1,
  "memory_type": "entities"
}
-->