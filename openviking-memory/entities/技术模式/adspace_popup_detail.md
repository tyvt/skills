# 小区台账空置广告位弹窗：不跳过备案详情
惠山二期G 项目中，统计地图/小区台账点空置广告位无图，因无 revenueContractId 误跳过备案详情的修复套路。

## 现象
- 统计地图/小区台账点空置广告位无图
- 常见误判：没有 revenueContractId 就不请求备案详情

## 根因
- 空置条目往往只有台账主键（detailId/resourcesId/advertiseSpaceDetailId），备案附件在 GET /benefit/pubAdvertiseSpaceDetail/{id} 的 attachments 里

## 修复方案
- 打开弹窗并行拉台账详情与合同详情：台账失败仍可尝试合同；合同未成功时不要整页切租赁字段导致基础信息全为 -
- 图片侧与经营用房一致：逗号拆 attachments + resolveServerAssetUrl，无附件回退 picUrl 等
- revenueContractResourcesId 同时从列表行与明细 form 取值
- 组件 name 改为 AdvertiseAssetDialog；无合同或合同详情未加载成功时展示基础字段（名称、类别、类型、共享/独有、数量、位置、备注），合同详情加载成功时展示租赁字段（租赁编号、金额、期限等）
- 若接口有数据仍无图，核对列表 resourcesId 是否等于后端 advertiseSpaceDetailId（映射问题需接口补字段）

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证：去掉无 revenueContractId 就不请求的逻辑；用 detailId/resourcesId 调 getPubAdvertiseSpaceDetail；台账与合同分开请求；仅合同成功才切租赁字段
- 涉及文件：benefit/statisticsMap/components/AdvertiseAssetDialog.vue、benefit/statisticsMap/operatingAssets.vue、benefit/statisticsMap/components/ParkingAssetDialog.vue、benefit/statisticsMap/components/VenueAssetDialog.vue、benefit/statisticsMap/components/HouseAssetDialog.vue、benefit/pubAdvertiseSpace/components/advertiseDialog.vue、utils/resolveServerAssetUrl.js、api/benefit/pubAdvertiseSpaceDetail.js
- 所属项目：惠山二期G；来源会话：5a741fb2-5020-4358-a55c-ed838e2739cc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "adspace_popup_detail",
  "source_extraction_id": "8280b5a305984951910eb7df99f705d7",
  "version": 3,
  "memory_type": "entities"
}
-->