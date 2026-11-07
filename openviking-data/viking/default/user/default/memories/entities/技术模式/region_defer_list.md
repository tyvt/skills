# 区域树列表页首屏闪烁延迟请求
带 RegionTreeLayout 的列表页因 listMixins 立即请求全量数据、树就绪后再次筛选请求，造成先全量后筛选闪烁。

## 根因
- listMixins 的 init() 立即调 getList()，此时 parentDeptId 未就绪。
- 区域树异步加载完成默认选中节点又触发一次带筛选 getList()，两次请求先后返回致闪变。

## 解决方案
- table.js 增加 shouldDeferListForRegionTree() 判定：平铺模式（value 有值）或 B 端终端（terminalType==='B'）不延迟；否则页面 $options.components 注册了 RegionTreeLayout 就延迟首次列表请求。
- regionTree 组件树加载完成 emit 'tree-ready'（初始化不再触发 nodeClick 避免重复请求），RegionTreeLayout 监听后设 parentDeptId 再调父页 getList()。
- 树数据为空也要触发列表加载避免一直 loading；重写过 init() 的页面（如 complexChange）需同步加入延迟逻辑。

## 关联信息
- 涉及文件：zhi2-web-admin/src/mixins/table.js、listMixins.js、views/property/complex/components/RegionTreeLayout.vue、regionTree.vue、complexChange/index.vue
- 所属项目：园区物管2.0；来源会话：2a9ee75a-2075-41ab-a461-629ef177b080；代码基线：177bc3ce4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_defer_list",
  "source_extraction_id": "7aa21506fd5c4a07951cf74c630599a1",
  "version": 1,
  "memory_type": "entities"
}
-->