# 可手输选择组件三态回填
园区物管2.0 中 zs-like-select 等 allow-custom 选择组件回填表单需分三态处理，缺 companyId 不等于空值。

## 问题根因
- 组件手输只更新自身 v-model（如 { companyName } 无 companyId），原 watch 在缺 companyId 时清空 form 字段，导致手输名称进不了表单。
- el-form-item 校验的是 form 上的字段，导致 required 校验误报且下拉列表仅显示默认值。

## 解决方案
- watch 选中对象分三态：①空对象清空 form 名称与 ID；②有 companyId 照常写名称与 id；③仅有 companyName 写 form.companyName 且 companyId 置 undefined。
- 后端用「有无 companyId」区分系统内单位与手输名称。
- 通用结论：选中对象回填表单的监听不能把缺 ID 当无效选择清空，须为手输态保留名称。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/components/zs-select/zs-like-select.vue、zhi2-web-admin/src/views/maintenance/depositNotice/company/components/AddDialog.vue。
- 所属项目：园区物管2.0；来源会话：3212c3b1-6f35-4233-95e1-8433cc34e122；代码基线：7814a0c2a。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allow_custom_three_state",
  "source_extraction_id": "6748b718b2a9471ca4346d124cc1977d",
  "version": 1,
  "memory_type": "entities"
}
-->