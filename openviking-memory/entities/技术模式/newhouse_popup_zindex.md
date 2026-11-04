# 新房详情弹窗 z-index 低于底栏致遮挡
`bottomBtn.vue` 购房咨询按钮 `z-index` 9999 高于 `detail.vue` 中 `uni-popup` 弹窗的 998，导致弹窗被遮挡。

## 问题根因
- `bottomBtn.vue` 购房咨询按钮 `z-index: 9999`
- `detail.vue` 中 `uni-popup` 弹窗 `z-index: 998`，层级不足被遮挡

## 解决方案
- 在 `detail.vue` 通过 `:deep(.uni-popup) { z-index: 10000 !important; }` 提升弹窗层级

## 验证与归属
- 验证证据：src=cursor session=a8678de5-9bd2-4b68-94a6-efa9178c65de
- 涉及文件：newHouse/detail.vue、commonNew/bottomBtn.vue、stockHouse/detail.vue、bottomBtn.vue、detail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：a8678de5-9bd2-4b68-94a6-efa9178c65de；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "newhouse_popup_zindex",
  "source_extraction_id": "3a59079b73a04c218cfc0817a391dccd",
  "version": 1,
  "memory_type": "entities"
}
-->