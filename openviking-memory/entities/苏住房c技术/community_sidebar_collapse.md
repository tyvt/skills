# 社区页分栏布局高度塌陷修复
苏住房C(zhi2-mobile-shimin)小程序中社区页分栏模式下右侧菜单图标和文字不显示，因.sidebar-right高度被误设为0导致。

## 问题根因
- 上次为修复宫格模式滚动，把`.sidebar-right`改成`height: 0`
- 分栏模式是横向flex布局，`flex:1`只控制宽度，高度仍由`height`决定
- `height:0`使右侧`scroll-view`高度塌陷为0，左侧分类正常，右侧菜单不显示

## 修复方案
- `.sidebar-right`恢复为`height: 100%`
- `.service-sidebar`补充`flex-direction: row`和`align-items: stretch`，保证左右两栏高度一致
- 需重新编译后切换到分栏布局验证右侧菜单图标和名称正常显示

## 涉及文件与归属
- 文件：`src/pages/index/community.vue`、`src/pages_tab/components/Community_Suzhufang.vue`等
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：59b4aa3c-d6de-4704-af8a-49711c8611b5；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "community_sidebar_collapse",
  "source_extraction_id": "bf9a9e6490474d3899e2f109c73f11cf",
  "version": 1,
  "memory_type": "entities"
}
-->