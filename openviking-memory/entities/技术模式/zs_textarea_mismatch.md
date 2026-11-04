# zs-textarea 的 richtext 类型不正确
即使文件中的 zs-textarea 且 label 为 '备注' 被配置为 type 'richtext'，也应使用 textarea，同时为真正的 richtext 保留 zs-editor。

## Problema
- zs-textarea 且 label 为 '备注' 被错误地赋予了 type 'richtext'
- 不正确的匹配影响了 Vue 表单组件

## 解决方案
- 当 zs-textarea 具有 label '备注' 且 type 'richtext' 时，将 type 改为 'textarea'
- 为真正的 richtext 保留 zs-editor
- 批量修正 75 个文件清除了匹配错误

## 验证与归属
- 文件 maintenance/accountQuery/detail.vue 因不包含 zs-textarea 而不属于该类
- 验证证据: src=bugfix/001.md
- 会话: c26b5af2-98bb-45f3-8246-0a1d95b9d310
- 所属项目: zhi2-web-admin; baseline none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_textarea_mismatch",
  "source_extraction_id": "abc711535aaf4dbeace7d2af079c5c75",
  "version": 1,
  "memory_type": "entities"
}
-->