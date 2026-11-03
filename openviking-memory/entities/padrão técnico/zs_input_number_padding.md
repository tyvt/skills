# zs-input-number sem botões mantém padding e trunca texto
A regra de estilo de `zs-input-number.vue` ainda se aplica com `:controls=false` (classe `is-without-controls`), ocupando 112px de padding e cortando o texto.

## Causa raiz
- Estilo da classe `is-without-controls` ainda recebe padding de 112px reservado aos botões.
- Texto é truncado por falta de espaço.

## Solução aplicada
- Adicionar `:not(.is-without-controls)` ao seletor para voltar ao padding padrão de 15px.
- Em `VotingItemsDialog.vue`, aumentar grelha `md/lg/xl` de 6 para 8 para alargar.

## Ficheiros envolvidos
- `src/components/zs-input-number/zs-input-number.vue`
- `src/views/autonomy/multiply/components/VotingItemsDialog.vue`
- `src/views/autonomy/multiply/components/VotingItemsTable.vue`
- `src/components/zs-form/zs-form.vue`
- `package.json` do projeto

## Verificação e origem
- Projeto: 惠山二期G
- Evidência: `src=惠山二期G/011.md`
- Sessão de origem: `2381e8b3-483f-4cd3-afac-2e88786cc72a`
- Linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "zs_input_number_padding",
  "source_extraction_id": "fdaa115ec96f49938b5955e11ae03585",
  "version": 1,
  "memory_type": "entities"
}
-->