# 模板 :border="border" 需要在 data 中定义 border
在园区物管2.0项目中，在 el-table 中使用 :border="border" 但 data() 中未定义 border 会触发 Vue 运行时警告。

## 症状
- 警告：属性或方法 "border" 未定义
- ScopeSelectDialog 遗漏了定义并触发了警告，在复制表格片段时很常见

## 解决方案
- 约定在 OpenDetailTable、OwnerAddDialog 的 data 中添加 border: true
- 不要将静态 border 和 :border 一起书写；如果缺失，添加 border: true 并移除静态写法

## 验证
- 会话 024ea5fe：ScopeSelectDialog.vue 第 18 行 :border="border" 没有 data.border，已添加 border: true 并移除静态写法
- 文件：zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- 所属项目: 园区物管2.0; baseline: 177bc3ce4; 会话: 024ea5fe-fd81-439f-8f02-a139f7fd07d3

(再次强调：全部译为简体中文)

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_border_data",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->