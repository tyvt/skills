# 表格悬停显示横向滚动条（el-table 横滚条）
门户调整全局滚动条样式，使鼠标移入表格任意区域即显示主表体横向滚动条滑块。

## 问题根因
- 原 `index.scss` 使用 `.el-table__body-wrapper:hover::-webkit-scrollbar-thumb`，Chromium 中「悬停滚动条滑块」不等于「悬停在 body-wrapper 上」，仅当指针在滚动条轨道附近才显示滑块。
- 鼠标在表头、固定列或单元格上时，不触发该悬停规则，横向滚动条不显示。

## 修复方案
- 在 `zhi2-web-admin/src/styles/index.scss`（亦记录为 `src/styles/index.scss`）改为 `.el-table:hover > .el-table__body-wrapper::-webkit-scrollbar-thumb`。
- 新增 `.zs-table-container:hover .el-table__body-wrapper::-webkit-scrollbar-thumb` 适配 zs-table 容器。
- 悬停表头、右侧固定列或数据区时底部横向滚动条均显示，与 zs-table、首页待办表一致；刷新后首页待办等宽表上移入任意区域应能看到底部横滚条。

## 验证与归属
- 验证证据：extracted source=cursor project=门户；cursor 会话提取；验证证据：src=门户/033.md；所属项目：门户。
- 来源会话ID：908fa819-e4da-4511-b737-948d86388270；代码基线记录为 none 与 b84b4e7。
- 涉及文件：`zhi2-web-admin/src/styles/index.scss`、`src/styles/index.scss`、`src/components/zs-table/zs-table.vue`、`src/views/home/components/HomeTodoTable.vue`、`package.json`。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_scrollbar_hover",
  "source_extraction_id": "f61f579abe764cdfa8d29918a57cc7da",
  "version": 2,
  "memory_type": "entities"
}
-->