# 共用区域树点击节点自动收起
苏住房G 物业管理区域树点击有下级节点行后自动收起，根因为 el-tree 默认属性与展开逻辑叠加。
## 问题根因
- el-tree 默认 expand-on-click-node=true，点带子节点行会先切换展开态把节点关掉。
- selectNode 中 expandPathToNode 仅对祖先链 slice(0,-1) 做展开，不保持当前选中节点自身展开。
- 组件为共用，影响收费标准、停车泊位、经营资产等所有使用 RegionTreeLayout 的页面。
## 解决方案
- regionTree.vue 显式写 :expand-on-click-node="false"，点节点只选中不切换展开。
- selectNode 中若选中节点有子节点，显式置 expanded=true。
- 修复点在共用组件，改一次覆盖所有业务页；排查树行为异常先定位共用组件。
## 验证与归属
- 验证证据：会话48b7aef9 用户报点击社区后自动收起，根因如上；修复为 expand-on-click-node=false 并显式展开选中节点，按261→262→yulin顺序合并（13f00ec7f/ef91f28a7/c231d4d94）。
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/regionTree.vue、RegionTreeLayout.vue
- 所属项目：苏住房G；来源会话ID：48b7aef9-23d7-414e-8513-1451a9dedf09；代码基线：96eaa55

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_collapse",
  "source_extraction_id": "78a06fbd1aec4ffab8656af93c6d4aae",
  "version": 1,
  "memory_type": "entities"
}
-->