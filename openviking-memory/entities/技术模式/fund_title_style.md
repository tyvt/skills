# 资金全景页标题左对齐加蓝色竖条
园区物管2.0 资金全景页（fundPanorama）区块与图表标题统一改为左对齐并加蓝色竖条样式。

## 修改要点
- 区块大标题（panorama-block__title：账户统计、资金收入、资金支出）用 flex+align-items:center 左对齐，::before 画 4×16px 竖条色 #1890ff，圆角 1px，间距 8px
- 图表小标题（chart-wrap__title：各区账户余额、各类收入/支出、趋势图、各区饼图等）去 text-align:center 改 flex 左对齐，同样 ::before 蓝色竖条
- 仅动样式未改模板；metric 卡片内文案（如「入账金额」）未加竖条
- L320 附近 TS 报错为原有问题，与本次样式修改无关

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：fundPanorama/index.vue、assetPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：3bb2b763-7e41-4a6c-893a-450eceb6ab41；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_title_style",
  "source_extraction_id": "b701ffae5f6b4b488b7ce890c4ed9a0e",
  "version": 1,
  "memory_type": "entities"
}
-->