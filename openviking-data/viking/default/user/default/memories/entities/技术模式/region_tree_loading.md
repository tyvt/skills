# region_tree_loading
园区物管2.0 property/complex 左侧区域树请求中 el-tree 应显示「加载中」而非「暂无数据」的约定。

## 现象
- 首屏请求未完成时，el-tree 默认 empty-text 显示「暂无数据」，与真实状态不符

## 解决方案
- 在真正发树的子组件（regionTree.vue，RegionTreeLayout 仅包裹）维护 treeLoading：初始 true；getDeptList 请求前置 true，成功赋值 treeData 后 $nextTick 完成展开/默认选中再 false，失败/异常同样关闭
- :empty-text 动态为 treeLoading ? '加载中' : '暂无数据'；父级用 treeRenderKey 重挂子树会重新走流程
- 若需整区遮罩可叠加 v-loading="treeBusy || treeLoading"，文案管树内空态，遮罩管整块不可点

## 验证与归属
- 验证：会话 190c0ade 用户要求左侧树请求时「暂无数据改为加载中」；实现在 regionTree.vue 的 treeLoading + 动态 empty-text + getDeptList 流程
- 涉及文件：regionTree.vue、RegionTreeLayout.vue；所属项目：园区物管2.0；代码基线：7fe15a8cb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_loading",
  "source_extraction_id": "a1f1b35f47af4915ad79cae6583607ea",
  "version": 1,
  "memory_type": "entities"
}
-->