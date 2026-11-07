# 选项表决两套接口区分
太仓G 选项表决的投票弹窗与详情「表决项」Tab 是两套接口，排查弹窗表决项为空应先看 optionGroup 而非 option 系列。

## 投票弹窗接口
- 线下/线上投票弹窗（VoteRangeDialog + CandidateConfigTable）加载分组表决项：`GET /estate/optionGroup/list?decisionId=`，返回 rows（含 tMfOptionApplyList）与 costMap.waiver
- 提交投票 `POST /estate/decisionRecord`（optionList）

## 详情表决项 Tab 接口
- 详情页「表决项」Tab 配置维护（VotingItemsTable / api/estate/option.js）才是 `GET/POST/PUT/DELETE /estate/option*`

## 验证与归属
- 验证证据：会话 efe5e07f 用户问截图弹窗表决项接口；结论区分 optionGroup/list + decisionRecord 与 option 系列
- 涉及文件：zhi1-web-admin/src/views/estate/optionDecision/components/VoteRangeDialog.vue、CandidateConfigTable.vue、api/estate/option.js
- 所属项目：太仓G；来源会话：efe5e07f-1a8b-4cb4-ba67-c0e514354498；代码基线：e177dad

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_vote_api",
  "source_extraction_id": "f34e3449713b413fb2df21abd5c1b15e",
  "version": 1,
  "memory_type": "entities"
}
-->