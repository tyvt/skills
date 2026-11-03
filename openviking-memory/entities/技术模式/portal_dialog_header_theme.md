# 门户弹窗表头主题色区分与全量排查
公网门户信息公示类弹窗按业务线区分表头主题色：商品房统一蓝色表头，存量房绿色。
## 问题根因
- 共用组件或共用路由 key 时，改商品房样式容易把存量房染蓝，或反过来
- 修复后存量房又变蓝，需再分流主题
## 排查与解决方案
- 按商品房/存量房菜单全量点开弹窗，对照表头色与标题
- 确保入口 key、页面 variant、表格 theme class 三者一致绑定业务线
- 修一侧须全量排查另一侧主题，避免回归
## 涉及文件与归属
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue
- 所属项目：门户；来源会话：e9f92d71-8255-4a86-a77b-f58a8d4170ac；代码基线：e1f8e0b
- 验证证据：用户要求商品房弹窗全部排查绿色表头；修复后存量房变蓝需再分流

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_header_theme",
  "source_extraction_id": "d1c4f5df3e10427d9609e97a7b9ada3f",
  "version": 1,
  "memory_type": "entities"
}
-->