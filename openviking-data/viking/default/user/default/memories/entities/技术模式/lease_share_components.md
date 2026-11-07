# 租赁申请与合同备案共用子表组件
公共收益模块中资产/广告位/公共场地租赁申请与经营资产/经营资源合同备案复用同一套 `assetLeaseApply/components/` 子表，而非各写一套。

## 复用组件
- `houseTable.vue`（资产）、`subAdvertiseTable.vue`（广告位）、`subVenueTable.vue`（公共场地）
- 页面通过 `applyType` / `contractType`（及 mixin 的 `isRevenueContractFiling`、`isAssetsContractFiling`）切换 API 与主键

## 枚举约定
- `enum.js` 的 `LEASE_TYPE` 约定 RENT=0、ADVERT=1、AREA=2、OTHER=4
- 合同列表侧如 `resourcesLeaseContractFiling` 路由 `AdvSpaceLeaseContractFiling` 时 `contractTypes: '1'`

## 注意区分
- `pubVenue/components/venueTable.vue` 标题同为「公共区域场所」，用于 `pubVenue/detail.vue`，与租赁申请子表不是同一套

## 验证与归属
- 验证证据：探索会话给出功能与文件对照表，申请与备案详情均指向同一套 components，并区分 pubVenue 独立 venueTable
- 涉及文件：zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue、subAdvertiseTable.vue、subVenueTable.vue、enum.js、resourcesLeaseContractFiling/index.vue、pubVenue/components/venueTable.vue
- 所属项目：园区公共收益；来源会话：8c34dd29-a37a-42bf-abc9-ce33995ece5a；代码基线：36a9a7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_share_components",
  "source_extraction_id": "05eb26b7a0194582af009060b1946206",
  "version": 1,
  "memory_type": "entities"
}
-->