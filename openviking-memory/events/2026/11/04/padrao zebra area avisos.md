# Summary
Revertida alteração incorreta em HomeNoticeList.vue; em UnifiedLogin.vue na área de avisos, .notice-row teve padding inline 15px 33px para preencher fundo, adicionado .notice-row:nth-child(even) com fundo #f5f7fa e hover azul claro rgba(63,102,156,.06). Evidência: portal/022.md.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】pattern
【标题】公示公告区 nth-child 偶数行斑马纹
【内容】回退 `HomeNoticeList.vue` 的错误改动，于 `src/views/home/UnifiedLogin.vue` 公示公告区将 `.notice-row` 间距改为行内 `padding: 15px 33px` 铺满底色，新增 `.notice-row:nth-child(even) { background: #f5f7fa }` 斑马纹与 `rgba(63,102,156,.06)` hover 淡蓝底。
【验证证据】src=门户/022.md
【涉及文件】D:/repository/门户/zhi2-web-admin/src/views/home/components/HomeNoticeList.vue ; D:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue ; D:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/components/PortalTable.vue ; D:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/README.md ; D:/repository/门户/zhi2-web-admin/src/views/home/UnifiedLogin.vue ; D:/repository/门户/zhi2-web-admin/tests/e2e/unified-login-visual.spec.ts ; D:/repository/门户/zhi2-web-admin/src/router/index.js ; D:/repository/门户/zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue
【来源会话ID】0a706ac1-f737-42b7-850d-981236e58eff
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "padrao zebra area avisos",
  "goal": "Aplicar padrão zebra avisos",
  "summary": "Revertida alteração incorreta em HomeNoticeList.vue; em UnifiedLogin.vue na área de avisos, .notice-row teve padding inline 15px 33px para preencher fundo, adicionado .notice-row:nth-child(even) com fundo #f5f7fa e hover azul claro rgba(63,102,156,.06). Evidência: portal/022.md.",
  "ranges": "13-19",
  "source_extraction_id": "6d81a1d895e74cd1bc8d8f74ecec9578",
  "version": 1,
  "memory_type": "events"
}
-->