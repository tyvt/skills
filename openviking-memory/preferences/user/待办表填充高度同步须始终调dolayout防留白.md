- 首页待办表开 fill-height，侧栏收起宽度变但表格高度不变，syncFillHeight 在 tableHeight===height 时 return 未调 doLayout 致列间留白
- 修复为高度不变仍调 doLayout，监听 sidebar.opened 切换布局，app.js 首屏初始化 --sidebar-width
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeTodoTable.vue、zhi2-web-admin/src/views/home/index.vue、zhi2-web-admin/src/views/home/index-new.vue、zhi2-web-admin/src/views/home/index-wrapper.vue、zhi2-web-admin/src/views/home/components/layouts/HomeLayoutAdmin.vue、zhi2-web-admin/package.json、zhi2-web-admin/e2e/list/table-column-width.spec.js、zhi2-web-admin/src/components/zs-table/zs-table.vue
- 验证：cursor 会话提取；来源会话 b25bdc8a-c0a8-4fca-bcff-d85e7e292acd

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "待办表填充高度同步须始终调doLayout防留白",
  "source_extraction_id": "578557e6dd78404ebe8fc076e9cad4ee",
  "version": 1,
  "memory_type": "preferences"
}
-->
