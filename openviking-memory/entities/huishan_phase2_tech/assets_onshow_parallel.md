# 资产公示页onShow并行请求3接口
惠山二期H5 的 assetsPublicity/index.vue 在 onShow 并行请求 3 接口，根因系请求置于展示钩子导致重复调用。

## 问题根因
- assetsPublicity/index.vue 于 onShow 通过 loadData 并行请求 getProjectAssetInfo 等 3 接口
- 请求置于展示钩子导致重复调用

## 解决方案
- 将该初始化请求移至 onLoad 以避免冗余

## 验证与归属
- 验证：extracted source=cursor session=b66b1ff3-1bf8-4446-8866-c444e2bc6f43
- 涉及文件：src/pages_benefit/assetsPublicity/index.vue、src/api/benefit.js、src/pages_property/serviceStandard/index.vue、src/pages_owner/company/charges/index.vue、src/api/common.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：b66b1ff3-1bf8-4446-8866-c444e2bc6f43；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "assets_onshow_parallel",
  "source_extraction_id": "8c4a40e76b8e480d92d361435c8d6a78",
  "version": 1,
  "memory_type": "entities"
}
-->