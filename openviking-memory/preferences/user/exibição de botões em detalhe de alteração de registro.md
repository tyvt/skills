- Nas páginas de detalhe `toB/companyRecord/detail.vue` e `toB/agencyRecord/detail.vue` devem ativar `:show-back="true"`, `:show-edit="showChangeEditBtn"` (depende de `view` + `changeBizState==='0'` + não em revisão) e `:show-approval` para visualização do fluxo.
- Implementar `@update="getDetail"` e manter `changeBizState` em `detailCallback`/`loadChangeDetailFromOwnCompany` para controlar `:biz-state` e exibição.
- Arquivos envolvidos: zhi2-web-admin/src/views/toB/companyRecord/detail.vue, companyRecordAgency/change/detail.vue, toB/agencyRecord/detail.vue, toB/personnelRecord/components/detail.vue, src/main.js, src/mixins/detailMixins.js, package.json, e2e/company/company-record-change.spec.js
- Evidência: src=苏州市房地产监测V3-rest/063.md; sessão 651e58d0-833a-407d-b950-d0210aaf6ccc

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Exibição de botões em detalhe de alteração de registro",
  "source_extraction_id": "02eb0702b37d4c818a0d3ecbb60fdac6",
  "version": 1,
  "memory_type": "preferences"
}
-->