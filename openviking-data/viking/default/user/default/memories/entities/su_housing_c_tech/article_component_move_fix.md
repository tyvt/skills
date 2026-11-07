# 文章组件分包引用修复
苏住房C小程序因分包组件引用限制报错，已将文章组件抽到主包公共目录。

## 问题根因
- `pages_my/onlineService/index`在`pages_my`分包，引用了`pages_main/news/components/ListIndex`（其他分包组件）
- 微信小程序不允许分包页面直接引用其他分包组件，导致Component not found

## 修复内容
- 将`ListIndex`和`ListDetail`抽到主包公共目录：`src/components/article/ListIndex.vue`、`src/components/article/ListDetail.vue`
- 更新引用路径：`pages_my/onlineService/index.vue`、`pages_my/onlineService/PolicyDetail.vue`、`pages_main/news/index.vue`、`pages_main/news/detail.vue`、`pages_owner/elevator/guideDetail.vue`、`pages_transaction/buyHousePolicy/detail.vue`

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 原`pages_main/news/components/`下两个组件废弃
- 项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：903d152b-dae2-46f3-94af-775912aee86f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "article_component_move_fix",
  "source_extraction_id": "dd1e2a6351994e95ac5b5cd35121b3c0",
  "version": 1,
  "memory_type": "entities"
}
-->