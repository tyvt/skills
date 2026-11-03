# 经纪租赁注册联调失败根因后端返回500
苏州市房地产监测V3 中经纪/租赁机构一步注册改造的真实接口联调失败根因为后端 saveAndSubmit 返回 500，非前端逻辑缺陷。

## 验证情况
- 执行 13 条 Playwright 用例，11 条 Mock 与布局用例（institution-register-flow.spec.js、register-layout.spec.js 等）通过，0 失败
- 真实接口联调用例 institution-register-real-api-flow.spec.js 因后端 saveAndSubmit 返回 500 异常跳过
- 非前端逻辑缺陷

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/048.md
- 涉及文件：经纪机构注册-前端对接变更文档.md、institutionRegister/index.vue、InstitutionRegisterPage.vue、institutionRegister.js、companyRegister.vue、CompanyRegisterSingleForm.vue、Step1BasicInfo.vue、Step2AdminInfo.vue
- 所属项目：苏州市房地产监测V3；来源会话：73cbbe2e-2230-4506-9d89-48940a649115；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_backend_500",
  "source_extraction_id": "193aaf4ba64b42d4a62ba98bf6ee8d2d",
  "version": 1,
  "memory_type": "entities"
}
-->