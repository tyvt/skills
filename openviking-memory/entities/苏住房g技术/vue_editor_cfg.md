# Vue调试工具跳Cursor失败因编辑器中间件误配
`env/.env` 中编辑器相关变量误配导致 Vue DevTools 无法跳转 Cursor 的配置问题。

## 问题根因
- `env/.env` 中 `VITE_LAUNCH_EDITOR = 'false'` 禁用 Vite `launch-editor` 中间件（`/__open-in-editor`）
- `VITE_EDITOR = 'trae'` 指定了错误编辑器
- 两者叠加导致 Vue DevTools 无法跳转 Cursor

## 修复方案
- `vite.config.js` 仅在环境变量非 false 时启用中间件并默认 `cursor`
- 修正 `env/.env` 配置恢复跳转（开启中间件、改正确编辑器）

## 验证与归属
- 验证证据：src=苏住房G/092.md
- 涉及文件：env/.env、vite.config.js、.vscode/settings.json、package.json
- 所属项目：苏住房G；来源会话ID：31b1bd1f-868a-41df-9b2d-8d9b9ada1333；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "vue_editor_cfg",
  "source_extraction_id": "482c499e25834a43ae52011f7d73c444",
  "version": 1,
  "memory_type": "entities"
}
-->