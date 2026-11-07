# 账户统计布局收紧
园区物管2.0 账户统计块布局调整，避免无效留白。

## 改动
- 账户统计块：去掉 `min-height:400px` 和 `flex:1.5`，改 `flex:0 0 auto` 按内容高度。
- 分布图容器：取消 `flex:1`，画布固定约 `200px`。
- ECharts `grid.bottom` 由 28 调至 `18`。
- 左列剩余空间由下方两个趋势图块均分。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：benefit/dataSandbox/fundPanorama/index.vue 等。
- 所属项目：园区物管2.0；来源会话：f81f2bdd-ae72-42a0-b507-70f5cad7acb8；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_panorama_layout",
  "source_extraction_id": "5b28c23ba34f4fcf8f92896fe45914b5",
  "version": 1,
  "memory_type": "entities"
}
-->