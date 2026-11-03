# Conflito de nome bizStateOptions dispara aviso do Vue
No projeto Suzhou Real Estate Monitoring V3, bizStateOptions declarado em props e data() causava conflito e aviso do Vue.

## Causa raiz
- bizStateOptions era declarado simultaneamente em props e data(), gerando conflito.

## Solução
- Em InfoCardDialog.vue removeu-se o prop e adicionou-se personnelStatusOptions.
- Em loadCredential chama-se getDicts('personnel_business_status') para carregar dicionário.
- Componentes pais como AgencyPersonnelList.vue deixaram de passar o parâmetro.

## Arquivos e verificação
- Arquivos: InfoCardDialog.vue, AgencyPersonnelList.vue, WorkCardDialog.vue, personnelStatus.js, AgencyPersonnelDetail.vue, zs-table-column.vue, listMixins.js, table.js.
- Evidência: src=苏州市房地产监测V3-rest/059.md; sessão c7e8e793-52a0-4fb3-835f-ca02c35c1248.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "bizstate_options_conflict",
  "source_extraction_id": "ab08f4474f3d4570b5cc83bd74d094a3",
  "version": 1,
  "memory_type": "entities"
}
-->