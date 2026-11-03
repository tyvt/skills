# 个人中心切换房屋走添加房屋流程
handleHouseSwitch 改为调用 navigateToAddHouse()，让切换房屋走添加房屋重新选房流程。

## 行为变更
- 未登录跳登录引导
- 已实名跳 /pages/face/bdc 并带 realName/certCode/mobile
- 未实名先跳 /pages/face/verify 完成实名再进选房
- 「我的房屋」快捷入口保留原 toMyHouse() 行为

## 验证与归属
- 验证：011.md 会话 9e20a341 点切换重新进入 bdc.vue 选择房屋
- 涉及文件：pages/webview/externalWebview.vue
- 来源会话ID：9e20a341-8bec-4e7c-9416-e695f2943465
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "house_switch_flow",
  "source_extraction_id": "fcb833032af14e8ea003acd1fc6646fe",
  "version": 1,
  "memory_type": "entities"
}
-->