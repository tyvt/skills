# 响应拦截器并发失败弹窗去重
园区物管2.0 的 request.js 响应拦截器通过模块级标志位，在并发请求失败时只弹第一个错误弹窗，避免叠加。

## 问题背景
- 页面并发多个请求，后端异常或 token 过期时，每个失败请求的响应拦截器各自弹错误提示/登录过期弹窗，瞬间叠出多个 Message 弹窗
- 根因：request.js 的响应拦截器每请求独立执行，弹窗动作无共享状态

## 解决方案
- 在 utils/request.js 加模块级标志位（如 isMessageDialogOpen）
- 业务错误（code != 200）、网络/超时异常、401 登录过期共用同一标志位，并发失败时只有最先触发的那条弹窗，其余静默
- 用户关闭弹窗后标志位重置，之后单独失败的请求仍能正常提示
- 各请求 Promise.reject 逻辑不变，业务侧 catch 照常执行，noMessage: true 的请求依旧不弹

## 验证与归属
- 验证：会话 d6766dd1 用户要求修复多接口同时报错弹窗叠加，最终在 request.js 响应拦截器加 showErrorDialog/showAuthDialog + isMessageDialogOpen 标志位，401 与其他错误共用标志位
- 涉及文件：zhi2-web-admin/src/utils/request.js
- 所属项目：园区物管2.0；代码基线：177bc3ce4；来源会话：822d60cc-da58-4db7-aca0-ca17f03131f2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "response_dialog_dedup",
  "source_extraction_id": "8c9ff18cd576499fa45b34aa0decf72e",
  "version": 1,
  "memory_type": "entities"
}
-->