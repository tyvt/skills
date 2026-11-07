# 所属社区异步竞态转译问题
园区物管2.0 的 property/complex/detail.vue 中，「所属社区」偶尔转译失败，本质是异步竞态问题。

## 问题
- 查看模式下「所属社区」通过 contentInfo 里的 dictFormatter 转译
- dictFormatter（main.js）从 this[column.property + "Options"]（即 communityOptions）按 dictValue 找名称
- communityOptions 来自异步加载，加载完成前 dictFormatter 已执行，导致找不到名称

## 修复方向
- 本质是异步竞态而非字典配置缺失，需保证 communityOptions 就绪后再转译或做兜底

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/property/complex/detail.vue、main.js
- 所属项目：园区物管2.0；来源会话：2bea6416-3e83-4b54-af77-1e2e56704a2a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "community_async_race",
  "source_extraction_id": "e7c77816b27148b4850d7d3313b3efb3",
  "version": 1,
  "memory_type": "entities"
}
-->