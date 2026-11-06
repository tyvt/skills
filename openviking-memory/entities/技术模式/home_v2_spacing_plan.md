# 首页v2单位间距修订计划
苏住房G首页v2提出间距修订计划，尚未改代码，等待确认执行。

## 理解修正
- 图1/图2：四指标小卡片内部（标题→数字→单位）太挤，应在 .cd__metric、.pb__stat 增加 gap/min-height，而非拉大指标行与下方距离。
- 图3：大区块间竖向间距偏大且第二行固定412px高、卡片overflow:hidden导致底部卡被裁切，应收紧 .cd__metrics→图例→进度条→.cd__cards 的 margin-top，必要时略增 row--2 行高。

## 计划变更
- 移除原先 .cd__legend、.pb__title +12px（与意图相反）。
- 保留建筑面积万㎡（÷10000）+明细数值紫色。

## 涉及文件与归属
- 文件：home/v2/components/KeyDataNav.vue、home/v2/keyDataMap.js、home/v2/components/CheckDataNav.vue、home/v2/components/PublicBenefit.vue。
- 计划文件：c:\Users\Administrator\.cursor\plans\首页_v2_单位间距_da158dc8.plan.md
- 所属项目：苏住房G；来源会话：c5473174-fa98-4a12-b7b0-6ebcc4b7993f；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_v2_spacing_plan",
  "source_extraction_id": "aa5097d2d987484dac22db483d630023",
  "version": 1,
  "memory_type": "entities"
}
-->