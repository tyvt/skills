# 地图下钻两条约定：SVG 顺序耦合与下钻视野等待
园区物管2.0 GIS 地图（无锡区县/街道下钻）两个坑：SVG 区块数组与 svg <g> 文档顺序强耦合不可重排；下钻视野必须等接口数据就绪再移动。

## 问题根因
- 区县顺序约束：SVG 高亮按索引匹配，WUXI_SVG_GROUP_REGIONS 必须与 wuxi.svg 里 <g> 文档顺序一一对应，否则地图高亮错位
- 街道点击白屏：下钻层定位数据来自 selectOptionalComplexList 接口而非气泡坐标，视野先动、标记未就绪导致白屏

## 解决方案
- 区县类顺序调整时只重排数据/mock 与取色表，不动 SVG 顺序数组；接真实接口后由前端按固定顺序 reorder 兜底
- 统一区县顺序为「江阴→宜兴→梁溪→锡山→惠山→滨湖→新吴」（mock 列表、DISTRICT_COLOR、图表 series 同步）
- 街道下钻改为：等接口返回后取列表中第一条有有效经纬度的物业点，先移图（缩放 SEARCH_SINGLE=16）再更新标记；全部无经纬度则只更新标记不移视野

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：未改 WUXI_SVG_GROUP_REGIONS 导致地图高亮错位已明确；街道点击白屏改为等 selectOptionalComplexList 返回后取第一条有经纬度数据、先移图再更新标记
- 涉及文件：src/views/benefit/mapOverview/index.vue、src/views/benefit/statisticsMap/index.vue、src/views/benefit/statisticsMap/components/map.vue
- 所属项目：园区物管2.0；代码基线：3353ef164 / 3965548b6；来源会话：b97ec724-eb8f-408e-a609-9f918b7b1d71、b290ab4f-dc47-412c-b6bb-780421a0a4ae

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_drill_down_order",
  "source_extraction_id": "f46e17a1f6c54021ae5abeaef8eabd8f",
  "version": 1,
  "memory_type": "entities"
}
-->