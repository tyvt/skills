# assetsPublicity 页面 onShow 并行请求三接口
惠山二期H5 中 assetsPublicity/index.vue 在 onShow 时通过 loadData 并行请求 3 个接口查询资产与收费信息。

## 接口清单
- getProjectAssetInfo: GET /benefit/app/operatingAssetManagement/getOperatingAsset/{projectId} 查询小区经营资产信息（公示主体、物业经营用房、停车泊位、广告位、公共区域场地等）
- getProjectAssetChargeStandard: GET /benefit/app/operatingAssetManagement/getChargeStandard/{projectId} 查询车位收费标准（含备注 remark）
- getDict('benefit_pay_type'): GET /system/dictData/listByType/benefit_pay_type 查询结算方式字典用于展示「月付 / 时付」

## 调用位置
- 代码位于 src/pages_benefit/assetsPublicity/index.vue 第 294-298 行 loadData 中

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 涉及文件：src/pages_benefit/assetsPublicity/index.vue、src/api/benefit.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）
- 来源会话ID：b66b1ff3-1bf8-4446-8866-c444e2bc6f43；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "assetspublicity_onshow_apis",
  "source_extraction_id": "079561c593f04c1e850fa705e0d082e1",
  "version": 1,
  "memory_type": "entities"
}
-->