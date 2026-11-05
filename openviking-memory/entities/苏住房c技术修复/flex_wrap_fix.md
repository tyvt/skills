# 不动产权号UI错乱修复
苏住房C小程序「不动产权第 X 号」布局错乱，已通过固定两行布局修复。

## 问题根因
- 之前使用 flex-wrap，一行放不下时会把「号」单独挤到下一行，导致 UI 错乱

## 修复内容
- 改为固定两行布局：第一行放「苏 + 年份输入框」，第二行放「苏州市不动产权第 + 编号输入框 + 号」三者同一行
- 示例 placeholder 仍保持 22rpx 小字号

## 涉及文件与归属
- 涉及文件：pages_owner/house/verify.vue、pages_transaction/publishHouse/verification.vue、styles/form2.scss
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：98b2613a-ff87-4511-9692-3d6fb3b49725；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "flex_wrap_fix",
  "source_extraction_id": "26b67095e6d743bd8590c67953d37172",
  "version": 1,
  "memory_type": "entities"
}
-->