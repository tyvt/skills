# 选项表决字段归属与接口映射
太仓一网通办H5 的选项表决详情误用业委会选举接口字段，根因是迁移时写错而非太仓遗留逻辑。

## 字段归属
- `optionGroupResultList` → `tMfOptionApplyList` 用于**业委会选举**候选人得票统计，接口为 `selectDecisionResult`
- `optionList` 用于**选项表决**各选项权数/面积统计，接口为 `calculationChart`
- 选项表决详情不应使用 `optionGroupResultList`，此前修复方向错误

## 太仓原版逻辑
- 太仓原版 `decision/optional/ResultStatistics.vue` 结论取 `selectMaintainResult`
- 饼图与进度条取 `ownerCalculationChart` 返回的 `optionList`
- 迁移到 `/owner-decision` 后误写为 `optionGroupResultList` 导致选项表决不展示

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：decision/optional/ResultStatistics.vue、owner-decision/components/ResultStatisticsTab.vue、decision/common/ResultStatistics.vue、decision/components/ProgressBar.vue、components/ProgressBar.vue
- 所属项目：太仓一网通办H5；来源会话：77cef414-e757-45c7-ac15-5e03769e0bd4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_vote_field",
  "source_extraction_id": "422ff77c57eb4bd69b30a82abb41573c",
  "version": 1,
  "memory_type": "entities"
}
-->