# [苏房] 左侧部门树返回后跳回根节点
行政区域银行授权等「左侧树+右侧列表」页面，从详情返回列表后树回到苏州市根节点，列表不再是之前筛选街道数据。

## 问题现象
- 行政区域银行授权、物业管理区域等左侧树+右侧列表页面，从详情页返回列表后树自动回「苏州市」根节点
- 列表也不再是之前筛选的街道数据

## 根因
- RegionTreeLayout 靠 cachedSearchParams.parentDeptId 恢复树选中，但列表页 queryParams 只缓存 regionCode、没保存 parentDeptId，返回时无处可恢复
- RegionTreeLayout 里 tree-ready 在 setNodeContext 之后才触发，getList() 执行时 nodeContext 还是默认市级节点，即使选中态恢复数据仍是市级

## 解决方案
- queryParams 里补 parentDeptId，与搜索条件一起进缓存
- 点树节点、setNodeContext 时双向同步 parentDeptId
- handleTreeReady 用 findParentNode 还原街道级节点的父级上下文
- getQueryParams 里把 parentDeptId 过滤掉，避免当业务参数发后端
- 调整 tree-ready 顺序：先通知父组件设置上下文，再调 getList()
- 配套：退出登录必须清缓存（对应会话 c14c5230-321b-471a-a40a-e48d33f20dbb 的退出清缓存修复），否则换账号继承上一账号部门筛选

## 验证与归属
- 验证会话 5decc0c2（064.md 会话 5decc0c2）：部门树从详情返回后回到苏州市节点，根因未缓存 parentDeptId+tree-ready 顺序错
- 修复涉及 regionBankAuth/index.vue 与 RegionTreeLayout.vue 的 queryParams、setNodeContext、handleTreeReady、getQueryParams、树节点点击与 tree-ready 顺序
- 涉及文件：system/regionBankAuth/index.vue、property/complex/components/RegionTreeLayout.vue、property/complex/components/regionTree.vue、mixins/listMixins.js
- 所属项目：苏住房G；代码基线：864b409；来源会话ID：5decc0c2-1c85-4c33-89ec-7c181923edc0

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "tree_return_root",
  "source_extraction_id": "bef229ef9efa47e0b71ee6b556779111",
  "version": 2,
  "memory_type": "entities"
}
-->