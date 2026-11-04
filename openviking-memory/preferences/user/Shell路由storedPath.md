- 将 shell 路由（Layout, ParentView）视为空路径，以便在待办跳转中使用 storedPath。
- 在 ruoyi.js 中定义 SHELL_MENU_COMPONENTS，且 getRouteFilePath 对 shell 组件返回 ''，以确保 storedPath 的优先级。
- 涉及文件: utils/ruoyi.js, flowable/todo.vue, home/index-v2.vue, home/v2/components/TodoPanel.vue, store/modules/permission.js, router/index.js, utils/index.js, tests/e2e/home-v2.spec.mjs.
- 所属项目: 苏住房G; 验证证据: src=苏住房G/055.md; 会话: f1c7af59-850a-422f-aaa3-9169cf16f750.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Roteamento de shell para storedPath",
  "source_extraction_id": "365bab52c52f4179bd3a6d0ab0e8c6cc",
  "version": 1,
  "memory_type": "preferences"
}
-->