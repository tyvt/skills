# 上传期间onShow清仓库致证件信息空
苏住房C小程序 App.onShow 清空 userStore 临时数据，导致 FormManual.vue 提交时读取证件信息为空，已通过快照修复。

## 问题根因
- App.onShow 调用 getUserInfo 清空 userStore 临时数据
- FormManual.vue 提交时若读取 userStore 则证件信息为空

## 解决方案
- FormManual.vue 于 onLoad 将 userStore 的 idType 等快照至 verifyInfo
- 提交改读快照并增加空值兜底校验

## 验证与归属
- 验证证据：src=苏住房C/058.md
- 涉及文件：pages_my/verification/FormManual.vue、api/security.js、pages_my/verification/FormLocal.vue、pages_my/verification/FormNonLocal.vue、store/user.js、api/index.js、api/httpInstance.js、App.vue
- 来源会话ID：fe7db194-e3eb-4ff2-81a5-4fc5d0da76f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "onshow_userstore_clear",
  "source_extraction_id": "6d2d014529be465fbbb01ab3f8d573a9",
  "version": 1,
  "memory_type": "entities"
}
-->