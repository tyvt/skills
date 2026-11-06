# Vue DevTools跳转Cursor编辑器修复
苏住房G 项目定位并修复 Vue DevTools 点击组件无法在 Cursor 中打开编辑器的问题。

## 问题原因
- 项目通过 Vite 的 launch-editor 中间件（/__open-in-editor）让 Vue DevTools 跳转到编辑器
- env/.env 中 VITE_LAUNCH_EDITOR = 'false' 完全禁用该中间件
- env/.env 中 VITE_EDITOR = 'trae' 即使启用也会尝试用 Trae 而非 Cursor 打开

## 修改说明
- vite.config.js 逻辑：仅当 env.VITE_LAUNCH_EDITOR 未设置或为 true 时启用 launch-editor 插件，editor 默认取 env.VITE_EDITOR 或 'cursor'

## 验证与归属
- 所属项目：苏住房G
- 涉及文件：vite.config.js、env/.env、env/.env.test、env/.env.production
- 来源会话：31b1bd1f-868a-41df-9b2d-8d9b9ada1333

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "vite_launch_editor_cursor",
  "source_extraction_id": "ace134c14d6e4dd4b9c2a649ed580e48",
  "version": 1,
  "memory_type": "entities"
}
-->