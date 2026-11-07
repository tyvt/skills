# 模拟小区点不显示兼容修复
产品2.0中benefit/statisticsMap因经纬度字段未统一数值化导致模拟小区点不显示，已做兼容修复。

## 问题原因
- 经纬度字段可能为非数值或被过滤，导致打点失败或渲染异常
- 字段命名不统一（latitude/longitude与lat/lng）

## 修复内容
- normalizeProjectList兼容latitude/longitude和lat/lng，统一Number(...)且仅保留Number.isFinite有效坐标
- 补充projectName兜底（projectName/leaseProjectName/name）避免标签无文字
- 初始mapPosition改为数值类型消除类型不一致
- components/map.vue打点前再次兼容两套字段并转数值，非法经纬度直接跳过

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：刷新statisticsMap页面查看小区模拟点恢复；若未恢复继续排查mockApi返回与地图SDK脚本加载
- 涉及文件：src/views/benefit/statisticsMap/index.vue、components/map.vue
- 所属项目：产品2.0；来源会话：4e071976-4604-4c8f-972d-87c97674c807；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statmap_point_fix",
  "source_extraction_id": "3b7c32de1f0b440c8ceb0198c73dafbb",
  "version": 1,
  "memory_type": "entities"
}
-->