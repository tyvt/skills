# 操作栏 z-index 过高遮挡顶栏下拉
园区物管2.0 中 OperationBtnGroup 的 z-index:10 大于 Navbar 顶栏根节点 z-index:9，导致操作栏压住顶栏下拉菜单。

## 问题根因
- Navbar.vue 顶栏根节点 z-index: 9，用户菜单、更多功能下拉写 z-index:1000 但仅在该顶栏自身层叠上下文内比较
- OperationBtnGroup 用 z-index: 10，与顶栏是不同分支的兄弟层叠关系，10 > 9，整块操作栏压在顶栏之上，下拉被挡或点不到

## 解决方案
- 把 OperationBtnGroup 的 z-index 从 10 改为 1
- 仍为 position: sticky，可在 app-main 滚动时盖住下方普通内容，又始终低于顶栏的 9，顶栏下拉正常露在最上层
- 涉及文件：src/components/OperationBtnGroup/index.vue、src/layout/components/Navbar.vue、src/layout/index.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 所属项目：园区物管2.0；来源会话：2c210045-05e2-4f43-9233-fc8c952365a9；验证证据：cursor 会话提取

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "btn_group_zindex",
  "source_extraction_id": "784cf794014b4cfc855ed72d1d2da8a2",
  "version": 1,
  "memory_type": "entities"
}
-->