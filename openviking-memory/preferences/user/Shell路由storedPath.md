- Tratar rotas shell (Layout, ParentView) como caminho vazio para usar storedPath em saltos de pendências.
- Em ruoyi.js definir SHELL_MENU_COMPONENTS e getRouteFilePath retorna '' para componentes shell, garantindo prioridade de storedPath.
- 涉及文件: utils/ruoyi.js, flowable/todo.vue, home/index-v2.vue, home/v2/components/TodoPanel.vue, store/modules/permission.js, router/index.js, utils/index.js, tests/e2e/home-v2.spec.mjs.
- 所属项目: 苏住房G; 验证证据: src=苏住房G/055.md; sessão: f1c7af59-850a-422f-aaa3-9169cf16f750.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Roteamento de shell para storedPath",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "preferences"
}
-->