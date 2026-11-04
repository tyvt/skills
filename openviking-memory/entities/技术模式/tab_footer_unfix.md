# Tab 页落款 fixed 定位导致不可见
苏住房C 移动端 Tab 页落款因使用 `fixed` 固定定位脱离文档流，导致在滚动内容中不可见。

## 问题根因
- 落款组件使用 `fixed` 定位脱离文档流
- 各 Tab 页滚动时落款不随内容滚动，用户看不到

## 修复要点
- 去除 `fixed` 定位，使落款回归各 Tab 页滚动内容的最底部
- 落款随页面内容自然排列在末尾

## 涉及文件
- src/components/ZsPageFooter/ZsPageFooter.vue
- src/pages.json
- src/pages/about/AboutUs.vue
- src/pages/index/components/Home_Suzhufang.vue
- src/pages/index/components/Project_Suzhufang.vue
- src/pages/index/home.vue
- src/pages/index/project.vue
- src/pages/index/components/Property_Suzhufang.vue

## 验证与归属
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话：196cd91b-26fc-4830-a88a-879bd91058a1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tab_footer_unfix",
  "source_extraction_id": "b593d87ec37f4a2daf53a37fe760199f",
  "version": 1,
  "memory_type": "entities"
}
-->