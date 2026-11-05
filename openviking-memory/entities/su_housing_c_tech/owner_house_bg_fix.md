
# 业主房源页背景图条件编译修复
苏住房C `pages_owner/house/index.vue` 中 `.top-empty` 等本地 WXSS 背景图在微信小程序端报错，已改为条件编译写法。

## 问题根因
- 页面两处本地 WXSS 背景图（`.top-empty` 和 `.history-container`）在微信小程序端触发渲染层/网络层报错

## 修复内容
- H5 使用本地路径 `./../static/images/szf/Bg-szf.png`
- 微信小程序使用 CDN 路径 `https://szf.szzfcjj.cn:8888/static/images/szf/Bg-szf.png`
- 两处背景图均已处理，重新编译后不再报错

## 涉及文件与归属
- 涉及文件：`pages_owner/house/index.vue`、`components/ZsImage/ZsImage.vue`、`pages_owner/tenant/index.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：5fbd3e35-025c-45df-996f-22495a68d907
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_house_bg_fix",
  "source_extraction_id": "5f8c87ce4f034a1abdb06f2a7cb79788",
  "version": 1,
  "memory_type": "entities"
}
-->