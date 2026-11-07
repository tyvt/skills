# 体验版门户接口与房屋拉取日志
小程序在体验版（trial）下新增统一门户 API 与房屋拉取业务日志，正式版不打印。

## 日志范围
- utils/portal-user.js 的 requestCtAuth 中统一打印，仅当 envVersion === 'trial' 生效
- 覆盖所有门户接口（登录、profile、ctUserIdentity、灵犀选屋等），含请求/响应/失败，token 已脱敏
- externalWebview.vue 的 maybeLoadTrialHouseList 补充房屋拉取日志：未登录跳过、开始拉取、结果、失败详情

## 查看方式
- 微信开发者工具 → 体验版 → 打开「我的」页 → 登录或刷新 → Console 搜索 `[体验版][PortalAPI]` 与 `[体验版][房屋]`

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：utils/portal-user.js、pages/webview/externalWebview.vue、utils/portal-env-config.js
- 来源会话ID：0f172dbf-633a-4df4-a1bc-5adc70d60876
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "trial_portal_logging",
  "source_extraction_id": "a9326b71aa6c4102918e3d346abe1e23",
  "version": 1,
  "memory_type": "entities"
}
-->