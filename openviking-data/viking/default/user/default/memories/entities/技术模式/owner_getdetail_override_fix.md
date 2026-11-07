# 业主表决详情面积权数未显示修复
太仓G端业主表决详情页总权数、总户数、总面积显示为空，根因是 `getVoteResult` 空值覆盖了正确数据，已去除覆盖逻辑修复。

## 问题根因
- `getDetail()` 先从 `getOwnerDecision` 拿到正确的 `totalWeight`、`totalHouseholds`、`totalArea`
- 接着调用 `getVoteResult`（`/ownerCalculationChart`）覆盖这些字段
- 表决未开始时该接口无统计数据、返回空值，把已有数据盖掉导致页面显示为空

## 修复方案
- 去掉 `getVoteResult` 的覆盖逻辑，直接使用 `getOwnerDecision` 返回的数据

## 验证与归属
- 修复后正常显示：总权数 86、总户数 86、总面积 4902.73 ㎡
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：ownerDecision/detail.vue、api/estate/ownerDecision.js、components/VoteView.vue
- 所属项目：太仓G；来源会话：5295a51b-35c1-4303-8d3f-09d1c13d31bc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "owner_getdetail_override_fix",
  "source_extraction_id": "d961989966bf414fa4cdf5a06897d486",
  "version": 1,
  "memory_type": "entities"
}
-->