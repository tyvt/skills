
# Correção de bizStateTone para incluir '已备案'
No projeto 苏州市房地产监测V3, `bizStateTone` não reconhecia o valor de dicionário '已备案' como válido, deixando-o cinza.

## Problema
- `bizStateTone` originalmente julgava apenas '有效/正常' como verde, fazendo '已备案' cair no branch cinza.

## Solução
- `InfoCardDialog.vue` agora usa regex `/注销|失效|冻结|异常|未备案|未通过|驳回|作废|过期/` para invalid, depois `/备案|有效|正常|通过/` para valid, desconhecido retorna unknown.
- Ponto (dot) usa `currentColor` para sincronizar cor.

## Verificação e Arquivos
- Evidência: src=苏州市房地产监测V3-rest/019.md; sessão b3409b66-bfb0-4aec-941e-ffd48580fe9c.
- Arquivos: D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/agencyPersonnel/components/InfoCardDialog.vue, WorkCardDialog.vue, src/utils/personnelStatus.js, AgencyPersonnelList.vue, e2e/institution/agency-personnel-real-api-flow.spec.js, C:/Users/Administrator/Downloads/_card_preview/preview.html, scripts/_shot_cards.mjs, .tmp-card-check/entry.js.


<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "biz_state_tone_fix",
  "source_extraction_id": "261683e4b6f6441e994fe34ffbde724a",
  "version": 1,
  "memory_type": "entities"
}
-->