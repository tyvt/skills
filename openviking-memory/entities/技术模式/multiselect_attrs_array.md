# MultiSelect $attrs.value 数组兼容
搜索表单 zs-select → MultiSelect 的 getter 若直接 split(',')，父级传数组会 TypeError，须先归一化类型。

## 问题根因
- MultiSelect computed getter 写 this.$attrs.value.split(',')，当父级传入数组时报 TypeError: this.$attrs.value.split is not a function。
- 同仓库 group-multi-select.vue 等复制写法需一并改，避免修一处另一页再炸。

## 解决方案
- 先归一化：数组直接用，字符串再 split，空值兜底 []。
- 涉及 MultiSelect.vue、zs-select.vue、group-multi-select.vue、accountOpen/owner/index.vue 等同类型 getter 同步修改。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 96cc05d6 owner/index 搜索表单渲染报错 split is not a function；结论点名 MultiSelect 与 group-multi-select 同类 getter。
- 涉及文件：zhi2-web-admin/src/components/zs-select/MultiSelect.vue、zs-select.vue、zhi2-web-admin/src/views/property/complex/components/group-multi-select.vue、zhi2-web-admin/src/views/maintenance/accountOpen/owner/index.vue
- 所属项目：2-0；来源会话ID：96cc05d6-f240-484b-bd44-cb2ed62f1ebc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multiselect_attrs_array",
  "source_extraction_id": "f8f198cd162642018005f9ca8c1daff5",
  "version": 1,
  "memory_type": "entities"
}
-->