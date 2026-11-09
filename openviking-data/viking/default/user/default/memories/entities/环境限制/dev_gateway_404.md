# 苏住房C门户dev网关服务缺失
苏住房C 门户H5 部署的 8095 反代 dev 网关上，文章/学习园地/新闻三个服务返回 404，其余接口为真实数据。

## 404 服务
- 文章服务（/v2.0/article/...）在 8095 dev 网关返回 404
- 学习园地服务（/v2.0/article/portal/getStudyList）在 8095 dev 网关返回 404
- 新闻公告服务（/v2.0/article/richText/...）在 8095 dev 网关返回 404
- 上述服务在苏住房C 的 test 网关上有数据

## 真实数据服务
- 任务数、消息数、横幅、待办列表、用户信息在 dev 网关上是真实数据
- 前端接口路径已按苏住房C 正确接好，网关补齐服务后无需改前端即可出真实数据

## 影响
- 线上（8095 dev 网关）文章/学习园地/新闻三块走静态兜底（portalSeed.ts），不白屏

<!-- MEMORY_FIELDS
{
  "category": "环境限制",
  "name": "dev_gateway_404",
  "source_extraction_id": "3810ba31cdfd478fac2ea4f468b24659",
  "version": 1,
  "memory_type": "entities"
}
-->