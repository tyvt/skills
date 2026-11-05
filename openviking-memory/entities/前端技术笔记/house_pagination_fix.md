# 楼幢房屋关联弹框分页器压缩
修复楼幢信息详情房屋关联弹框分页器换行问题。

## 修改内容
- `building/building/components/houseTable.vue` 与 `benefit/assetLeaseApply/components/houseTable.vue`：layout 从 `sizes, prev, pager, next, jumper` 改为 `prev, pager, next, jumper`，去掉条/页下拉
- 保留 pager-count="5"（Element UI 最小奇数值），超5页折叠如 `1 2 3 ... 6`
- 每页固定10条，支持上下页及前往x页跳转

## 验证与归属
- 所属项目：园区公共收益；来源会话：f087205d-f215-464e-b55c-d86410257745

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "house_pagination_fix",
  "source_extraction_id": "4e197fd9c17d47ec9857dc89e475924b",
  "version": 1,
  "memory_type": "entities"
}
-->