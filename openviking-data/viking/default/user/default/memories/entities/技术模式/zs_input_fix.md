# zs-input 前后缀插槽冗余修复
zs-input 组件无论是否传入插槽都固定渲染四个插槽模板，导致 el-input 预留前后缀区域，看起来前后缀自动带上。
## 问题根因
- zs-input 中无论是否传插槽，都固定写了 append / prepend / suffix / prefix 四个插槽模板
- el-input 检测到有这些插槽就会预留对应前后缀或前后置区域
## 解决方案
- 改为仅在对应插槽实际有内容时才渲染：使用 v-if="$slots.append" 等条件渲染各插槽
- 修改文件：zhi2-web-admin/src/components/zs-input/zs-input.vue
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/components/zs-input/zs-input.vue
- 所属项目：2-0；来源会话ID：4f460db1-c912-4fc0-8cd5-057a4f3235eb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_fix",
  "source_extraction_id": "6ca91290452c4096a17022bc94e767f8",
  "version": 1,
  "memory_type": "entities"
}
-->