- Página detail.vue de ordem de serviço adota layout de três seções: barra superior, área principal e barra inferior
- A barra de operações inferior exibe botões dinamicamente conforme campos de permissão retornados pelo backend
- O progresso da tarefa é exibido por uma timeline via WorkOrderProgress.vue
- As operações de ordem são unificadas pelo componente WorkOrderActionDialog.vue, que chama APIs como /property/workOrder/order/{id}/accept
- Verificado em sessão cursor: 3bfc9952-dccf-4c5b-a3f2-5a1ce6230d2c

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de página de detalhe de ordem de serviço",
  "source_extraction_id": "738f08956f814c1794657ebf13c3e648",
  "version": 1,
  "memory_type": "preferences"
}
-->