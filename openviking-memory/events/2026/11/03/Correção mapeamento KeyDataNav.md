# Summary
loadKeyData usava campos antigos (company etc) incompatíveis com retorno da API (companyNum etc), falha de mapeamento deixava keyData vazio. Criado zhi2-web-admin/src/views/home/v2/keyDataMap.js com normalizeKeyData; index-v2.vue chama primeiro e adiciona keyDataFetchSeq para evitar corrida de requisição na troca de região. Verificação: src=苏住房G/067.md. (2026-11-03)
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】接口字段不符致KeyDataNav映射失败
【内容】`loadKeyData` 原字段（`company`等）与接口返回（`companyNum`等）不匹配，映射失败致 `keyData` 为空。新建 `zhi2-web-admin/src/views/home/v2/keyDataMap.js` 定义 `normalizeKeyData` 转换结构，`index-v2.vue` 优先调用并增 `keyDataFetchSeq` 防区域切换请求竞态。
【验证证据】src=苏住房G/067.md
【涉及文件】d:/repository/苏住房G/zhi2-web-admin/src/views/home/v2/components/KeyDataNav.vue ; d:/repository/苏住房G/zhi2-web-admin/src/api/portal/home.js ; d:/repository/苏住房G/zhi2-web-admin/src/views/home/index-v2.vue ; d:/repository/苏住房G/zhi2-web-admin/tests/e2e/home-v2-mocks.js ; d:/repository/苏住房G/zhi2-web-admin/tests/e2e/home-v2.spec.mjs ; d:/repository/苏住房G/zhi2-web-admin/src/views/home/v2/keyDataMap.js ; zhi2-web-admin/src/views/home/v2/keyDataMap.js ; index-v2.vue
【来源会话ID】9db759c2-bcb5-46f8-be2a-cc451af4fbef
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "Correção mapeamento KeyDataNav",
  "goal": "Normalizar campos API keyData",
  "summary": "loadKeyData usava campos antigos (company etc) incompatíveis com retorno da API (companyNum etc), falha de mapeamento deixava keyData vazio. Criado zhi2-web-admin/src/views/home/v2/keyDataMap.js com normalizeKeyData; index-v2.vue chama primeiro e adiciona keyDataFetchSeq para evitar corrida de requisição na troca de região. Verificação: src=苏住房G/067.md. (2026-11-03)",
  "ranges": "18-23",
  "source_extraction_id": "9afaba5dc1ac4c14af44db9460e5cd8b",
  "version": 1,
  "memory_type": "events"
}
-->