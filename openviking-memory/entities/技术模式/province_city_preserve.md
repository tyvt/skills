# Alteração de instituição deve manter provinceCityArea original
O `companyBasicInfoContent.js` funde valor de exibição de `administrativeArea` preservando `provinceCityArea` original no projeto 苏州市房地产监测V3.

## Problema
- `normalizeCompanyBasicForm` em `companyBasicInfoContent.js` ao fundir `administrativeArea` não preservava `provinceCityArea` original
- `getDetail` em `companyRecordAgency/change/detail.vue` não preenchia dados originais de registro quando faltava mudança

## 解决方案
- `normalizeCompanyBasicForm` preserva `provinceCityArea` original ao fundir valor de exibição `administrativeArea`
- `getDetail` em `companyRecordAgency/change/detail.vue` preenche dados do registro original quando mudança está ausente

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
- 验证证据: src=苏州市房地产监测V3-leftover/036.md
- Sessão: b9e75113-bcab-4880-a9ad-aff2106e5082
- 所属项目: 苏州市房地产监测V3; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "province_city_preserve",
  "source_extraction_id": "f749948ee9fa4da4a491c83192dd1efb",
  "version": 1,
  "memory_type": "entities"
}
-->