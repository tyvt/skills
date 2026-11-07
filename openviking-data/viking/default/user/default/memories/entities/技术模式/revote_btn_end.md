# Revote Btn End Only
重新发起表决按钮原未校验表决状态，致未开始态误显示。

## 约束逻辑
- 增加 decisionState === '3' 且有结果的判断，于 ownerDecision/detail.vue（保留 isMaintainVote）、maintainDecision/detail.vue、sortDecison/detail.vue、generalDecision/detail.vue 控制 showRevote 显隐。

## 验证与归属
- 验证证据：extracted source=cursor session=01a8eeed-a239-440f-a22a-c0d4d152ab18
- 涉及文件：ownerDecision/detail.vue、sortDecison/detail.vue、optionDecision/detail.vue、ownerDecision/index.vue、generalDecision/detail.vue、maintainDecision/detail.vue、router/index.js、sortDecison/index.vue
- 所属项目：太仓G；来源会话：01a8eeed-a239-440f-a22a-c0d4d152ab18；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "revote_btn_end",
  "source_extraction_id": "753a048e5c3947b4b939168968e98562",
  "version": 1,
  "memory_type": "entities"
}
-->