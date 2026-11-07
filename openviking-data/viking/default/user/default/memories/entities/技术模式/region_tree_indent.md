# 区域银行授权树缩进调整（苏住房G）
苏住房G 项目 system/regionBankAuth 左侧树中街道节点缩进调整以明确层级。
## 修改要点
- 街道为最末级，原用 display:none 隐藏展开箭头导致文字左靠
- 改为保留箭头占位仅隐藏图标（visibility:hidden）以保留缩进
- 修改在 regionBankAuth/index.vue 的 style 428-434行
## 涉及文件
- zhi2-web-admin/src/views/system/regionBankAuth/index.vue
- property/complex/components/RegionTreeLayout.vue（相关）
## 验证与归属
- 所属项目：苏住房G；来源会话：042a2ba8-8758-4813-bbd4-08a792c81b3b；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_indent",
  "source_extraction_id": "74129eda8d3f40a694d895ddf91ed661",
  "version": 1,
  "memory_type": "entities"
}
-->