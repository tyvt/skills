# Summary
Em 2026-11-03, os arquivos `permitExtend/detail.vue` e `permitCancel/detail.vue` tiveram o campo de seleção de permissão alterado de `el-input` + `@click.native` para `zs-input` com `@focus="openPermitSelect"`. Diálogos `PermitSelectDialog.vue` correspondentes foram atualizados; módulo presale sem `<el-input>` e ESLint aprovado.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】fact
【标题】预售选证字段弃用el-input改zs-input
【内容】`permitExtend/detail.vue` 与 `permitCancel/detail.vue` 选证字段由 `el-input` + `@click.native` 改为 `zs-input` 配合 `@focus="openPermitSelect"`。`permitExtend/components/PermitSelectDialog.vue` 与 `permitCancel/components/PermitSelectDialog.vue` 同步处理，presale 模块已无 `<el-input>` 且 ESLint 通过。
【验证证据】src=苏州市房地产监测V3-rest/013.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitExtend/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permit/components/PermitInfoPanel.vue ; d:/repository/苏州市房地产监测V3/前端技术信息.md ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitCancel/detail.vue ; d:/repository/苏州市房地产监测V3/.workbuddy/memory/MEMORY.md ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/fixtures/presale-extend-helpers.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/presale/permitExtend/components/PermitSelectDialog.vue ; C:/Users/Administrator/.cursor/skills/inherit-legacy-style/SKILL.md
【来源会话ID】d6b4b8eb-01cf-400b-bf07-683831f325f0
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Migração de el-input para zs-input",
  "goal": "Atualizar seletor de permissão",
  "summary": "Em 2026-11-03, os arquivos `permitExtend/detail.vue` e `permitCancel/detail.vue` tiveram o campo de seleção de permissão alterado de `el-input` + `@click.native` para `zs-input` com `@focus=\"openPermitSelect\"`. Diálogos `PermitSelectDialog.vue` correspondentes foram atualizados; módulo presale sem `<el-input>` e ESLint aprovado.",
  "ranges": "8-15",
  "source_extraction_id": "714112251c1e4d518ef39926220c4c7e",
  "version": 1,
  "memory_type": "events"
}
-->