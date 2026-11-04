# 业主决策时间回显覆盖修复
修复 `autonomy/general/detail.vue` 选时间后被强制改写导致回显成0点的问题。

## 问题根因
- `@change="handleDecisionTimeChange"` 在用户选完时间后强行改写：开始非当天→00:00:00，结束→23:59:59，开始当天→当前+1小时
- 导致选择时间被覆盖，回显为 `2026-09-30 00:00:00 - 2026-10-23 23:59:59` 之类

## 修复方案
- 模板删除 `@change="handleDecisionTimeChange"`，改为 `:default-time="['00:00:00', '23:59:59']"`
- 删除 `handleDecisionTimeChange` 方法（全库无其他引用）
- 手动选时间原样回显提交；只选日期不点时间仍默认00:00:00/23:59:59，与本项目的 `surveyRelease`、`utilityLinkConfig` 写法一致

## 项目与验证
- 所属项目：惠山二期G
- 来源会话：599febc8-15af-4a92-bfc3-4d8864681fc6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_time_echo",
  "source_extraction_id": "418a2e22bab440878a70df76d501799d",
  "version": 1,
  "memory_type": "entities"
}
-->