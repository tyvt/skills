# 新房详情页锚点滚动修复
苏住房C(zhi2-mobile-shimin)修复了新房详情页在微信小程序中因使用H5专用API导致的滚动报错问题。

## 问题原因
- `pages_transaction/newHouse/detail.vue` 的 `setTab` 使用 H5 专用 API `window.scrollTo(...)`，微信小程序无 `window` 对象，报 `Cannot read property 'scrollTo' of undefined`。

## 修复内容
- 改用跨端滚动 API：`uni.createSelectorQuery()` 获取元素位置 + `uni.pageScrollTo()` 滚动（H5 与小程序均可用）。
- 详情区块补上 `md0` class（原先仅有 `ref="md0"`，无法用选择器定位）。
- 周边区块 `md3` 改为 `md6`，与 tab value `"6"` 对应。

## 涉及文件与归属
- 涉及文件：`pages_transaction/newHouse/detail.vue`、`pages_transaction/stockHouse/detail.vue` 等。
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：41a4e64f-0b65-4969-b0c2-d0d6514d2d0c；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_scroll_fix",
  "source_extraction_id": "866134d92a3c4feeab6c08d36b806b01",
  "version": 1,
  "memory_type": "entities"
}
-->