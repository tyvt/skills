# 身份证格式校验证件类型字典值必须为 document_type 的 '01'
苏住房G 后台企业注册备案的法人证件类型校验必须统一用 document_type 字典「居民身份证」值 '01'，不能写 30250001 这类长码否则校验永不通过。

## 问题根因
- 企业注册备案新增「法人证件」上传等字段时，法人证件类型下拉与「是身份证才做身份证格式校验」的分支需同一枚举值。
- 代码里一度用 30250001，导致身份证格式校验分支恒假、选身份证也不校验（或反之误拦）。
- 项目存在两套证件类型编码口径，document_type 字典「居民身份证」值是 '01'，30250001 是另一套长码，不能混用。

## 解决方案
- 字典值统一以 document_type 为准并写常量，跨页面复用（institution/company/index.vue 是既有正确参考实现）。
- 本次需同改 register/components/companyInfo.vue、company/companyManagement/components/detail.vue、company/companyRegister/detail.vue 三处。
- 改完用同一判定函数收口，避免各页各写一份码值比较。
- 核对方式：直接查 document_type 字典确认 dictValue，而不是看截图或猜。

## 验证与归属
- 验证证据：会话 e747dadd 最终结论确认法人证件号码的身份证格式校验字典值已从 30250001 改为 01（居民身份证），与 document_type 字典及 views/institution/company/index.vue 保持一致。
- 涉及文件：zhi2-web-admin/src/views/register/components/companyInfo.vue、zhi2-web-admin/src/views/company/companyManagement/components/detail.vue、zhi2-web-admin/src/views/company/companyRegister/detail.vue、zhi2-web-admin/src/views/institution/company/index.vue。
- 所属项目：苏住房G；来源会话ID：e747dadd-5d94-41a0-aacd-f7ce9b7e6647；代码基线：b0f2039。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "document_type_01",
  "source_extraction_id": "5e850285f3a947fcac14fa6386b643ab",
  "version": 1,
  "memory_type": "entities"
}
-->