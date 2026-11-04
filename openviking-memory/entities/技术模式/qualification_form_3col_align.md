# Formulário de qualificação em grade de 3 colunas
No Suzhou Real Estate Monitoring V3, o formulário de certificado de qualificação foi ajustado para grade de 3 colunas conforme o design.

## Alterações
- `personnelCertificate/detail.vue` ajustado para 14 campos em grade de 3 colunas
- Novo campo de sexo vinculado ao dicionário `sys_user_sex`
- Alinhamento célula a célula com a página de lista `index.vue` conforme design

## Arquivos e Atribuição
- 验证证据: src=苏州市房地产监测V3/169.md
- 涉及文件: institution/qualifications/index.vue, institution/qualifications/detail.vue, zljg/components/PersonnelCertificatePlaceholder.vue, company/personnelCertificate/index.vue, company/personnelCertificate/detail.vue, api/company/personnelCertificate.js, utils/registerQualification.js, institution/personnel/components/certificatesDialog.vue
- Sessão: 3faee039-2b79-4d3e-be53-0d46273c923b; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_form_3col_align",
  "source_extraction_id": "77174234a0a04fd3bf6b0d9c3b1c7f88",
  "version": 1,
  "memory_type": "entities"
}
-->