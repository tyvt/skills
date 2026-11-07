# Nav-Bar Slot Tab-Line Left Align Causing Tab Not Centered
In Su Housing C project, placing tab-line inside uni-nav-bar slot defaulted to left alignment, not occupying middle area.

## Problem Root Cause
- tab-line placed in uni-nav-bar slot defaults to left alignment
- The middle region was not filled, so Tab was not horizontally centered

## Fix Approach
- Wrap Tab with `message-nav-tabs` component
- Use absolute positioning `left:50%` + `translateX(-50%)` to center horizontally

## Involved Files
- src/pages_main/message/message.vue
- src/pages_my/robot/index.vue
- src/pages_my/robot/chitchat.vue
- src/pages.json
- src/components/commonNew/tabLine.vue
- src/pages/message/index.vue
- src/pages/message/message.vue
- src/pages_main/message/index.vue

## Verification
- Source cursor session: e5260577-7b96-471b-8868-7016b41f64dd
- Project: Su Housing C (zhi2-mobile-shimin)

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：e5260577-7b96-471b-8868-7016b41f64dd


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "navbar_tab_center",
  "source_extraction_id": "9a18362dd707471eb595985f5916bc72",
  "version": 1,
  "memory_type": "entities"
}
-->
