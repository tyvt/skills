# 苏住房C小程序
苏住房C 是苏州住房相关的微信小程序前端项目，仓库路径 D:\repository\苏住房C\zhi2-mobile-shimin。

## 页面与接口
- 业主决策列表使用组件 DecisionList.vue（蓝色项目条、圆形房屋图、决策类型chip、日期行），列表接口 POST /autonomy/AppDecision/listDecisionView
- 业主决策详情接口 GET /autonomy/AppDecision/{decisionId}
- 决策结果接口包括 POST /autonomy/AppDecision/getMaintainResult、POST /autonomy/AppDecision/getSortResult、GET /autonomy/decision/calculationChart/{decisionId}
- 我的民意调查页面 pages_owner/poll/index.vue，列表接口 GET /evaluation/evaluation/pageSurveyEvaluation
- 问卷参与页使用接口 GET /survey/survey/getInfoAndReply、POST /survey/reply、POST /survey/topicReply/addOrUpdate、POST /survey/reply/complete/{surveyReplyId}

## 备注
- 截图中的业主决策页 Tab 为“待完成/已完成”且按钮为“决策详情/修改决策/决策结果”，与当前工作区 index.vue（进行中/已结束）不同，可能来自其他分支部署，但共用 DecisionList 组件与后端接口
- 园区表决H5（zhi0-mobile-statistics-h5-c）是独立 H5，不包含这两个小程序页面

<!-- MEMORY_FIELDS
{
  "category": "前端代码仓库",
  "name": "苏住房C小程序",
  "source_extraction_id": "339481513de34388861441b6741ae98a",
  "version": 1,
  "memory_type": "entities"
}
-->