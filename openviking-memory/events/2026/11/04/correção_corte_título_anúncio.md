# Summary
O título de anúncios na home era cortado por quebra de linha e carrossel. Em UnifiedLogin.vue removeu-se el-carousel por troca de um único item ativo em timer, formatNoticeDate padronizou YYYY-MM-DD, .news-item fixou height:29px e a data em white-space:nowrap. Causa: mock com data 2022-06-06 12:41:10 quebrava em coluna 120px gerando altura 58px acima da área 29px, e múltiplos el-carousel sobrepostos embaçavam. Fonte: sessão cursor 36c8f156-f9a2-4ed8-b85c-200e96ace5cc.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】fact
【标题】首页公告标题裁切因换行与轮播 改单条修复
【内容】接口mock日期2022-06-06 12:41:10于120px列折行致行高58px超出29px展示区，且el-carousel多条叠放糊化。UnifiedLogin.vue去el-carousel改定时轮换单条activeNewsItem，formatNoticeDate统一YYYY-MM-DD，.news-item固定height:29px且日期white-space:nowrap。
【验证证据】extracted source=cursor session=36c8f156-f9a2-4ed8-b85c-200e96ace5cc
【涉及文件】d:/repository/门户/zhi2-web-admin/src/views/home/UnifiedLogin.vue ; d:/repository/门户/zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.md ; d:/repository/门户/zhi2-web-admin/package.json ; d:/repository/门户/zhi2-web-admin/tests/e2e/unified-login-visual.spec.ts ; d:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/mock/notices.js ; UnifiedLogin.vue
【来源会话ID】36c8f156-f9a2-4ed8-b85c-200e96ace5cc

<!-- MEMORY_FIELDS
{
  "event_name": "correção_corte_título_anúncio",
  "goal": "Corrigir corte título anúncio",
  "summary": "O título de anúncios na home era cortado por quebra de linha e carrossel. Em UnifiedLogin.vue removeu-se el-carousel por troca de um único item ativo em timer, formatNoticeDate padronizou YYYY-MM-DD, .news-item fixou height:29px e a data em white-space:nowrap. Causa: mock com data 2022-06-06 12:41:10 quebrava em coluna 120px gerando altura 58px acima da área 29px, e múltiplos el-carousel sobrepostos embaçavam. Fonte: sessão cursor 36c8f156-f9a2-4ed8-b85c-200e96ace5cc.",
  "ranges": "3-7",
  "source_extraction_id": "ad9fab4e29e04bf990aabad89cc7012f",
  "version": 1,
  "memory_type": "events"
}
-->