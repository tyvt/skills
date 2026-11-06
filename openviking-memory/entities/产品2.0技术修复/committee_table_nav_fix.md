# committeeTable 跳转存量业委会缺失 ID 修复
产品2.0 项目修复 publicQuery/complex/components/committeeTable.vue 的 handleView 跳转逻辑 bug。

## 问题原因
- 跳转存量业委会/物管会（sourceType == 1）时路由只指向 directDetail，未拼接 committeeVersionId，详情页拿不到对应记录
- 新增数据走 detail 路径时会拼接 ID，表现正常

## 修复内容
- 对齐 autonomy/record/components/index.vue 跳转逻辑：无论存量还是新增，都在路径后拼接 row.committeeVersionId
- 存量走 directDetail，新增走 detail

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/publicQuery/complex/components/committeeTable.vue、autonomy/record/components/index.vue、autonomy/record/components/enums.js、publicQuery/complex/detail.vue
- 所属项目：产品2.0；来源会话：6a98c35a-f7f0-46a2-9882-8721000ff3f1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术修复",
  "name": "committee_table_nav_fix",
  "source_extraction_id": "c9079b3172974152be69fd2cd009cf8a",
  "version": 1,
  "memory_type": "entities"
}
-->