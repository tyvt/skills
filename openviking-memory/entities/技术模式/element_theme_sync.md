# Element Plus 换肤变量同步
`changeThemeColor` 仅设置自定义变量未同步 Element Plus 内置变量致换肤失效，须同步内置变量。
## 问题根因
- `changeThemeColor` 仅在 `:root` 设置自定义变量，未同步 Element Plus 内置变量（如 `--el-color-primary`）导致组件颜色不更新。
## 解决方案
- 在 `src/utils/index.js` 中增加 Element Plus 主题变量同步设置，确保内置变量随自定义变量更新。
## 验证与归属
- 验证证据：src=2-0/014.md
- 涉及文件：src/utils/index.js
- 所属项目：2-0；来源会话ID：0b556b10-58ea-46e4-ba45-77143b7f3de9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "element_theme_sync",
  "source_extraction_id": "6d18fa7d688944059b189e2db9628a41",
  "version": 1,
  "memory_type": "entities"
}
-->