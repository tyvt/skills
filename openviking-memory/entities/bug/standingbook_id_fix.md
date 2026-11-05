# 台账物业管理区域详情页接口排查与修复
苏住房G(zhi2-web-admin) 台账物业管理区域详情页显示全 0 和「暂无数据」，根因是 commit 5d50941f2 改 ID 优先级导致传错 ID。

## 排查结论
- 不是漏调接口，Network 中 4 个 XHR 对应 selectOperatingAssetsCategory/{id}、selectOperatingAssetsCategoryHouseList/{id} 及地图层 selectOptionalComplexList
- 接口均返回 200，但 data 为空导致页面显示全 0 和「暂无数据」

## 问题根因
- commit 5d50941f2 把 ID 优先级改为 complexId 优先
- standingBook 路径参数历史上用 projectId || leaseProjectId（与 incomeAndExpenditure 等 query 接口一致）
- 当 marker 上 complexId 与 leaseProjectId 不同时，用错 ID 查台账致 200 空数据

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：operatingAssets.vue、overviewContent.vue、index.vue、statisticsMapDetail/index.vue
- 来源会话ID：5aabb73b-5e1d-4042-9c52-01a66874380d

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "standingbook_id_fix",
  "source_extraction_id": "ed95a44e919c4b86bd75d9544ebd9b29",
  "version": 1,
  "memory_type": "entities"
}
-->