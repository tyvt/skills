# Summary
PublicBenefit.vue e RepairPanel.vue tinham mode inicial 'chart', destacando gráfico em vez dos dados do mês. Alterado para 'month' para exibir estatísticas do mês corrente; watch:{mode} garante redesenho ao trocar manualmente para gráfico; index-v2.vue mantém lógica de carga inalterada. Verificação: src=苏住房G/065.md. (2026-11-03)
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】首页公共收益及报事报修默认当月数据
【内容】PublicBenefit.vue 与 RepairPanel.vue 的 mode 初始值为 'chart'，导致首页进入时默认高亮图表趋势而非当月数据。将两组件 mode 初始值改为 'month' 以默认展示当月统计，watch: { mode } 保障手动切换图表重绘，index-v2.vue 数据加载逻辑不变。
【验证证据】src=苏住房G/065.md...

<!-- MEMORY_FIELDS
{
  "event_name": "Correção modo padrão painéis início",
  "goal": "Exibir mês corrente por padrão",
  "summary": "PublicBenefit.vue e RepairPanel.vue tinham mode inicial 'chart', destacando gráfico em vez dos dados do mês. Alterado para 'month' para exibir estatísticas do mês corrente; watch:{mode} garante redesenho ao trocar manualmente para gráfico; index-v2.vue mantém lógica de carga inalterada. Verificação: src=苏住房G/065.md. (2026-11-03)",
  "ranges": "0-1",
  "source_extraction_id": "9afaba5dc1ac4c14af44db9460e5cd8b",
  "version": 1,
  "memory_type": "events"
}
-->