# 新 app 决策已完成模块
家园区一网通办新 app 中处理 current=1/type=1 决策列表与主按钮“修改决策”的前端模块。

## 描述
- 新 app 指家园区一网通办，决策列表组件位于 src/pages-decision/components/index.vue。
- current=1 时请求 type: '1'（index.vue:163,185），列表通常是 busiState 已完成的记录。
- 在 type=1 下主按钮多数显示“修改决策”，但这是按 voteState 计算出来的，不是按 Tab 写死。

## 文案与点击
- index.vue:51-53 中，voteState 为未表决/未选举时显示“参与决策”，否则显示“修改决策”。
- 若某条记录仍在 type=1 列表中但 voteState 仍是未表决/未选举，新 app 会显示“参与决策”，与老安卓固定“修改决策”不一致。
- goForm（index.vue:209-214）不区分 Tab，只判断当前时间是否早于 voteEndDate；早于截止日期时会弹须知并进入表单。
- 在已完成 Tab 点击“修改决策”，只要在截止前也可进入表单。

## 禁用条件
- 新 app 禁用逻辑基本只看 voteEndDate，不单独判断 voteState == 已过期 或 voteState == 已表决。
- dayjs() 早于 voteEndDate 时按钮为蓝色且可点；当前时间 ≥ voteEndDate（含等于）时按钮灰色（index.vue:48-50）且点击无反应。
- 已过期记录通常也因 voteEndDate 已过而禁用，但代码未单独判断“已过期”。
- 与老安卓已表决分支按 yyyy/MM/dd 只比日期不同，新 app 用 dayjs 全时间比较 voteEndDate。
- “决策结果”入口只在已完成 Tab 可点，goStatistics 要求 current==1（index.vue:234），与“修改决策”的互斥关系比老安卓简单。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited",
  "category": "前端代码模块",
  "name": "新app决策已完成模块",
  "source_extraction_id": "59405c99f7a04e499f2f5b93f48bf19b",
  "version": 1,
  "memory_type": "entities"
}
-->