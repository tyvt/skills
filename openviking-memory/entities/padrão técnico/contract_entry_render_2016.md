# Entrada de contrato renderiza componente 2016 unificado
Unificação da renderização do componente 2016 e abstração de ações comuns em contrato.

## Descrição
- `src/views/contract/index.vue` deixou hardcoded 2016 como pré-venda, agora julga à vista via rota `/cash` e força render 2016.
- Corrigido defeito de `reSign` pulando para `/pre`.
- Novo `components/ContractOperationActions.vue` para botões comuns aos dois ramos.
- `chapter1.vue` de suzhou2016 renomeia campos de tabela de partes por mapeamento da seção 5 e reusa `vendeeAgentDialog`.

## Arquivos
- `contract/index.vue`, `ContractOperationActions.vue`, `chapters/suzhou2016/chapter1.vue`, `szForm.js` etc.

## Verificação
- Fonte: 苏州市房地产监测V3/074.md; sessão 52faca44-46f3-48c0-9ba2-d452448948d2.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "contract_entry_render_2016",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "entities"
}
-->