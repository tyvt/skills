# zs-input 固写插槽致输入框预留前后缀
zs-input.vue 无条件渲染 append/prepend/suffix/prefix 插槽模板，el-input 检测到即预留区域导致自动显示前后缀，需按需渲染插槽。

## 现象
- zs-input.vue 无条件渲染 append/prepend/suffix/prefix 插槽模板。
- el-input 检测到插槽即预留区域，导致输入框自动显示前后缀。

## 根因
- 插槽模板始终存在，el-input 误判存在前后缀内容而预留空间。

## 修复方案
- 仅当 `$slots.xxx` 存在时才渲染对应插槽，避免无内容时预留区域。

## 关联信息
- 涉及文件：zs-input.vue。
- 来源会话：4f460db1-c912-4fc0-8cd5-057a4f3235eb；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zs_input_slot",
  "source_extraction_id": "5f4a8e9e8b1749e193841376524c88e4",
  "version": 1,
  "memory_type": "entities"
}
-->