
# Campo de linha inteira não isento causa meia largura
No projeto 苏州市房地产监测V3, o componente de layout de informações de pessoal forçava duas colunas sem isenção, causando meia largura em campos de linha inteira.

## 问题根因
- Endereço de residência em modo de edição é `FORM_COL_FULL`
- Estilo de fallback de `PersonnelBasicInfoLayout.vue` forçava `.el-row > .el-col` em duas colunas sem isenção

## 解决方案
- `AgencyPersonnelBasicInfoFormFields.vue` adiciona classe `el-col--full-row` ao `el-col` com `field.wide`
- `PersonnelBasicInfoLayout.vue` adiciona regra de isenção mantendo 100% de largura; componente compartilhado inalterado

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/247.md
- 涉及文件: components/HeadTitle/index.vue, company/companyApplyAudit/index.vue, company/companyApplyAudit/detail.vue, autonomy/regulation/record/detail.vue, mixins/detailMixins.js, company/personnelCertificate/detail.vue, institution/agencyPersonnel/components/AgencyPersonnelDetail.vue, components/detail-template/detail-template.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 699a0458-d744-41d2-99d1-4aedce0e8486; Base de código: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_layout_full_row",
  "source_extraction_id": "3440ed0abfed42a4aa0c1bc2d6540321",
  "version": 1,
  "memory_type": "entities"
}
-->