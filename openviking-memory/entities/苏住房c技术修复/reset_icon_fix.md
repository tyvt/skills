# 新房筛选重置图标高度为0修复
苏住房C小程序 conditionScreening.vue 中「重置」图标因 ZsImage 默认撑满且无固定高度导致高度为0不可见，已修复。

## 问题根因
- 「重置」图标使用 ZsImage，组件默认 width:100%、height:100%。
- .footer-btn-left 没有固定高度，导致图标实际渲染高度为0，只看见「重置」文字。

## 修复内容
- 在 conditionScreening.vue 中为图标补充固定尺寸 16×16px（与 reset.svg 一致），并加 margin-bottom:4px。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证路径：新房筛选（区域/面积/均价）确认「重置」上方图标显示。
- 涉及文件：conditionScreening.vue、ZsImage.vue、utils/index.js、pages_transaction/newHouse/index.vue。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：dcb389f5-4d39-4923-958e-bf04219059c1。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "reset_icon_fix",
  "source_extraction_id": "40d24fb84e4e48ed912d6d0221c023e2",
  "version": 1,
  "memory_type": "entities"
}
-->