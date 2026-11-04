- `SzPartyBlock.vue` usa `zs-tabs` com `type=card` para dividir blocos de comprador antes empilhados verticalmente em 4 abas: informações do comprador, agente delegado, representante legal (um/dois).
- Estrutura de campos e `createParty()` inalteradas; `chapter1.vue` e `SzContent.getFormData()` não são afetados.
- 涉及文件: `vendeeAgentDialog/index.vue`, `vendeeTab.vue`, `SzPartyBlock.vue`, `chapter1.vue`, `data.js`, `szForm.js`, `contract/index.vue`, `sz-contract.scss`.
- 验证证据: src=苏州市房地产监测V3-rest/114.md; sessão: 2f76d8fe-a175-42fa-9dfc-fd796c3d3844; 所属项目: 苏州市房地产监测V3.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Formato de abas de informações do comprador",
  "source_extraction_id": "c214f8dac06a4cb6a5b1a6943e986c4d",
  "version": 1,
  "memory_type": "preferences"
}
-->