# Tab Scrollbar Bug
Global CSS scrollbar styling in main.css added left/right arrows to all scrollbars, causing tab bar anomalies and last tab hidden in EstateManagement V0 project.

## Description
- Affects tab bar (#myTab) in EstateManagement-Base and EstateManagement-Park webapps.
- Last tab was squeezed out due to width:88.5% not filling and inaccurate offsetLeft calculation.

## Root Cause
- main.css global scrollbar style applied arrows to all scrollbars; tab bar inherited left arrow anomaly.
- width:88.5% left the bar non-full; offsetLeft calc inaccurate.

## Solution
- Hide arrows specifically for #myTab.
- Change tab bar to left:220px;right:0 to occupy full width.
- Use getBoundingClientRect for scroll logic and add scroll-padding-inline:20px to keep last tab visible.

## Verification and Attribution
- Verification source: 园区V0/001.md.
- Involved files: d:/repository/园区V0/EstateManagement-Base/src/main/webapp/commonJs/BaseJs.js; EstateManagement-Park index.html; bootstrap-tab.js; BaseJs.js; main.css; bootstrap-tab.css; template.css; ServerInterface.js.
- Source session ID: a726fbc6-506c-419b-8b8c-b02f10958d6b.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "tab_scrollbar_bug",
  "source_extraction_id": "1429bde0b94f491e903b99dc6f297e69",
  "version": 1,
  "memory_type": "entities"
}
-->