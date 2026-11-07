# zs-textarea 的 richtext 类型不正确
同文件存在 zs-textarea 且展示配置中 label 为 '备注'、type 为 'richtext' 时，应将 type 改为 'textarea'；真正的富文本场景（如 zs-editor）保持不变。

## 问题现象
- zs-textarea 且 label 为 '备注' 被错误赋予 type 'richtext'
- 同文件错配影响 Vue 表单组件渲染

## 解决方案
- 仅当同文件存在 zs-textarea 且展示配置出现 label: '备注' + type: 'richtext' 时，将类型改为 textarea
- 保留真实富文本场景（如 zs-editor）不改

## 验证与归属
- 验证证据：extracted source=cursor project=bugfix
- 来源会话：c26b5af2-98bb-45f3-8246-0a1d95b9d310
- 本轮自动修正 75 个文件，加上此前手工修正，当前这批类似情况已全部覆盖
- 复查：zs-textarea 与 type: 'richtext' 同文件错配已清空
- label: '备注' + type: 'richtext' 仅剩 maintenance/accountQuery/detail.vue 1 处（该文件未发现 zs-textarea，不属于此类错配）
- src/views 下 lint 检查无新增报错
- 验证证据: src=bugfix/001.md
- 会话: c26b5af2-98bb-45f3-8246-0a1d95b9d310
- 所属项目: bugfix

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_textarea_mismatch",
  "source_extraction_id": "13c17fa23675494eb513637d319d8231",
  "version": 2,
  "memory_type": "entities"
}
-->