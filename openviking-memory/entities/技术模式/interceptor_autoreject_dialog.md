# 接口拦截器自动 reject 致登记弹窗缺失
handleHouseOwner 非 200 时 HTTP 拦截器自动 showToast 并 reject，页面无 catch 致人工登记弹窗缺失。

## 问题根因
- handleHouseOwner 非 200 时 HTTP 拦截器自动 showToast 并 reject
- 页面无 .catch 处理，导致人工登记弹窗缺失

## 解决方案
- property.js 新增 verifyHouseOwner（noReject:true）避免自动 reject
- addHouse.vue 与 addHouseContract.vue 接管失败逻辑展示弹窗

## 验证与归属
- 验证证据：cursor 会话 2bea3534-bd43-456f-baef-32b59c649b85
- 涉及文件：addHouse.vue、addHouseContract.vue、TypeChoose_Suzhufang.vue、authentication.vue、property.js、PropertyAdd.vue、add.vue、index.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "interceptor_autoreject_dialog",
  "source_extraction_id": "c66174cae1ae4980af55b9f34536beff",
  "version": 1,
  "memory_type": "entities"
}
-->