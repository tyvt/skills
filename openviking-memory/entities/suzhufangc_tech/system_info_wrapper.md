# System Info Wrapper Utility
WeChat deprecated `wx.getSystemInfoSync`; a new wrapper utility `system-info.js` was added to use `wx.getWindowInfo()` and compatible `uni.getSystemInfo` callback.

## Background
- WeChat mini-program deprecated `wx.getSystemInfoSync` and recommends `wx.getWindowInfo()` and similar interfaces.
- Old calls existed in 12 places including `App.vue` and `StatusBar.vue`.

## Solution
- Added `zhi2-mobile-shimin/src/utils/system-info.js` wrapping `getWindowInfo` and a compatible `getSystemInfo` for `uni.getSystemInfo` callback.
- Replaced the 12 old calls with the new wrapper.

## Verification
- Evidence: source `苏住房C/025.md`.
- Involved files: `src/App.vue`, `src/utils/index.js`, `package.json`, `src/pages_credit/companyCredit/index.vue`, `src/pages_credit/dishonestyCredit/index.vue`, `src/pages_tab/components/Home_Suzhufang.vue`, `src/pages/index/components/menu/MidModuleGrid.vue`, `src/pages/index/components/Project_Suzhufang.vue`.
- Project: SuZhuFangC; source session: 38194afa-6f69-47b8-afec-2cec1a1ae8ae; code baseline: none.

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：38194afa-6f69-47b8-afec-2cec1a1ae8ae


<!-- MEMORY_FIELDS
{
  "category": "suzhufangc_tech",
  "name": "system_info_wrapper",
  "source_extraction_id": "4656c42590084da4bf12a8a609364eb0",
  "version": 1,
  "memory_type": "entities"
}
-->
