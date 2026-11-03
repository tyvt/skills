# getVoteResult 空值覆盖致汇总数据不展示
getDetail() 中 getVoteResult（/ownerCalculationChart）在表决未开始时返回空值，覆盖 getOwnerDecision 的正确 totalWeight、totalHouseholds、totalArea。

## 问题根因
- getVoteResult（/ownerCalculationChart）在表决未开始时返回空值
- 该空值覆盖了 getOwnerDecision 返回的 totalWeight、totalHouseholds、totalArea 汇总数据

## 解决方案
- 去除 getVoteResult 覆盖逻辑，直接采用 getOwnerDecision 数据渲染总权数、总户数、总面积

## 验证与归属
- 验证证据：extracted source=cursor session=5295a51b-35c1-4303-8d3f-09d1c13d31bc
- 涉及文件：zhi1-web-admin/src/views/estate/ownerDecision/detail.vue、api/estate/ownerDecision.js、ownerDecision/components/VoteView.vue、sortDecison/detail.vue、optionDecision/detail.vue
- 所属项目：太仓G；来源会话：5295a51b-35c1-4303-8d3f-09d1c13d31bc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "getvoteresult_override",
  "source_extraction_id": "afc8268d11fc4ff59123fa7eb053001d",
  "version": 1,
  "memory_type": "entities"
}
-->