# 三种注册流程附件上传组件
苏州市房地产监测V3 的 zhi2-web-admin 中，三种注册流程的附件上传相关组件与提示文案位置说明（截至2026-11-13重复提示已删除）。

## 涉及组件
- 三个单页注册表单：/companyRegister（用 CompanyRegisterSingleForm.vue）、/institutionRegister 与 /leaseInstitutionRegister（共用 InstitutionRegisterSingleForm.vue）
- 多步流程组件 Step3Appendix.vue 在 src/views 无引用，非线上落点，自带同名 getUnionAcceptTypes 方法，不在本次范围
- 卡片下方「支持的文件类型」提示位于 AppendixRequirementGrid 内，保留未删

## 历史改动
- 2026-11-13 用户请求去除三个注册附件中的重复 uploadTip 提示；助手删除 CompanyRegisterSingleForm.vue 与 InstitutionRegisterSingleForm.vue 中的 uploadTip computed、.upload-tip 样式、提示行，以及 Company 表单仅其消费的 getUnionAcceptTypes 方法
- 同步删除 e2e 两处 .upload-tip 断言（register-helpers.js、appendix-formats.spec.js）；子模块提交 26282982b 推送 develop/v3.0.0，父仓 gitlink 26ae481b 新增台账 E-052

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源：2026-11-13 会话，助手探索定位并实施删除

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_attachment_upload",
  "source_extraction_id": "bc7a6e962d9e4bdb9bfb64415bbf6e48",
  "version": 2,
  "memory_type": "entities"
}
-->