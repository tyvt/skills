# 开发版与体验版 authCode=0 仍调用 selectMyHouse
develop+trial 环境下 authCode=0 时仍正常请求 selectMyHouse，仅 release（正式版）跳过。

## 行为变更
- canCallWithAuthCodeZero = envVersion==="develop"||"trial"
- 原先仅 develop 下 authCode=0 仍调 selectMyHouse，现扩展至 trial
- home.vue 同步修改「体验版 authCode=0 跳过」逻辑

## 验证与归属
- 验证证据：012.md 会话：authCode=0 环境判断调整
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue
- 来源会话ID：12-authcode0
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "authcode0_selectmyhouse",
  "source_extraction_id": "29f1cf776e8946a0b898be26f32b1089",
  "version": 1,
  "memory_type": "entities"
}
-->