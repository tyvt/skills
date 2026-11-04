# 卡片地址栏图标无 flex-shrink
在 Su Zhu Fang C 中，houseCard.vue 中的 `.orientation` 图标没有 `flex-shrink: 0`，在窄的两列卡片中被压缩为 0；已添加样式。

## 问题根因
- 在 `houseCard.vue` 的地址栏 flex 布局中，`.orientation` 图标没有 `flex-shrink: 0`
- 在窄的两列卡片中宽度被压缩为 0

## 解决方案
- 为 `.house-card-top-box .orientation` 添加 `flex-shrink: 0` 和尺寸样式
- 应用于 Su Zhao Fang 页面的三个选项卡列表

## 验证
- 验证证据: cursor 会话 61371a3a-6a5f-4dcd-a98f-26224110a6a9
- 涉及文件: houseCard.vue, Project_Suzhufang.vue (多个路径), index/project.vue, utils/index.js, houseSupermarket/index.vue, ZsImage.vue
- 所属项目: Su Zhu Fang C (zhi2-mobile-shimin); baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Su Zhu Fang C",
  "name": "housecard_flex_shrink",
  "source_extraction_id": "eec437de5242407b850f6604b409be7a",
  "version": 1,
  "memory_type": "entities"
}
-->