- Substituir a coluna de operações da tabela de tarefas pendentes por `zs-operate-column` e alinhar com a página de lista; adicionar propriedade computada `todoOperateButtons` (`permission: false`, `attrs: { type: 'primary', plain: true }`).
- Vincular o clique na linha a `handleTodoRowClick` para evitar duplo acionamento de `handleProcess` entre o botão "processar" e o clique na linha; remover o estilo `.action-btn` não utilizado.
- Arquivos: zhi2-web-admin/src/views/home/index-new.vue, syncLog/index.vue, integrationConfig/index.vue, components/zs-operate-column/zs-operate-column.vue, components/zs-button/zs-button.vue, main.js
- Sessão de origem: 20fa127f-80b8-45d0-9e77-f3b6b55a7902

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Coluna de operação com zs-operate-column",
  "source_extraction_id": "b6999fcd9db6402c903ccb96bee9d95d",
  "version": 1,
  "memory_type": "preferences"
}
-->