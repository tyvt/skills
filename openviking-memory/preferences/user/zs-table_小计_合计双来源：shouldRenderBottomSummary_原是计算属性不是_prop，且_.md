# zs-table 小计/合计双来源：shouldRenderBottomSummary 原是计算属性不是 prop，且 ZsSummaryText 写死「合计：」

什么情况：父页面传 :shouldRenderBottomSummary="false" 想只保留表格内小计行、去掉底部合计条，但合计依然显示。为什么：两层根因——① zs-table 里 shouldRenderBottomSummary 原先只是计算属性（有 resolvedBottomSummaryItems 就为 true），父组件传的同名值落入 $attrs 被 v-bind 透传给 el-table，zs-table 自身根本不消费，等于静默无效；② 表格下方自动挂的 ZsSummaryText 组件标题写死「合计：」，与「只要小计」冲突。怎么做：给 zs-table 正式声明 shouldRenderBottomSummary prop（默认 true 保持旧行为），用 effectiveBottomSummaryVisible = shouldRenderBottomSummary && hasBottomSummaryContent 控制 ZsSummaryText 渲染，并把原同名计算属性改名为 hasBottomSummaryContent 避免与 prop 撞名。教训：给封装表格加开关时必须确认它是真 prop 而非同名计算属性，否则 $attrs 透传会造成「传了不生效」的假 bug。

**验证证据**：会话 442d7a82：配置 :shouldRenderBottomSummary="false" 仍显示合计；修复落在 zs-table.vue（新增 prop + effectiveBottomSummaryVisible + 计算属性改名）与 ZsSummaryText/index.vue（写死「合计：」标题）。

**涉及文件**：zhi2-web-admin/src/components/zs-table/zs-table.vue、zhi2-web-admin/src/components/ZsSummaryText/index.vue、zhi2-web-admin/src/views/benefit/pubBankAccountBalance/index.vue

**所属项目**：园区物管2.0
**来源会话**：442d7a82-5af6-497e-bb37-b6b32de6979b
**代码基线**：b2b559778
<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Exibição de total do zs-table",
  "source_extraction_id": "2e723bb38f8049e6a07ff416b0c2139b",
  "version": 1,
  "memory_type": "preferences"
}
-->