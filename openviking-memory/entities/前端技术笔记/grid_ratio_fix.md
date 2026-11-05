# mapOverview 底部栅格比例调整
园区物管2.0 的 benefit/mapOverview/index.vue 按参考图比例修正了 `.center-bottom-row` 的栅格宽度。

## 问题原因
- 原 `grid-template-columns: 1fr 1.22fr`，右侧「账户余额排名」比左侧柱状图还宽，与截图相反

## 修改内容
- 改为 `3fr 2fr`，左侧「物业管理区域数量」约 60%，右侧「物业管理区域账户余额排名」约 40%，对应约 3:2
- 若需更接近 62.5% / 37.5%（5:3），可把 `3fr 2fr` 换成 `5fr 3fr`

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：bd7c381a-dfc6-4484-8f46-7a8bc8ff605f

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "grid_ratio_fix",
  "source_extraction_id": "002609c992b548f3a2fb6c81c8304007",
  "version": 1,
  "memory_type": "entities"
}
-->