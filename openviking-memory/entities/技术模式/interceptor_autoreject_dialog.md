# 接口拦截器自动 reject 致登记弹窗缺失
handleHouseOwner 非 200 时 HTTP 拦截器自动 showToast 并 reject，页面无 catch 致人工登记弹窗缺失。

## 问题根因
- handleHouseOwner 非 200 时 HTTP 拦截器自动 showToast 并 reject
- 页面无 .catch 处理，导致人工登记弹窗缺失
- 核验失败时，全局 HTTP 拦截器会先弹出 Toast 并 `reject`，页面里的 `showPopup = true` 无法执行，看不到「人工登记」弹窗

## 解决方案
- httpInstance.js：`noReject` 分支改为直接 `return response`，避免 Promise 嵌套导致响应解析异常
- property.js：`handleHouseOwner` 默认带上 `noReject: true`，由页面自行处理业务错误（早期方案曾新增 verifyHouseOwner 避免自动 reject）
- addHouse.vue 与 addHouseContract.vue 接管失败逻辑展示弹窗
- addHouseContract.vue：`ZsPopup` 移到页面根级；抽取 `handleVerifyResult`；增加 `.catch()` 兜底；部分成功场景与 addHouse.vue 对齐；补充 `z-index: 9999`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：2bea3534-bd43-456f-baef-32b59c649b85
- 验证证据：cursor 会话 2bea3534-bd43-456f-baef-32b59c649b85；补充会话 0e3de74d-cc4d-4e34-8770-dd23e2757471
- 涉及文件：httpInstance.js、addHouse.vue、addHouseContract.vue、TypeChoose_Suzhufang.vue、authentication.vue、property.js、PropertyAdd.vue、add.vue、index.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "interceptor_autoreject_dialog",
  "source_extraction_id": "5117a99df72949b2bc4386bc627f3a94",
  "version": 2,
  "memory_type": "entities"
}
-->