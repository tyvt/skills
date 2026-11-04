- Em `specialcontract/detail.vue` remover o `Headline` pai que aninha `contractTable` para evitar títulos e botões duplicados.
- Mover `title-text` e `v-if` para dentro de `<contractTable>` e alterar título padrão para '合同信息' no `specialcontract/components/contractTable.vue`.
- O componente de sub-tabela deve ser o único responsável pelo `Headline`, seguindo convenção de `businessItemTable`/`assetTable`.
- 涉及文件: e2e/fixtures/menu-config.js, 路由信息.json, commercialHousingSales/presale/specialcontract/detail.vue, components/contractTable.vue, src/styles/index.scss, index.vue, e2e/tmp-specialcontract-layout.spec.js, index.html
- 验证证据: src=苏州市房地产监测V3-rest/064.md; sessão ed41ad4f-538d-41dd-8437-aa4dccefa372

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Componente de sub-tabela deve possuir Headline próprio",
  "source_extraction_id": "02eb0702b37d4c818a0d3ecbb60fdac6",
  "version": 1,
  "memory_type": "preferences"
}
-->