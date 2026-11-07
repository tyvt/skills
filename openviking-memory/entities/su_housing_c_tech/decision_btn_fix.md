# 决策列表参与按钮点击无响应修复
苏住房C小程序决策模块「参与决策」按钮在安卓微信小程序中因使用普通view @tap.stop收不到点击，已改为ZsButton修复。

## 问题根因
- 列表页「参与决策」按钮使用 slot 内普通 `<view @tap.stop>`
- 安卓微信小程序中该写法常收不到点击事件，而卡片主体 @tap 正常
- 选举模块（elect/index.vue）已用 ZsButton + @click.stop 规避，决策列表此前未对齐

## 修复内容
- decision/index.vue：所有操作按钮改为 ZsButton，跳转统一走 goto()，「参与决策/修改决策」直接跳 /pages_vote/decision/needToKnow
- DecisionList.vue：卡片点击改用 goto()，按钮区域增 z-index:2 防遮挡
- decision/detail.vue：底部「参与决策」改用 redirectTo() 工具函数，跳转更稳定

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证路径：个人中心→电子业主卡→投票表决→我的决策，点按钮进须知页，点卡片进详情
- 涉及文件：decision/index.vue、DecisionList.vue、decision/detail.vue、elect/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：365c14a6-d64c-46e7-af26-8a237fa7b8c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_btn_fix",
  "source_extraction_id": "642aa7d9ea214737a67f2ff39ac74aef",
  "version": 1,
  "memory_type": "entities"
}
-->