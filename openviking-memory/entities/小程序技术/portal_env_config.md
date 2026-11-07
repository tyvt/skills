# 环境配置集至portal-env-config.js
新建 utils/portal-env-config.js 统一维护三类环境配置及解析逻辑，供各模块导入。

## 配置内容
- 统一维护三类配置：CT_AUTH_API_BASE_URL_MAP（CT认证/门户API基址，环境变量 VUE_APP_CT_AUTH_BASE_URL_* 覆盖）、WEBVIEW_URL_MAP（内嵌H5 web-view基址，VUE_APP_WEBVIEW_URL_* 覆盖）、OPERATION_REPORT_API_BASE（经营报告PDF接口基址，VUE_APP_OPERATION_REPORT_BASE 覆盖）
- 提供方法：getMiniProgramEnvVersion() 读取 develop/trial/release；resolveConfigByEnv(map) 按环境解析配置；getCtAuthApiBaseUrlByEnv() 与 getPortalH5WebViewBaseUrl() 为对外便捷方法

## 引用改造
- 各引用文件（如 portal-user.js）改为从该模块导入配置，不再各自硬编码
- 涉及文件：utils/portal-env-config.js、utils/portal-user.js、utils/portal-h5-webview.js、utils/settings.js、pages/face/bdc.vue、pages/webview/home.vue

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 来源会话：0a1c8f1d-c0c4-4b13-b58b-d89842dbd647
- 所属项目：小程序（wygl-wxxcx-dev-slh）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_env_config",
  "source_extraction_id": "1f526f9b33044d01add05406ee34a3b0",
  "version": 2,
  "memory_type": "entities"
}
-->