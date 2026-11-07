# 中心底栏列宽比修正
园区物管2.0 benefit/mapOverview 中心底栏列宽比曾反置，已修正。

## 问题
- .center-bottom-row 原 grid-template-columns: 1fr 1.22fr 使右侧「账户余额排名」宽于左侧柱状图，与视觉稿相反

## 修正
- 改为 3fr 2fr，左侧数量区约 60%、右侧余额区约 40%

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：bd7c381a-dfc6-4484-8f46-7a8bc8ff605f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "center_bottom_layout",
  "source_extraction_id": "451448d91eb84f1fa454c719d9bb963a",
  "version": 1,
  "memory_type": "entities"
}
-->