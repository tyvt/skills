# Element UI 树「全部展开」卡死根因与分批套路
园区物管2.0 中 Element UI 树组件做「全部展开」时即便用 requestAnimationFrame 分批仍长时间无响应甚至卡死。

## 问题根因
- rAF 分批只分散调用时机，但每节点仍调 treeNode.expand()
- Element UI expand() 内部做懒加载检查、父链 expanded 更新、子节点 DOM 创建，节点多时单帧产生大量 DOM，主线程长时间阻塞

## 解决方案
- 不调 expand()/collapse()，直接赋值 node.expanded = true/false，绕过内部多余逻辑
- 按层级展开：先浅层后深层，避免子节点在父节点未展开时重复渲染；收起时自深向浅反向
- 每层内每帧最多处理约 40 个节点，进一步分摊渲染压力
- 过程中显示 loading 并禁用按钮（「展开中...」）
- 树节点达上万叶子时全部展开 DOM 本身就大，性能仍有上限，应引导用户改用「平铺展示」模式

## 验证与归属
- 验证：regionTree.vue 全部展开卡死，原因为逐节点调 expand() 触发加载检查/父链更新/DOM 创建；改为直接设 node.expanded + 分层分批（每帧 40 个）+ loading 防重入
- 涉及文件：src/views/property/complex/components/regionTree.vue、src/views/property/complex/components/RegionTreeLayout.vue、src/components/ZsTree/index.vue
- 所属项目：园区物管2.0；代码基线：7814a0c2a / 49e7729ce；来源会话：f7783478-e3b1-4561-af77-c5aad81eed77

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_expand_freeze",
  "source_extraction_id": "f46e17a1f6c54021ae5abeaef8eabd8f",
  "version": 1,
  "memory_type": "entities"
}
-->