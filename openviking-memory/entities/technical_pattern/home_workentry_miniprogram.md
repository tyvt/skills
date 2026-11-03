# Home WorkEntry MiniProgram
home.vue handleWorkEntry navigates to work-end mini-program via weixin-js-sdk with environment checks.

## Behavior
- Calls wx.miniProgram.navigateTo using weixin-js-sdk
- Only executed under H5 environment
- Validates WeChat env, WORK_MINI_PROGRAM_APP_ID, and wx.miniProgram.getEnv

## Files
- zhi2-mobile-admin-h5-c-unlimited/src/pages/index/home.vue
- package.json

## Verification
- Source session: 64986899-a25f-4e59-87dc-d9adc4405920

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "home_workentry_miniprogram",
  "source_extraction_id": "2bcf1d30c3a547de9ea1ba2aa3fb1c87",
  "version": 1,
  "memory_type": "entities"
}
-->