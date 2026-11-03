# webview首页维修资金接口带门户auth且toast展示后端msg
pages/webview/home.vue 调维修资金、业主决策等前置接口时须带门户 Token，并用统一 toast 展示后端错误。

## 请求规范
- 请求头 auth 必须与 pages/user/index/index.vue 一致的门户 Token，不要用全局旧 token
- utils/portal-h5-webview.js 用 extractMaintenanceApiErrorMessage 从 Error、响应体 msg/message、errMsg 提取文案
- HTTP 非 200 优先 body 中的 msg/message，页面侧 showApiErrorToast(error, fallback) 统一 uni.showToast
- 401 时返回空串，避免与门户「登录已过期」类全局提示重复弹两次

## 验证与归属
- 验证证据：会话 9b72f418 维修资金接口加 auth；extractMaintenanceApiErrorMessage + home.vue showApiErrorToast；示例 code 500 msg 房屋信息不存在 直接 toast
- 涉及文件：pages/webview/home.vue、utils/portal-h5-webview.js
- 所属项目：小程序；来源会话ID：9b72f418-a53c-458b-aed6-239b94496419；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "home_api_auth_toast",
  "source_extraction_id": "3009dd90074b496cb5ed0d2113ea792c",
  "version": 1,
  "memory_type": "entities"
}
-->