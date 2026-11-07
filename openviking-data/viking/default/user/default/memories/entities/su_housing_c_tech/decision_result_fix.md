# 决策记录决策者姓名缺失修复
苏住房C `DecisionResult.vue` 决策记录因数据覆盖未显示决策者姓名，已改用接口返回列表直接构建修复。

## 问题根因
- `enrichRecordList` 额外请求 `getDecisionRecordDetail` 并用 `...record` 展开详情数据，可能覆盖列表项 `decisionPlayerName` 等字段。
- 列表只设置 `remark`（时间），未设置 `value`（决策选项），界面仅显示时间。

## 修复方案
- 改用接口返回 `decisionOptionResponseAllList` 构建列表：
  - `label` 取 `decisionPlayerName`（决策者姓名，如「田*」）
  - `value` 取 `decisionOptionName`（决策选项，如「弃权」）
  - `remark` 取 `createTime`（决策时间）
- 每条记录显示：左侧决策者姓名、右侧决策选项、下方决策时间。

## 涉及文件
- `src/pages_vote/decision/common/DecisionResult.vue`
- `src/pages_vote/elect/DecisionResult.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：84a82111-c481-4df3-bfc7-e5397b1d1fed
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_result_fix",
  "source_extraction_id": "8742ccd3462a4edebd58a07c474a1c2d",
  "version": 1,
  "memory_type": "entities"
}
-->