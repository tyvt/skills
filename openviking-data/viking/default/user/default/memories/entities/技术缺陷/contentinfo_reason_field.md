
# 销户详情contentInfo缺失变更/销户原因字段
维保销户模块 accountCancel/detail.vue 查看模式下 contentInfo 比同页 zs-form 少「变更/销户原因」列（reason，对应 zs-textarea）。

## 问题根因
- contentInfo 末尾缺少 reason 项，与表单项不一致

## 解决方案
- 在 contentInfo 末尾补上 reason 项，与表单项一致
- 标签：businessType == '1' 时为「变更原因」，否则为「销户原因」（与表单项 :label 一致）
- 取值：this.form.reason
- 布局：与表单最后一项相同，占满一行（md/lg/xl: 24）
- 展示：使用 DetailTemplate 的 textarea 类型，适合多行说明
- 与本次修改无关的 TS 提示（如 changeApplyTable.getList）为原有问题，未改动

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/views/maintenance/accountCancel/detail.vue
- 所属项目：园区物管2.0（项目2-0）
- 来源会话：491cb20a-e8f3-44cb-9648-5a18d4740d5d


<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "contentinfo_reason_field",
  "source_extraction_id": "a549c01781a14f8d92d24a4948405f59",
  "version": 1,
  "memory_type": "entities"
}
-->