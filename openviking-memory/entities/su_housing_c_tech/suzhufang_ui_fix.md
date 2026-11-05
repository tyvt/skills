
# 苏找房列表页两处UI问题修复
苏住房C「苏找房」首页列表左右间距与卡片名称折行问题已修复。

## 修复内容
- Project_Suzhufang.vue 中列表容器 .list-wrap 左右 padding 从 10px 调整为 12px，与新房/二手房列表页一致
- houseCard.vue 中 .house-name 由 -webkit-line-clamp: 2 + word-break: keep-all 改为单行显示+超出省略，避免中文名称提前折行

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：Project_Suzhufang.vue、houseCard.vue、stockHouse/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：bd5fe3c1-7ddd-4ce0-9f21-65bd212a15fb
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "suzhufang_ui_fix",
  "source_extraction_id": "82af7a5679844eb3b2da51f4435a7f0c",
  "version": 1,
  "memory_type": "entities"
}
-->