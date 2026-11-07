# B 端项目上下文清除入口唯一化与「刷新即清空」行为
苏住房G 后台将 B 端项目上下文（projectId/complexId）的清除入口唯一化到 clearBTerminalProjectContext()，关闭开关后不弹框、不自动选小区、刷新即清空。

## 问题根因
- B 端登录后是否强制选小区由开关 ENABLE_B_TERMINAL_PROJECT_DIALOG_ON_LOGIN 决定，开关应集中放在 projectContext.js 而非散在页面。
- 项目上下文有三个写入源：顶部导航栏手动选小区、localStorage 缓存的上次选择、store 里 GetInfo 登录后恢复。
- 只关掉登录弹窗，GetInfo 仍会从 localStorage 把上次的小区恢复回来，layout/index.vue 还会在「无缓存」时默认选第一个小区，结果「弹窗关了但请求里照样带 projectId」。

## 解决方案
- 开关关闭时 user.js 的 GetInfo 不再恢复 localStorage。
- layout/index.vue 把「无缓存时默认选第一个」整段替换为 clearBTerminalProjectContext()，一次性清掉 store 与 localStorage 的 currentProjectId。
- B 端效果：不弹选择框、不自动选中任何小区、列表与接口请求的 complexId/projectId 为空。

## 长期有效坑点
- 用户仍可从顶部导航手动选择，但只在当前会话内生效，刷新页面会再次被清空。
- 任何新增的 B 端页面若依赖「刷新后仍保有上次所选项目」，会拿到空上下文，必须自己实现无项目态（禁用/提示先选项目），不能假设上下文已持久化。

## 验证与归属
- 验证证据：会话 6ec74cc2 最终结论，开关集中到 projectContext.js；user.js（GetInfo）在 B 端且开关关闭时不再从 localStorage 恢复；layout/index.vue 改为 clearBTerminalProjectContext() 清空 store 与 localStorage 的 currentProjectId；明确「选择后当前会话内生效，但刷新页面后会再次清空」。
- 涉及文件：zhi2-web-admin/src/layout/index.vue、zhi2-web-admin/src/store、zhi2-web-admin/src/permission.js、zhi2-web-admin/src/router/index.js。
- 所属项目：苏住房G；来源会话ID：6ec74cc2-fc78-4189-8ef8-6e1b52785377；代码基线：cf49efc。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_project_context",
  "source_extraction_id": "5e850285f3a947fcac14fa6386b643ab",
  "version": 1,
  "memory_type": "entities"
}
-->