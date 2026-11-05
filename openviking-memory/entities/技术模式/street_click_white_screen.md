# 点击街道进入物业点白屏修复
园区物管2.0 统计地图点击街道后进入物业点层级出现白屏，已改为等待接口返回有效经纬度后再移动地图中心。

## 问题背景
- 点击街道时原逻辑直接用街道气泡经纬度移动地图，易因数据未就绪导致白屏

## 解决方案
- 点击街道不再立即用街道气泡经纬度移动地图
- 等 selectOptionalComplexList 返回后，取列表中第一条有有效经纬度的物业点
- 地图中心移到该点，缩放级别 MAP_ZOOM.SEARCH_SINGLE（16），再更新标记
- 若接口返回数据均无经纬度，则只更新标记、不移动视野

## 涉及文件
- zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、components/map.vue

## 验证与归属
- 所属项目：园区物管2.0；来源会话：b290ab4f-dc47-412c-b6bb-780421a0a4ae

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "street_click_white_screen",
  "source_extraction_id": "7f0421bf3af94f03b6b0c602ea55cca8",
  "version": 1,
  "memory_type": "entities"
}
-->