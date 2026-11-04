# Correção de escala Y do painel de reparos
No projeto Suzhou Housing G, o gráfico de tendência de reparos tinha marcação Y desigual no final e grande margem esquerda; foi corrigido.

## Causa e solução
- Em RepairPanel.vue, grid.left mudou de 44 para 8 mantendo containLabel.
- Nova função buildTrendYScale calcula interval pelo pico e max=ceil(maxVal/interval)*interval com min:0.
- Isso elimina o espaçamento desigual no fim do eixo Y.

## Arquivos envolvidos
- src/views/home/v2/components/RepairPanel.vue
- src/views/home/v2/components/EChartsBox.vue
- src/views/home/v2/components/PublicBenefit.vue
- package.json, tests/e2e/home-v2.spec.mjs, tests/e2e/home-v2-mocks.js

## Verificação
- 验证证据: 苏住房G/088.md (documento interno).
- Sessão de origem: 0f8fb539-1a29-4d91-bc69-d033c6762e16.
- Linha de base de código: none.

<!-- MEMORY_FIELDS
{
  "category": "Correção de bug",
  "name": "repair_panel_yaxis",
  "source_extraction_id": "d932d4a67f654d5dbfff00e631306d33",
  "version": 1,
  "memory_type": "entities"
}
-->