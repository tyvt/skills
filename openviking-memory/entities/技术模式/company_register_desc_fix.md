# 开发企业注册页标题与填写说明修复
苏州市房地产监测V3 的 companyRegister.vue 补全了标题后缀与标题下填写说明，并与 E2E 文案对齐。

## 修改内容
- 标题 `企业账号注册` 改为 `企业账号注册（开发企业）`，与经纪机构页一致
- 标题与「营业执照信息」间新增灰字说明：需填营业执照、法人、管理员信息，上传要件并完成短信验证，提示可通过统一社会信用代码提取企信通信息
- 提交成功结果页通过 `v-if="viewMode === 'form'"` 隐藏说明，避免与成功页冲突

## 涉及文件
- `src/views/register/companyRegister.vue`、`src/views/institutionRegister/InstitutionRegisterPage.vue`、`register-helpers.js`

## 验证与归属
- 刷新注册页可见标题下说明
- 所属项目：苏州市房地产监测V3；来源会话：18b3580d-c81f-4cff-9830-320ca69ec535

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_desc_fix",
  "source_extraction_id": "006a04fcf9644149a135bbe7d42014c7",
  "version": 1,
  "memory_type": "entities"
}
-->