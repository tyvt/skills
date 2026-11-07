# 数据可视化页地图对应腾讯API
无锡市区G项目zhi2-web-admin的mapOverview数据可视化页，底图使用ECharts行政区划GeoJSON，轮廓数据来自腾讯位置服务WebService行政区划API。

## 对应接口
- 行政区划搜索：https://apis.map.qq.com/ws/district/v1/search 按adcode查市级区划
- 获取下级行政区划：https://apis.map.qq.com/ws/district/v1/getchildren 拉取下级区县轮廓供ECharts绘制
- 腾讯控制台产品名：WebServiceAPI→行政区划服务（行政区划边界查询）

## 代码位置
- 地图初始化并行调用上述两接口：utils/tencentDistrictBoundary.js 363:371
- 地图组件：statisticsMap/components/map.vue、ZsTencentMap/mapLoader.js、utils/tencentMapKey.js、views/benefit/mapOverview/index.vue

## 验证与来源
- 验证：src=无锡市区G（会话cddb6eee-4c9a-4c3f-9de6-1a21655f7967）
- 代码基线：none

## 验证与归属
- 所属项目：无锡市区G
- 验证证据：extracted source=cursor project=无锡市区G
- 来源会话：cddb6eee-4c9a-4c3f-9de6-1a21655f7967


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tencent_district_api",
  "source_extraction_id": "487b125f28014405af5c516b05a5f94f",
  "version": 1,
  "memory_type": "entities"
}
-->
