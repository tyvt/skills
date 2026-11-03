# El Row Sobrescreve Gap Variável
O contêiner de detalhes `.detail-from-container.el-row` com `gap: 0` tinha especificidade maior que `.detail-from-container { gap: var(--detail-block-gap) }`, anulando o espaçamento entre blocos Headline.

## Descrição
- Projeto: Suzhou Real Estate Monitoring V3 (苏州市房地产监测V3), frontend zhi2-web-admin.
- Regra original `.detail-from-container.el-row { gap: 0 }` sobrepunha a variável de espaçamento dos blocos.

## Problema
- A especificidade maior da regra com `.el-row` invalidava `gap: var(--detail-block-gap)` em Headline.
- Busca global mostrou apenas este local afetado.

## Solução
- Ajuste de prioridade (especificidade) para que o espaçamento venha do flex gap do contêiner ou de `row-gap` em `.detail-from-container > .el-form`.
- Após ajuste, o espaçamento entre blocos é fornecido corretamente.

## Verificação
- Evidência: src=苏州市房地产监测V3/060.md
- Arquivos: Headline/index.vue; styles/detail-form.scss; styles/index.scss; companyManagement/components/AgencyBasicInfoForm.vue; AgencyBasicInfoDetail.vue; vite.config.js; e2e/fixtures/company-menu-config.js; e2e/company/institution-register-real-api-flow.spec.js
- Sessão: 5180d428-0584-4329-9241-d8565c0dbc3e; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "el_row_gap_override",
  "source_extraction_id": "4874608f104944719aa2f486c341f696",
  "version": 2,
  "memory_type": "entities"
}
-->