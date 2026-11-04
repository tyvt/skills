# 决策主题因字段名映射错误未显示
太仓一网通办H5 的 DetailTopCard 决策主题区域空白，因 vote.js 将接口 decisionTitle 误映射为 themName。

## 问题根因
- DetailTopCard 组件绑定 detail.subject 显示决策主题
- vote.js 的 fetchSelectView 将接口返回 decisionTitle 错写成 themName，导致 subject 为空

## 修复方案
- 将 themName 改为 subject，与 DetailTopCard 绑定字段一致
- 若仍为空可清除本地缓存，vote store 开启 localStorage 持久化可能保留旧数据

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/store/vote.js、src/views/decision/components/StepChoose.vue、src/views/decision/components/DetailTopCard.vue、src/views/decision/ParticipateIn.vue、src/views/decision/common/StepChoose.vue
- 所属项目：太仓一网通办H5；来源会话：1a726d2d-e3c2-47d0-addd-7f758f3f2707；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_subject_bug",
  "source_extraction_id": "b620b21275c34065997323fd9392c72d",
  "version": 1,
  "memory_type": "entities"
}
-->