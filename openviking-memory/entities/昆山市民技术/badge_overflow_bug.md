# 首页菜单数量角标被遮挡修复
昆山市民小程序首页「业主表决」等菜单项数量角标因 swiper 父容器 overflow:hidden 被裁切，已修复。

## 问题根因
- `uni-badge` 使用 `absolute="rightTop"` 时角标向上偏移约 10px 超出图标区域。
- `swiper` 及父容器默认 `overflow: hidden` 裁切角标上半部分。

## 解决方案
- 为图标增加 `item-icon-wrap` 容器预留 padding 给角标。
- 将 `swiper`、`menu-container` 等容器 `overflow` 设为 `visible`。
- 略微增加 `swiper` 顶部内边距（20rpx → 32rpx）。
- 个人中心页采用相同处理。

## 验证与归属
- 涉及文件：d:/repository/昆山市民/src/pages_home/home.vue、src/pages_home/personal.vue、src/pages.json、node_modules/@dcloudio/uni-ui
- 来源会话ID：2a8a8393-4a19-4102-99ee-abcb1056e854
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "badge_overflow_bug",
  "source_extraction_id": "c3b6be7beffe427a8a4251db85b7ca61",
  "version": 1,
  "memory_type": "entities"
}
-->