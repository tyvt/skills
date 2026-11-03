# Summary
O `getDetail()` sobrescrevia todo o `form` e `syncOpensalesTypeFromRoute()` só funcionava no modo add, causando perda de `opensalesType` nos modos view/edit e ocultação de campos e abas. Foi adicionado computed `opensalesType` fundindo `form` e `resolveOpensalesType($route)`, estendida a função de sincronização e completado após `getDetail()`, unificando o controle de exibição. Arquivos: supervision/agreement/account/detail.vue, mixins/detailMixins.js, supervision/agreement/jgxm/detail.vue, account/index.vue, utils/ruoyi.js, store/modules/permission.js, 路由信息.json, src/main.js. Evidência: src=苏州市房地产监测V3-rest/065.md; sessão 5c1b8a24-76c6-4187-b758-d05c9e6ba67e.
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】接口覆盖form致opensalesType识别失败
【内容】`getDetail()` 整表覆盖 `form` 且 `syncOpensalesTypeFromRoute()` 仅 add 模式生效，致 view/edit 模式 `opensalesType` 丢失、字段与 Tab 隐藏。新增 computed `opensalesType` 融合 `form` 与 `resolveOpensalesType($route)`，扩展同步函数并在 `getDetail()` 后补全，统一控制展示。
【验证证据】src=苏州市房地产监测V3-rest/065.md
【涉及文件】d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/account/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/mixins/detailMixins.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/jgxm/detail.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/supervision/agreement/account/index.vue ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/ruoyi.js ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/store/modules/permission.js ; d:/repository/苏州市房地产监测V3/路由信息.json ; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/main.js
【来源会话ID】5c1b8a24-76c6-4187-b758-d05c9e6ba67e
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de reconhecimento de opensalesType",
  "goal": "Corrigir perda de opensalesType",
  "summary": "O `getDetail()` sobrescrevia todo o `form` e `syncOpensalesTypeFromRoute()` só funcionava no modo add, causando perda de `opensalesType` nos modos view/edit e ocultação de campos e abas. Foi adicionado computed `opensalesType` fundindo `form` e `resolveOpensalesType($route)`, estendida a função de sincronização e completado após `getDetail()`, unificando o controle de exibição. Arquivos: supervision/agreement/account/detail.vue, mixins/detailMixins.js, supervision/agreement/jgxm/detail.vue, account/index.vue, utils/ruoyi.js, store/modules/permission.js, 路由信息.json, src/main.js. Evidência: src=苏州市房地产监测V3-rest/065.md; sessão 5c1b8a24-76c6-4187-b758-d05c9e6ba67e.",
  "ranges": "16-22",
  "source_extraction_id": "02eb0702b37d4c818a0d3ecbb60fdac6",
  "version": 1,
  "memory_type": "events"
}
-->