# 首页待办卡片tap穿透与隐藏巡检项
首页待办卡片因 `@click` 及图标遮挡不支持穿透且含多余巡检维保项，需改用 `@tap` 并隐藏。
## 问题根因
- `home/index.vue` 中待办卡片使用 `@click` 且 `pending-icon` 未设 `pointer-events: none`，导致图标遮挡不支持穿透。
- 卡片包含多余的巡检维保项，未达到仅留报事报修的要求。
## 解决方案
- 在 `home/index.vue` 改用 `@tap` 事件，设 `.pending-icon` 为 `pointer-events: none`。
- 卡片仅保留报事报修项，同步在 `issue/index.vue` 恢复待办筛选。
## 验证与归属
- 验证证据：src=物业手持B端/001.md
- 涉及文件：src/pages/home/index.vue、src/api/home.js、src/pages_facility/issue/index.vue、src/pages/workbench/index.vue、docs/handheld-redevelopment-architecture.md、src/pages.json、src/api/property.js、src/components/ZsImage/ZsImage.vue
- 来源会话ID：57ff6f54-c412-4288-ba40-47fedb188050
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_card_tap",
  "source_extraction_id": "a2c76c9bc7b6443e88f1f37573a29346",
  "version": 1,
  "memory_type": "entities"
}
-->