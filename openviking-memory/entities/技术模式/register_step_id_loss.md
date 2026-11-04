# 后退注册步骤时丢失ID
在项目 苏州市房地产监测V3 中，Step3 的 `@prev` 调用了不带参数的 `goStep2`，将 `companyRegisterId` 写为 `undefined` 并清空了 `queryRegisterRecord`。

## 问题
- 不带参数的 `goStep2` 导致 URL 为 `companyRegisterId=undefined`，清空了 `queryRegisterRecord`，导致管理员信息回显失败以及下一步 ID 缺失错误。

## 解决方案
- `index.vue` 统一了 `goStep(step)` 以保留路由 ID；路由变更时调用 `loadRegisterDetailIfNeeded()` 来获取详情。
- `institutionRegister.js` 添加了 `getInstitutionRegisterDetail`，带有 `noMessage/noReject` 以避免全局错误。

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-rest/020.md; 会话 9fe9ee18-7352-4a5c-bc63-a249f00380ff.
- 涉及文件: d:/repository/苏州市房地产监测V3/路由信息.json, institutionRegister/index.vue, Step2AdminInfo.vue, Step3Appendix.vue, Step1BasicInfo.vue, src/api/institution/institutionRegister.js, companyRegister.vue, e2e/company/institution-register-flow.spec.js.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_step_id_loss",
  "source_extraction_id": "261683e4b6f6441e994fe34ffbde724a",
  "version": 1,
  "memory_type": "entities"
}
-->