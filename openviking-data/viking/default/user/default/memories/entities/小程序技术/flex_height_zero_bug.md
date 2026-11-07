# 横向flex分栏height:0致右栏塌陷
苏住房C首页href服务区「平铺/分栏」双布局复用同一类名，分栏模式用height:0修滚动致右侧菜单塌陷。

## 问题现象
- 平铺模式无法滚动，将 `.sidebar-right` 改为 `height: 0` 后，切到分栏模式右侧菜单图标和文字全部不显示，左侧分类正常。

## 根因
- 分栏模式为横向 flex 布局（`.service-sidebar` 默认 flex-direction: row），此时 `flex: 1` 只决定宽度，高度仍由显式 height 决定。
- `height: 0` 使右侧 scroll-view 高度被压成 0，overflow 裁掉内容；左侧分类有独立高度来源故正常。
- 同一个类名同时被「纵向平铺」和「横向分栏」两套布局使用。

## 解决方案
- `.sidebar-right` 恢复 `height: 100%`；父级 `.service-sidebar` 显式补 `flex-direction: row` 与 `align-items: stretch`，让左右两栏由弹性拉伸统一高度，右侧 scroll-view 在同一盒高内独立滚动。
- 一个容器被两套布局方向复用时，不要靠 `height: 0` 控制滚动；先固定父级 flex-direction，再让子项 `height: 100%` + `align-items: stretch` 撑满，滚动交给内部 scroll-view。
- 改动后两套布局都要各自复验一遍。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 59b4aa3c 用户先反馈平铺无法滚动，改 height:0 后贴图反馈切换布局不展示菜单图标，恢复 height:100% 并补 flex-direction/align-items 后修复。
- 涉及文件：src/pages/index/community.vue、src/pages/index/components/Community_Suzhufang.vue、src/pages_tab/components/Community_Suzhufang.vue、src/pages.json、src/pages/index/home.vue、src/pages_tab/components/Home_Suzhufang.vue、src/components/AppTabBar/AppTabBar.vue、src/pages/index/property.vue
- 所属项目：苏住房C；来源会话ID：59b4aa3c-d6de-4704-af8a-49711c8611b5；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "flex_height_zero_bug",
  "source_extraction_id": "395f446932c540848feb870a30c2925f",
  "version": 2,
  "memory_type": "entities"
}
-->