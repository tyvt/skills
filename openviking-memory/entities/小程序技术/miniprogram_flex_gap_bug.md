# 微信小程序flex gap不稳致卡片间距失效
苏住房C小程序 flex gap 对组件子元素支持不稳定，base-card 的 margin-top 被清除，卡片上下间距失效，改用 page-block 包裹控制间距。

## 问题现象
- 微信小程序 flex gap 对组件子元素支持不稳定
- base-card 的 margin-top 被清除，卡片上下间距失效

## 根因
- 小程序 flex gap 兼容性问题，对组件化子元素不生效
- 原有 margin-top 被样式清除后无替代间距方案

## 解决方案
- 改用 div.page-block 包裹区块
- 以 .page-block + .page-block { margin-top: 10px }（$uni-spacing-row-base）控制间距

## 验证与归属
- 验证：会话 5ebe7a6f 用户反馈卡片间距失效，改用 page-block 包裹后修复
- 涉及文件：src/pages_owner/company/info/contracts.vue、src/components/commonNew/baseCard.vue、src/pages_owner/house/components/CellCard.vue、src/pages_owner/house/components/ProjectDetail.vue、src/pages_owner/company/info/index.vue、src/pages_owner/community/info/index.vue、src/pages_owner/subdistrict/info/index.vue、src/uni.scss
- 所属项目：苏住房C；来源会话ID：5ebe7a6f-b511-41ff-8030-0bf23da25e31；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_flex_gap_bug",
  "source_extraction_id": "395f446932c540848feb870a30c2925f",
  "version": 1,
  "memory_type": "entities"
}
-->