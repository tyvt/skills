# 全局请求拦截器404静默
园区物管2.0 的 axios 响应错误拦截器对 HTTP 404 直接 reject，不弹全局错误框，交由调用方处理。

## 需求背景
- 部分接口返回 404 表示「无资源/未配置」，属正常业务态，不希望全局错误框打扰用户

## 解决方案
- 在 axios 响应错误拦截器判断 `response?.status === 404` 时直接 `return Promise.reject(error)`
- 跳过原有 MessageBox/统一提示逻辑，调用方仍可在 `.catch` 里按无数据处理
- 边界：若后端返回 HTTP 200 且 body 内 `code: 404`，仍走成功拦截器的业务错误提示，需单独加分支才能静默
- 与已知「拦截器丢弃字段」「路径末段改写」属不同维度，不混为一一处

## 验证与归属
- 验证：会话 1b81754e 用户要求接口返回 404 不提示错误，在 request.js 错误处理增加 status===404 早退 reject
- 涉及文件：zhi2-web-admin/src/utils/request.js
- 所属项目：园区物管2.0；代码基线：3856ff194；来源会话：1b81754e-c698-4c11-af77-68d2d777a757

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "request_404_silent",
  "source_extraction_id": "00d55c383c404a0fb0e864045dac2dc7",
  "version": 1,
  "memory_type": "entities"
}
-->