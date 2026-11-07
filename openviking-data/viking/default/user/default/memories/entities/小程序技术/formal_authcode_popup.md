# 正式版authCode=0弹窗提示未选房屋
wygl小程序externalWebview在正式版且authCode=0时改为展示特定弹窗，不再调用selectMyHouse。

## 触发条件
- 环境为正式版（非develop/trial）
- authCode等于0时触发新逻辑

## 行为变更
- 不再调用selectMyHouse接口
- 展示标题「房屋添加失败」、文案「您未选择房屋」弹窗
- 开发版与体验版保持原逻辑不变

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue
- 来源会话：496a842d-c8f7-4bf8-a412-e621b81b9e60
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "formal_authcode_popup",
  "source_extraction_id": "13a6f7e5d40744838e74b52e260871ff",
  "version": 1,
  "memory_type": "entities"
}
-->