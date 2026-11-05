# 首页业务板块等高拉伸布局
门户首页 HomeBizSection 布局修复：避免商品房列被拉满挤掉存量房/住房租赁板块。

## 规范要点
- 根因：曾给所有 HomeBizSection 加 height:100% 和 flex:1，导致「商品房」左侧整列被拉满，存量房/住房租赁被挤到看不见（或高度0）
- stretch 属性：仅次要行（存量房、住房租赁）开启等高拉伸；商品房仍按内容高度显示
- biz-center：有次要板块时用 grid（auto + 1fr），商品房占第一行，第二行留给并排板块；无次要板块时仍用普通纵向 flex
- 经纪端侧栏并排板块同样加上 stretch 属性

## 验证与归属
- 验证：会话 94cb407a 修复商品房被拉满挤掉下方板块问题；刷新确认商品房下方重新出现存量房、住房租赁和右侧常用功能且底边对齐
- 涉及文件：zhi2-web-admin/src/views/home/components/layouts/HomeLayoutSidebar.vue、config/homeLayout.js、HomeLayoutAdmin.vue
- 所属项目：门户；来源会话ID：94cb407a-5b39-4218-8e57-162fde013753；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_biz_section_layout",
  "source_extraction_id": "e0e7df219ed7408bb18e5d442e1b453c",
  "version": 1,
  "memory_type": "entities"
}
-->