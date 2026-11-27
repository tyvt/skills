---
audit_status: valid
last_checked: 2026-11-27T19:16:46+08:00
verdict_note: 产品2.0 中 zs-form(641)、zs-input(628) 大量命中、v-waiting 残留，el→zs 批量替换已落地；脚本名属一次性工具。
---
- 在模块迁移中，使用脚本（例如：scripts/normalize-migrated-modules.mjs）批量将 el-form/el-input 组件替换为 zs-*，并移除 require 和 v-waiting，确保通过 npm run build 构建。
- Cursor 会话 875fc450-bf31-4e92-ac86-dd4c8e25223e 的证据，包含 164 个已规范化的文件。

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：875fc450-bf31-4e92-ac86-dd4c8e25223e

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->