# el-table 固定列单元格样式走 class-name + 非 scoped
要改 el-table 固定列（如 zs-operate-column，fixed="right"）单元格背景/样式，必须走「列级 class-name + 非 scoped 全局样式」通道。

## 问题现象
- 在组件自身 scoped 样式里写选择器改 zs-operate-column 操作列单元格背景/样式，怎么都不生效
- 固定列默认透明背景，横向滚动时会「透」出下层行内容

## 根因
- 固定列的 td/th 单元格由外层 el-table 渲染，不在本组件 DOM 子树内
- scoped 样式靠 data-v 属性选择器，选不中这些格子

## 解决方案
- 在 el-table-column 上同时加 class-name 和 label-class-name（表体与表头都要），值为自定义类名如 zs-operate-column-cell
- 在组件里写一段不带 scoped 的 <style> 块：.el-table .zs-operate-column-cell { background-color: #fff !important; }
- 凡是需要命中 el-table 内部渲染的 td/th 的定制（固定列、单元格背景、hover 行配合），都走此通道，不要在页面或组件 scoped 里找选择器

## 验证与归属
- 验证证据：会话 5c0be161，用户要求操作列背景改白色；结论指出 td 由外层 el-table 画出、不在组件 DOM 里，通过 class-name/label-class-name + 非 scoped 样式实现
- 涉及文件：zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue
- 所属项目：产品2.0；来源会话ID：5c0be161-3528-400f-9c2b-4a3ebdeb2d79；代码基线：bd398ef

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fixed_column_classname",
  "source_extraction_id": "c8b52637b66a4cfba2ab5391cdb691f9",
  "version": 1,
  "memory_type": "entities"
}
-->