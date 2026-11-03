# Loop de morte de largura de coluna zs-table por auto-feedback
No projeto 园区物管2.0, o motor de distribuição de largura de coluna customizado do zs-table causa loop de sincronização com el-table ao ler resultado renderizado e reescrever layout.

## Contexto do problema
- Em páginas como pubElevMaintenanceNew dispara loop de sincronização: tabela congela, colunas não expandem; fixar width contorna mas trava não some
- Causa: distributeColumnWidths usa realWidth pós-render para calcular espaço restante e redistribuir colunas flex; entrada depende da saída, lastDistributeKey não estabiliza, somado a ResizeObserver/watch/:key cria loop

## Solução
- Refatorar para «medir só conteúdo, deixar fit nativo do el-table»: zs-table-column usa computed puro + canvas para medir contentWidth por texto, só como min-width, nunca reler layout
- Remover motor de distribuição (~90 linhas) em zs-table, manter só flexColumnCount; zs-operate-column vira computed puro, sem watch/mounted
- Contrato: width explícito fixo, min-width explícito max(explícito,conteúdo), sem width usa conteúdo como min-width via flex nativo, colunas fixas fit:false não estica última

## Lições
- Qualquer algoritmo de largura «ler render e reescrever layout» forma loop com el-table; usar canvas medir texto + min-width delegado

## Informações relacionadas
- Arquivos: zs-table.vue, zs-table-column.vue, zs-operate-column.vue, pubElevMaintenanceNew/index.vue, listMixins.js
- Projeto: 园区物管2.0 (zhi2-web-admin, mesma lib zs-* de 苏房V3); sessão 6ca7facb (2026-06-11, baseline ccc1e54ea)

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "zs_table_width_loop",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->