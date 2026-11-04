# Bug de não preenchimento de provinceCityArea em mudança de empresa
No projeto 苏州市房地产监测V3, a alteração de registro de agência não repunha o valor original de `provinceCityArea` ao normalizar o formulário.

## Problema
- `normalizeCompanyBasicForm` em `companyBasicInfoContent.js` não preservava `provinceCityArea` ao mesclar valor de exibição `administrativeArea`
- `getDetail` em `companyRecordAgency/change/detail.vue` não retroativa dados originais quando o campo faltava na ordem de mudança

## 解决方案
- Preservar valor original de `provinceCityArea` e complementar defaults em `createCompanyBasicFormDefaults`
- `getDetail` da mudança repõe de dados de registro original quando campo ausente

## Arquivos
- `zhi2-web-admin/src/views/company/companyRecordAgency/change/detail.vue`
- `zhi2-web-admin/src/views/company/companyManagement/components/companyBasicInfoContent.js`
- `zhi2-web-admin/src/views/company/companyManagement/components/CompanyBasicInfoForm.vue`
- `zhi2-web-admin/src/views/toB/companyRecord/detail.vue`
- `zhi2-web-admin/src/api/company/companyRecord.js`
- `zhi2-web-admin/src/views/company/companyManagement/components/CompanyBasicInfoDetail.vue`
- `zhi2-web-admin/src/views/institutionRegister/components/Step1BasicInfo.vue`
- `zhi2-web-admin/src/views/company/companyCancel/detail.vue`

## Verificação
- 验证证据: src=苏州市房地产监测V3/236.md
- Sessão: b9e75113-bcab-4880-a9ad-aff2106e5082
- 所属项目: 苏州市房地产监测V3; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_provincecityarea_bug",
  "source_extraction_id": "5a368dde30334afa99f7154d2f5147cf",
  "version": 1,
  "memory_type": "entities"
}
-->