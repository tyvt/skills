- O componente textarea (.el-textarea ou .zs-textarea) deve ocupar globalmente uma linha inteira e uma coluna inteira via grid-column: 1 / -1 em detail-form.scss.
- Em áreas de colapso Headline e diálogos, el-col deve ter largura forçada de 100%.
- Em @media (min-width: 768px), redeclarar no final para evitar sobrescrita.
- Em detail-template.vue, getItemSpan retorna valor fixo 24 para type === 'textarea' quando keepSpan não é true.
- Arquivos: detail-form.scss, element-ui.scss, companyBasicInfoShared.js, Step1BasicInfo.vue, detail.vue, index.scss, package.json, detailLayout.js. Evidência: 苏州市房地产监测V3-rest/002.md.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de componente textarea",
  "source_extraction_id": "772b51dcf2dd4e5b954bbf2076058ae6",
  "version": 1,
  "memory_type": "preferences"
}
-->