# 饼图扇区独立四舍五入超过100%
在 EstateManagement-Park 项目的饼图中，每个扇区的分别四舍五入导致总和超过100%。

## 问题
- 单独四舍五入到两位小数的扇区总和为100.01%（例如：84.49%+9.07%+6.45%）。

## 解决方案
- 新的 PiePercentUtil 在 vote/component/piePercentUtil.js 中使用最大余额法来规范化百分比。
- 已集成到 pieChartCom.js、19个带有 drawPie 的 JS 文件和18个 shtml 页面中。

## 文件与来源
- 涉及文件: vote/component/pieChartCom.js, ownerVote/components/votePreview.js, vote/component/votePreview.js, ownerVote_Detail.shtml, vote_ownervoteDetail.shtml, vote_ownervoteDetail.js, commonJs/BaseJs.js, committePer/component/committePerPreview.js.
- 来源会话: be9616f8-0da6-4e20-a64e-2ae5ed979631.

## 验证与归属
- 所属项目：园区物管V0
- 验证证据：extracted source=cursor project=园区物管V0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pie_percent_rounding",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->
