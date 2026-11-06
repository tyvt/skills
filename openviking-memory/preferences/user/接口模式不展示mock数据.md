- 使用真实接口（USE_MOCK_DATA = false）时，页面默认不展示 mock 数据，先显示空数据/0，接口返回后再填充真实数据。
- 实现方式：新增 createEmptyPanoramaCards() 保留标题、单位、配色等静态配置而数值置空（summaryValue: 0、donutData: []、barValues 全为 0）；初始化改为 `USE_MOCK_DATA ? cloneMockCards() : createEmptyPanoramaCards()`。
- 适用页面：assetPanorama、fundPanorama 等数据沙盘页；所属项目：园区物管2.0；来源会话：0d12bfa5-5326-44a2-8e2c-d1e5aeef584f。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "接口模式不展示mock数据",
  "source_extraction_id": "1234e1f0eeea47cd9c77abdbecb876db",
  "version": 1,
  "memory_type": "preferences"
}
-->