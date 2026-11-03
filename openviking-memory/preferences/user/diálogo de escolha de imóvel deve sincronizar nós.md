- `chooseHouseDialog.vue` deve sincronizar `projectInfo`/`buildCode` em `loadNode` para evitar que `contract/index.vue` fique sem parâmetros e que `created` não capture rejeição de Promise.
- Corrigir sincronizando informações em todos os níveis de nó, validação no submit, rota com `projectCode`; página de edição com parâmetros ausentes chama `getContractMainInfo` e usa `try/catch` para retorno antecipado.
- `pre/chapter3.vue` etc. devem tratar dicionário vazio.
- Arquivos: contract/index.vue, store/modules/contract.js, contract/chapters/pre/chapter3.vue, commercialHousingSales/presale/contractMainInfo/components/chooseHouseDialog.vue, contractMainInfo/index.vue, contract/mixins/indexFrame.js, contract/mixins/mixin.js, mixins/detailMixins.js
- Evidência: src=苏州市房地产监测V3-rest/065.md; sessão a735a6fd-dc76-4817-a33c-8400bcf1b742

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Diálogo de escolha de imóvel deve sincronizar nós",
  "source_extraction_id": "02eb0702b37d4c818a0d3ecbb60fdac6",
  "version": 1,
  "memory_type": "preferences"
}
-->