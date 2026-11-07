# accountCancel 详情 contentInfo 对齐 zs-form
查看态 contentInfo 若少表单项，会出现编辑能填、查看看不到，须对照同页 zs-form 补齐字段。

## 问题根因
- accountCancel/detail.vue 查看态 contentInfo 缺失 reason 字段，导致编辑可填但查看不显示。

## 解决方案
- 对照同页 zs-form：reason 标签随 businessType == '1' 显示「变更原因」否则「销户原因」。
- contentInfo 末项补 form.reason，布局 md/lg/xl: 24，类型用 DetailTemplate 的 textarea 占满行。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 491cb20a 用户要求按 zs-form 字段补齐 contentInfo，结论指出缺失 reason 并已按 label 规则补上。
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountCancel/detail.vue
- 所属项目：2-0；来源会话ID：491cb20a-e8f3-44cb-9648-5a18d4740d5d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_cancel_contentinfo",
  "source_extraction_id": "f8f198cd162642018005f9ca8c1daff5",
  "version": 1,
  "memory_type": "entities"
}
-->