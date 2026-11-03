# sticky 操作栏压住顶栏下拉根因
Web 后台详情页 OperationBtnGroup（sticky 操作栏）设 z-index:10 时盖住顶栏 Navbar 内 z-index:1000 的下拉菜单，根因为兄弟层叠上下文只比根节点。

## 问题根因
- 顶栏根节点 Navbar 的 z-index:9 创建了独立层叠上下文，下拉的 z-index:1000 只在该上下文内部比较
- 操作栏与顶栏是不同分支的兄弟层叠关系，只比根节点值 10>9，下拉内部的 1000 救不了

## 解决方案
- 层叠被挡时不要调下拉自身的 z-index，先找两边各自层叠上下文的根节点值再比大小
- 本项目约定 OperationBtnGroup 用 z-index:1（仍能在 app-main 滚动时盖住普通内容），必须始终小于顶栏的 9
- TagsView 基准是 8，若与之重叠可调到 7 但仍须 <9

## 验证与归属
- 验证：会话 2c210045 Navbar 下拉被挡，根因为顶栏 z-index:9 的层叠上下文与 OperationBtnGroup z-index:10 兄弟比较，改为 1 后正常
- 涉及文件：zhi2-web-admin/src/components/OperationBtnGroup/index.vue；zhi2-web-admin/src/layout/components/Navbar.vue
- 所属项目：园区物管2.0；代码基线：fc994977f / 3965548b6 等；来源会话：2c210045-05e2-4f43-9233-fc8c952365a9

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "sticky_zindex_block",
  "source_extraction_id": "045a65d55d4b439cb1758c87ddea6f9a",
  "version": 1,
  "memory_type": "entities"
}
-->