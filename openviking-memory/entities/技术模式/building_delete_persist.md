# 已保存现售楼幢删除未调用后端保存接口
苏州市房地产监测V3 现售模块已保存单据删除楼幢时未持久化，需补充回调调用后端保存接口。

## 问题根因
- PresaleBuildingTable.vue 仅 emit('remove') 无回调，致已保存单据（cashsaleRecordId）删除未持久化

## 修复方案
- 新增 onRemoveBuilding 等回调并透传
- CashsaleDetail.vue 实现 removeBuildingsPersist 调用 POST /presale/cashsale/save 后 getDetail() 刷新
- 草稿状态仅更新本地

## 涉及文件
- presale/cashsale/components/CashsaleDetail.vue、CashsaleSelectBuildingDialog.vue
- presale/permit/components/PresaleBuildingSection.vue、PresaleBuildingTable.vue、detail.vue
- presale/entrustSale/components/EntrustBuildingTable.vue
- supervision/projectDelivery/components/ProjectDeliveryDetail.vue
- e2e/fixtures/cashsale-apply-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/107.md
- 所属项目：苏州市房地产监测V3；来源会话：2ac50d8d-bb50-456a-a40f-2c8538421516；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_delete_persist",
  "source_extraction_id": "5e5aaa7ca34747248ba59c37c87fab01",
  "version": 1,
  "memory_type": "entities"
}
-->