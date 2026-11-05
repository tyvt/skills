# 行政区域银行授权详情返回部门树重置修复
苏住房G项目区域银行授权从详情返回后部门树回到「苏州市」根节点，已修复。

## 问题原因
- 未缓存选中节点：RegionTreeLayout 依赖 cachedSearchParams 的 parentDeptId 恢复树选中，但列表页只缓存 regionCode 未保存 parentDeptId
- 事件顺序错误：tree-ready 在 setNodeContext 之后才触发，getList 执行时 nodeContext 仍是默认市级节点

## 修复内容
- regionBankAuth/index.vue：queryParams 增加 parentDeptId 随搜索缓存；setNodeContext 同步更新；handleTreeReady 通过 findParentNode 还原父级上下文；getQueryParams 过滤 parentDeptId
- RegionTreeLayout.vue：点击树节点同步更新 parentDeptId；调整 tree-ready 触发顺序先通知父组件设置上下

## 涉及文件与归属
- 文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、regionTree.vue、src/views/system/regionBankAuth/index.vue
- 所属项目：苏住房G；来源会话：5decc0c2-1c85-4c33-89ec-7c181923edc0；验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_fix",
  "source_extraction_id": "02759d82d8a9496b98e4adfceff55de0",
  "version": 1,
  "memory_type": "entities"
}
-->