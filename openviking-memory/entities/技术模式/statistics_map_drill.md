
# 大屏统计地图下钻接口切换
园区物管2.0 的 statisticsMap 地图下钻到第三级（街道）时，列表接口由物业接口切换为受益台账接口。

## 下钻行为
- 第一、二级（区县气泡、街道气泡）仍请求 GET /property/screen/selectAreaComplexNumList，参数 regionCode、dimension。
- 第三级（areaDrillStack.length >= 2，已下钻到街道）改为 GET /benefit/standingBook/selectOptionalComplexList。
- subDistrictCode 取当前街道节点 areaCode（栈最后一级，如 320508019）。
- projectName 与顶部搜索框 searchKeyword 一致，有内容才带上，避免多余参数。

## 兼容与兜底
- 列表仍走 extractAreaList（兼容 data/rows/list）与 normalizeProjectList（坐标、项目名映射不变）。
- 若新接口字段名与 /property/complex/page 不一致导致地图点不出，需补一层字段映射。

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、components/map.vue、property/mapProperty/index.vue。
- 所属项目：园区物管2.0；来源会话 f2d1a9a6-0158-4986-829e-bf8d662f3dff；代码基线 none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statistics_map_drill",
  "source_extraction_id": "f6d026a215774330a843fb24cdf97798",
  "version": 1,
  "memory_type": "entities"
}
-->