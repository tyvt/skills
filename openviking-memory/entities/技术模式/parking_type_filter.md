# 切换车位类型数据未筛选问题
园区物管2.0 切换车位类型时下方数据未筛选，后端文件未找到，以前端字典解析+标签匹配+切换带参重请求方案为准。
## 问题根因
- 后台代码检索：在 `d:/repository` 按 `*StandingBook*`、`*ParkingSpace*List*` 搜索约 5 分钟未找到 Java/后端文件（当前仓库主要是前端 `zhi2-web-admin`）
## 解决方案
- 早期方案：人防车位筛选以前端字典解析 + 标签匹配 + 切换筛选时带查询参数重新请求列表；后续 operatingAssets.vue 改为纯前端本地过滤不再请求（见 parking_filter_frontend）
- 若仍异常需对照真实接口 `selectParkingSpaceList` 返回字段，或到独立后端项目查 `StandingBook` 实现
## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue、benefit/pubParkingSpace/components/parkingDialog.vue
- 所属项目：园区物管2.0；来源会话：a9ba015b-6bbe-4dd8-aec5-80470e748ad2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_type_filter",
  "source_extraction_id": "fb80bfca03ac4c659cad7642f8b60177",
  "version": 2,
  "memory_type": "entities"
}
-->