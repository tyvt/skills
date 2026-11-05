# 首页窄屏两栏网格重叠修复
门户首页在窄屏下因两栏网格使用 minmax(280px,1fr) 且侧栏 z-index 问题，导致右侧栏覆盖主内容，需改网格与断点。

## 问题根因
- 窄屏时两栏网格用了 `minmax(280px, 1fr)` / `minmax(320px, 1fr)`，右侧列不能继续变窄，左侧主区被压窄。
- 网格子项默认 `overflow: visible`，右侧栏（DOM 在后）会画在主内容上面，看起来层级错乱、侧栏盖住流程图。

## 修改方案
- 在 `HomeLayoutSidebar.vue` 与 `HomeLayoutAdmin.vue` 中，第二列改为 `minmax(0, 1fr)`，两列按比例收缩。
- ≤1280px 改为单列，主内容在上、侧栏在下，不再并排挤压。
- 主区 `z-index: 1`、侧栏 `z-index: 0`，并加 `overflow: hidden`，即便偶发溢出也不会盖住主区。
- 存量房 / 住房租赁 在窄屏下改为纵向排列，避免横向挤在一起。

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：`HomeLayoutSidebar.vue`、`HomeLayoutAdmin.vue`、`index-new.vue` 等
- 来源会话ID：94f6bd16-5aae-45b8-9e02-e7fe99ee07bc
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_narrow_grid_overlap",
  "source_extraction_id": "e97aa4d6101849998a56240336a9ee93",
  "version": 1,
  "memory_type": "entities"
}
-->