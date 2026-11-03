# 区域树列表页统一复用 RegionTreeLayout
物业域列表页通过 RegionTreeLayout 统一左侧区域树与右侧列表布局，避免各页手写树交互不一致。

## 问题背景
- 物业域列表页（如报事工单）需「左侧区域树 + 右侧列表」布局，手写树卡片样式与交互各页不一致。
- RegionTreeLayout 已集成区域树、搜索区、侧栏收起/展开、平铺/树状切换。

## 解决方案
- 用 region-tree-layout 包裹搜索表单、列表标题、状态 Tab、表格与分页。
- 查询参数按其约定用 parentDeptId（非 deptId），在 getQueryParams() 映射成接口所需 deptId。
- init() 里用 shouldDeferListForRegionTree() 延迟列表请求，等树加载完成后再拉数据。
- 树节点点击统一交给 nodeClick，页面删掉自定义树样式。

## 验证与归属
- 验证：workOrder/report/index.vue 改用后具备与物业管理区域等页一致的区域树交互。
- 涉及文件：zhi2-web-admin/src/views/property/workOrder/report/index.vue、zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue。
- 所属项目：产品2.0；来源会话：56328fda-99be-4f5f-aa76-a885f88f8613；代码基线：42b6033。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_reuse",
  "source_extraction_id": "8ee6202f370b45028bf84c31e7c8eccb",
  "version": 1,
  "memory_type": "entities"
}
-->