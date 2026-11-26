# homeland-android
老 app 指 homeland-android 原生安卓应用，其决策列表按钮按 Tab 的 pageType 固定显示，不按 voteState 改文案。

## 决策列表
- 仓库路径为 D:/repository/homeland-android。
- DecisionsRecyclerItemPresenter.java:194-198 显示：pageType==1 为「修改决策」，否则为「前往决策」，不看 voteState。
- Tab 分为待完成/已完成；DecisionsActivity.java:35 定义 Tab，DecisionsRecyclerAdapter.java:19,47 传 pageType。

## 详情流程
- 点击「决策详情」由 DecisionsRecyclerItemPresenter.java:116-121 打开详情。
- 详情一打开即由 DecisionsDetailActivity.java:69-77,218 调用 fetchSmUserVoteDetailNetData()。
- 详情内无「参与决策」主按钮，按 decisionType 在 DecisionsDetailActivity.java:276-295 显隐。

## 返回与状态
- 返回列表由 DecisionsActivity.java:96-100 的 onRestart→refresh() 刷新。
- 同一 Tab 内按钮文案不会从参与变修改；若在待完成中打开详情再返回，后端 SmUserVoteDetail 可能把业务标成已读、表决中或已表决，刷新后条目进入已完成 Tab，按钮固定为「修改决策」。
- 老安卓是 Tab 静态文案加详情仍调用同一套 SmUserVoteDetail 写状态接口。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited",
  "category": "安卓应用",
  "name": "homeland_android",
  "source_extraction_id": "a321009850004bdba026a83dfb032c3f",
  "version": 1,
  "memory_type": "entities"
}
-->