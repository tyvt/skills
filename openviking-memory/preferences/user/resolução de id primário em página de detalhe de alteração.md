- Páginas de detalhe de alteração devem obter ID primário de múltiplas fontes de rota, não apenas `$route.query.id`.
- Adicionar propriedade computada que resolva ID de `$route.query.id`, `$route.params.tableid`, `getId()` e `form` para uso em `getDetail`.
- `detailCallback` deve preencher ID de rota para evitar chave primária vazia.
- Verificado em companyRecord/detail.vue, companyRecord.js, companyBasicInfoContent.js, CompanyBasicInfoDetail.vue, detailMixins.js, change/detail.vue, form.js, toB/change/detail.vue.
- Sessão fonte: 24a5c5a8-dd40-426d-9696-d87bebf426bd

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Resolução de ID primário em página de detalhe de alteração",
  "source_extraction_id": "2caf19ed878349fabc9e287d547e1439",
  "version": 1,
  "memory_type": "preferences"
}
-->