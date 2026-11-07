# TagsView 更多下拉 z-index 收敛
淮安物管 TagsView「更多」下拉 z-index 高于弹窗遮罩导致边线浮于遮罩上的修复约定。

## 现象
- 打开带遮罩的 Dialog 时，TagsView 右侧「更多」区域左侧 border 浮在遮罩上。

## 根因
- `.more-btn-wrapper`、`.dropdown-menu` 使用 `z-index:3000`，高于 Element UI 遮罩常见 2000 段。

## 做法
- `.tags-view-container` 设 `position:relative` + `z-index:8`（整体低于弹窗层、仍能盖住主内容下拉）。
- `.more-btn-wrapper` 用 21、`.dropdown-menu` 用 22，仅在标签栏内部叠在滚动按钮（10～20）之上。
- 微调容器 z-index 保持在 8～1999，勿再接近弹窗默认段。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验证：会话 a7d237af 遮罩打开时 more 按钮左边线明显压在遮罩上。
- 涉及文件：zhi2-web-admin/src/layout/components/TagsView/index.vue
- 所属项目：淮安物管；来源会话：a7d237af-56e5-49f4-a9d3-51c02c04b0cb；代码基线：0e429b0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tagsview_more_zindex",
  "source_extraction_id": "c5852556bbb845f685ba8e45ddb255f3",
  "version": 1,
  "memory_type": "entities"
}
-->