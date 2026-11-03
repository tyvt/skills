# 环境配置集至portal-env-config.js
新建 utils/portal-env-config.js 统一维护三类环境配置及解析逻辑，供各模块导入。

## 配置内容
- 统一维护 CT_AUTH_API_BASE_URL_MAP、WEBVIEW_URL_MAP、OPERATION_REPORT_API_BASE 三类配置及解析逻辑
- 提供 getMiniProgramEnvVersion 等环境版本解析方法

## 引用改造
- 各引用文件（如 portal-user.js）改为从该模块导入配置，不再各自硬编码
- 涉及文件：utils/portal-env-config.js、utils/portal-user.js、utils/portal-h5-webview.js、utils/settings.js、pages/face/bdc.vue、pages/webview/home.vue

## 验证与归属
- 来源会话：0a1c8f1d-c0c4-4b13-b58b-d89842dbd647
- 所属项目：小程序（wygl-wxxcx-dev-slh）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_env_config",
  "source_extraction_id": "f8f2d02b96524106a6bb0d48004c87f7",
  "version": 1,
  "memory_type": "entities"
}
-->