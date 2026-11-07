- 在 pages/webview/externalWebview.vue 依据 envVersion 与 authCode === 0 判断分支：开发环境不调 selectMyHouseByLingXi 直接续流；非开发环境弹 uni.showToast 并 return 终止选房。
- 终止时置 lingXiQueried 为 true 防止重复触发。
- 验证证据：extracted source=cursor session=591f20d2-2801-494e-9917-cd9943d6d175；涉及文件：pages/webview/externalWebview.vue；来源会话ID：591f20d2-2801-494e-9917-cd9943d6d175；代码基线：none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "authCode环境分支选房处理",
  "source_extraction_id": "c2465f155ae24dbdbc2237a960d3ebb5",
  "version": 1,
  "memory_type": "preferences"
}
-->