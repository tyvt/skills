# trial环境门户与房屋日志
wygl小程序在 trial 环境下打印门户API与房屋拉取业务日志，正式版不打印。

## 日志位置
- utils/portal-user.js 的 requestCtAuth 在 envVersion === 'trial' 时打印门户 API 日志
- pages/webview/externalWebview.vue 的 maybeLoadTrialHouseList 打印房屋拉取业务日志
- 正式版（非 trial）不打印上述日志

## 验证与归属
- 验证证据：extracted source=cursor session=0f172dbf-633a-4df4-a1bc-5adc70d60876
- 涉及文件：utils/portal-user.js、pages/webview/externalWebview.vue、utils/portal-env-config.js
- 所属项目：小程序（wygl-wxxcx-dev-slh）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "trial_env_logging",
  "source_extraction_id": "be4aa91f02c141399d6ebae445df4642",
  "version": 1,
  "memory_type": "entities"
}
-->