# TodoPanel行高与ESLint单文件检查模式
苏住房G 项目记录 TodoPanel 样式审查结论及 ESLint 单文件检查的正确方式。

## 样式审查
- TodoPanel 行高改动审查结论：通过
- .td__row 固定 45px + flex: 0 0 与 StudyPanel 一致，列表 justify-content: flex-start 合理
- 可选留意双行内容在 45px 里较紧，需要时可加 overflow: hidden

## ESLint检查
- npm run lint 会扫整个 src/**/*.{vue,js}，末尾传 TodoPanel.vue 不会只查该文件
- 全仓约 2987 个既有问题（与本次样式改动无关），不能据此判断 TodoPanel.vue 有新 lint 问题
- 单文件检查需用能限定路径的 eslint 调用方式（直接对单文件跑 eslint）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G
- 涉及文件：src/views/home/v2/components/TodoPanel.vue、src/views/home/v2/components/StudyPanel.vue
- 来源会话：70c82beb-0a71-4fff-89f1-e17db817845a

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "todo_panel_lint_pattern",
  "source_extraction_id": "ace134c14d6e4dd4b9c2a649ed580e48",
  "version": 1,
  "memory_type": "entities"
}
-->