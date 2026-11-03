# 首页 uni-badge 角标被 swiper overflow 裁切
昆山市民首页与个人中心菜单 uni-badge 因父级 overflow:hidden 被裁切，需调整包裹与容器样式。

## 问题背景
- 首页/个人中心菜单 `uni-badge` 使用 `absolute="rightTop"` 时角标上移约 10px，超出图标盒。
- 父级 `swiper`、`menu-container` 默认 `overflow: hidden` 会裁切角标上半部。

## 解决方案
- 图标外包 `item-icon-wrap` 预留 `padding-top`/`padding-right`。
- 相关容器 `overflow: visible`；略增 swiper 顶部内边距（如 20rpx→32rpx）。
- `pages_home/home.vue` 与 `personal.vue` 需同步修改。

## 验证与归属
- 验证：会话 2a8a8393 截图「数量图标被遮挡」，结论指向 badge 定位与 swiper 裁切。
- 涉及文件：src/pages_home/home.vue、src/pages_home/personal.vue。
- 所属项目：昆山市民；代码基线：38d1482；来源会话ID：2a8a8393-4a19-4102-99ee-abcb1056e854。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "badge_swiper_bug",
  "source_extraction_id": "a9d0b2ccfd0f4c0fac517d664707e5c5",
  "version": 1,
  "memory_type": "entities"
}
-->