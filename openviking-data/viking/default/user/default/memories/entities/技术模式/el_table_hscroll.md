# 门户 el-table 横向滚动条悬停显示修复
门户 zhi2-web-admin 表格底部横向滚动条滑块，鼠标在表头、固定列或单元格上时不出，仅指针移到滚动条轨道附近才出现。

## 问题根因
- 全局样式写成 `.el-table__body-wrapper:hover::-webkit-scrollbar-thumb`，Chromium 中「悬停滚动条滑块」不等于「悬停在 body-wrapper 上」，指针在表体数据区不命中该规则

## 解决方案
- 在 `src/styles/index.scss` 改为整张表悬停即显示主表体横向滑块
- 原生 el-table：`.el-table:hover > .el-table__body-wrapper::-webkit-scrollbar-thumb`
- zs-table 包裹场景：`.zs-table-container:hover .el-table__body-wrapper::-webkit-scrollbar-thumb`
- 改后刷新，首页待办等宽表上移入任意区域应能看到底部横滚条

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证：index.scss 原用 .el-table__body-wrapper:hover 仅轨道附近显示，改为 .el-table:hover > .el-table__body-wrapper 与 .zs-table-container:hover
- 验证证据：src=门户/033.md
- 涉及文件：src/styles/index.scss、src/components/zs-table/zs-table.vue、src/views/home/components/HomeTodoTable.vue、package.json
- 所属项目：门户；来源会话：908fa819-e4da-4511-b737-948d86388270；代码基线：b84b4e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_table_hscroll",
  "source_extraction_id": "b5902f830b8c4e0b9062f0b54455ece5",
  "version": 2,
  "memory_type": "entities"
}
-->