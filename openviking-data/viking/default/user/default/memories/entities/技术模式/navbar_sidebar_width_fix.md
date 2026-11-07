# 导航栏左侧边栏宽度计算修复
产品2.0 项目修复顶栏菜单项可见数量计算错误及半截菜单仍可点击的问题。

## 问题根因
- 可见数量按 `.top-nav-container` 全宽计算，其中包含 276px 左侧留白，导致多算 1～2 个菜单项
- `.nav-items-scroll` 使用 `overflow-x: auto`，被裁切的菜单项仍可见、可点击

## 主要改动
- 改为用 `.top-nav` 的实际宽度计算，并为「更多功能」固定预留 180px
- 菜单区改为 `overflow: hidden`，不再出现半截菜单
- 增加 `ResizeObserver`，右侧区域宽度变化时重新计算可见菜单项

## 涉及文件
- `zhi2-web-admin/src/layout/components/Navbar.vue`
- `zhi2-web-admin/src/layout/index.vue`
- `zhi2-web-admin/src/layout/components/Sidebar/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：97dd3a0f-1563-44f7-9957-aea69e5270ca；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_sidebar_width_fix",
  "source_extraction_id": "026f3a346695401ebf51e73dd9b49605",
  "version": 1,
  "memory_type": "entities"
}
-->