# 机构入网信息变更双状态字段冲突修复
苏州市房地产监测V3 项目修复机构入网信息变更详情页因 displayStatus 与 bizState 两套状态字段混淆导致工具栏状态计算错误的问题。

## 问题根因
- 机构入网信息变更存在两套状态字段：`displayStatus`（1/4 待提交、2 审核中）与 `bizState`（0 待提交、1 审核中、2 已备案）
- `resolveAgencyChangeToolbarBizState` 曾用 `isAgencyChangeDraftDisplayStatus` 同时判断两者
- `displayStatus === 1` 与 `bizState === '1'` 数值相同，已提交（bizState: "1"）时若 displayStatus 仍为 1，工具栏被算成 0（待提交），仍显示「提交」且「审核」不出现

## 修改要点
- `agencyChangeCoreFields.js`：`bizState` 为 1（及 3）时优先作为工具栏状态，不再对 bizState 使用 `isAgencyChangeDraftDisplayStatus`
- `bizState === 2` 且变更仍为草稿时仍按 `displayStatus` 显示待提交
- 管理端 / 企业端变更详情同步调整

## 验证与归属
- 涉及文件：`agencyChangeCoreFields.js`、管理端/企业端变更详情
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：17591b86-beed-478b-9a80-d8fddc6bba57；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "agency_status_fix",
  "source_extraction_id": "65263d182fe04a6393857312ef47263e",
  "version": 1,
  "memory_type": "entities"
}
-->