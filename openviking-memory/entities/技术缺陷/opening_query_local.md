# OpeningBuildingDialog查询仅本地过滤
维保开户模块中 OpeningBuildingDialog.vue 的 handleQuery 仅对本地 originData 做 filter，未请求接口导致数据不全。

## 问题根因
- handleQuery 仅对 originData 做 filter，未向接口发请求，列表数据不完整。

## 解决方案
- 新增 queryOriginData() 请求 listUrl 拉取数据。
- handleQuery 重置分页并校验树节点后调用 queryOriginData() 发请求。

## 验证与归属
- 涉及文件：OpeningBuildingDialog.vue
- 所属项目：园区物管2.0（项目2-0）
- 验证证据：src=2-0/021.md
- 来源会话：d1b2d0b3-aa25-42eb-93c8-7a169f622410

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "opening_query_local",
  "source_extraction_id": "a5b508af35ef44519ddeab11320e8cba",
  "version": 1,
  "memory_type": "entities"
}
-->