# 外部网页 authCode 判断逻辑
externalWebview.vue 根据 envVersion 与 authCode 决定是否调用 selectMyHouse 的流程。

## 行为逻辑
- 获取当前小程序环境 envVersion（develop/trial/release）
- 当存在 authCode 且 authCode === 0 时：
  - 开发环境（develop）：视为成功，不调用 selectMyHouseByLingXi，直接继续拼接 webview src
  - 非开发环境：弹 uni.showToast({ title: "您未选择房屋" }) 并 return 终止 selectMyHouse 调用
- lingXiQueried 仍置为 true 避免重复触发

## 验证与归属
- 改动已通过该文件 linter 检查（无新增报错）
- 涉及文件：pages/webview/externalWebview.vue
- 来源会话ID：591f20d2-2801-494e-9917-cd9943d6d175
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "external_webview_authcode",
  "source_extraction_id": "a9326b71aa6c4102918e3d346abe1e23",
  "version": 1,
  "memory_type": "entities"
}
-->