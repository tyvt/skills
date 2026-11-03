# 选举详情非分组分支取错字段
苏住房C 投票选举模块非分组选举详情页候选人整块不显示，因非分组分支误用 selects.rows 而非 selectOptions。

## 问题根因
- 详情组件按是否分组走两套数据，分组分支读 selects.rows（列表接口包装），非分组分支沿用同写法。
- 非分组分支数据实际在 selectOptions 上，取到 undefined 数组后 v-for 渲染零条，页面无任何报错。
- 此类「同组件两条分支、其中一条复制来的」是投票/选举模块重复踩点。

## 解决方案
- 改前先确认当前走哪条分支（decisionType 分组与否），将非分组分支取数统一改为 selectOptions 并给空值兜底。
- 改完两条分支都要各自验证一遍，不要只测出问题的那一种。
- 同类 DecisionResult/ResultDetail/ResultRecord 副本一并复核，避免残留。

## 验证与归属
- 验证：会话 aa7c3d25（2026-08-27，基线 f1939b0）修改第2组：「ResultDetail.vue / ResultRecord.vue 非分组选举将错误 selects.rows 改为 selectOptions」。
- 涉及文件：zhi2-mobile-shimin/src/pages_vote/elect/ResultRecord.vue、zhi2-mobile-shimin/src/pages_vote/elect/DecisionResult.vue。
- 所属项目：苏住房C；来源会话ID：aa7c3d25-bd1a-4ca4-bb8f-8c55d6730cc6；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elect_nongroup_selectoptions",
  "source_extraction_id": "f05b6458c8ca40feaba9dc1759c1ed7d",
  "version": 1,
  "memory_type": "entities"
}
-->