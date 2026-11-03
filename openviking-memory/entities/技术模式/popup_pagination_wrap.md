# 弹窗窄栏分页器折行修复
园区公共收益项目中，房屋关联弹窗左侧窄栏内 el-pagination 因 layout 含 sizes 或页码过多导致 jumper 折行的修复模式。

## 问题背景
- 楼幢/租赁等「房屋关联」弹窗左侧栏宽度有限时，分页器 layout 含 sizes 或页码过多会把 jumper 挤到下一行
- 用户反馈「前往 1 页」跑到下面，验证为折行问题

## 解决方案
- 窄栏内推荐 layout="prev, pager, next, jumper"，去掉 sizes，每页条数写死或与业务约定一致
- 设 pager-count="5"（Element UI 允许的最小奇数），让页码折叠为 1 2 3 … N 而非铺满
- 修复为去掉条/页下拉、保留 pager-count=5

## 涉及文件
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue
- zhi2-web-admin/src/views/building/building/components/houseTable.vue

## 验证与归属
- 所属项目：园区公共收益；来源会话 f087205d-f215-464e-b55c-d86410257745；代码基线 b6bf87d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_pagination_wrap",
  "source_extraction_id": "729462dc60724a439e21f41e80afdde9",
  "version": 1,
  "memory_type": "entities"
}
-->