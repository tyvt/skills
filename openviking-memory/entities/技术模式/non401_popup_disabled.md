# 非401接口异常全局弹窗暂禁用
园区物管2.0 的 axios 响应拦截器中注释业务码非200与请求失败的 MessageBox 弹窗，仅保留401登录过期提示。

## 问题根因
- 原 axios 响应拦截器对业务码非200、请求失败均弹 MessageBox 全局错误框
- 部分场景不希望非401异常打扰用户，故临时注释对应 MessageBox 弹窗逻辑

## 解决方案
- 在 zhi2-web-admin/src/utils/request.js 响应拦截器中注释业务码非200与请求失败的 MessageBox 弹窗
- 仅保留401登录过期提示分支
- 接口仍 Promise.reject，恢复弹窗需取消对应注释

## 验证与归属
- 验证证据：园区物管2.0/060.md
- 涉及文件：zhi2-web-admin/src/utils/request.js
- 所属项目：园区物管2.0；来源会话：e4c07993-740c-4ed4-936b-ea9e9f31c8b1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "non401_popup_disabled",
  "source_extraction_id": "9ba7963f3db241c4825b708673e79008",
  "version": 1,
  "memory_type": "entities"
}
-->