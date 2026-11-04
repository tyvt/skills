- Em `src/views/company/staffManagement/personnelRecord/detail.vue` e componentes `detail.vue` com `operation-btn-group`, faltava `@save="submitForm"` e o salvamento não enviava requisição; corrigido adicionando `@save` mais `beforeSaveHook`/`getForm` no `OperationBtnGroup`.
- Em testes E2E, o locator `button:visible` era impreciso; o spec deve usar `getByRole('button',{name:/保存/})` e aguardar visível.
- Evidência: cursor sessão=840f26b2-59e0-4f58-a690-fdd616477176; arquivos: e2e/company/personnel-certificate-crud.spec.js, src/components/OperationBtnGroup/index.vue, src/views/company/staffManagement/personnelRecord/detail.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vinculação de salvamento Vue e localização E2E",
  "source_extraction_id": "5ba2dade06d048a48e78322216a00bde",
  "version": 1,
  "memory_type": "preferences"
}
-->