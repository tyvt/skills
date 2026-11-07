# 注册流程统一接入真实字典接口
注册流程各步骤统一改为调用真实字典接口 getDicts()，去除前端硬编码字典。

## 变更内容
- Step2LegalPerson.vue：legal_person_id_type 改为 document_type
- ShareholderDialog.vue：legal_person_id_type 改为 document_type
- Step1CompanyInfo.vue：company_qualification_grade 改为 company_qualification_level
- e2e/fixtures/register-helpers.js：测试辅助同步改为 document_type
- e2e/fixtures/register-mocks.js：Mock 字典同步更新

## 接口与数据
- 所有组件通过 getDicts() 调真实接口，无前端硬编码
- company_type 用于 Step1 企业类型，已有数据
- company_qualification_level 为变更后字段

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0
- 来源会话：008732db-2f2d-46d5-8491-ec57ab3fe2ea
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_real_dict",
  "source_extraction_id": "34b4c24c5f494281ba1ca2287f22b231",
  "version": 1,
  "memory_type": "entities"
}
-->