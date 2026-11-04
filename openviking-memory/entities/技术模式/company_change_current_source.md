# Fonte principal do valor atual na página de alteração é o detalhe de alteração
No projeto 苏州市房地产监测V3, os dados mestres das informações básicas da empresa no "valor atual" da página de alteração vêm da interface de detalhe de alteração.

## 关键事实
- O "valor atual" das informações básicas da empresa vem de `POST /company/companyRecordChange/detail` em `data.companyRecordChange`
- `toB/companyRecord/detail.vue` grava o detalhe da alteração no formulário via `getDetail()`
- `companyRecord/detail` serve apenas para comparação pré-alteração ou fallback de qualificação

## 验证与归属
- 验证证据: src=cursor session=3f9ce4c0-b3bb-452e-a7ac-6701f6c35e2e
- 涉及文件: toB/companyRecord/detail.vue, api/company/companyRecord.js, company/companyManagement/components/DeveloperBasicInfoDetail.vue, DeveloperBasicInfoForm.vue, utils/registerQualification.js
- 所属项目: 苏州市房地产监测V3; sessão: 3f9ce4c0-b3bb-452e-a7ac-6701f6c35e2e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_current_source",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->