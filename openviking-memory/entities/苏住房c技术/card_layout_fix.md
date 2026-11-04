# 双列卡片布局最小宽度溢出修复
`pages_main/publicNotice`等双列卡片因`flex:0 0 48%`配合标题`white-space:nowrap`与图标，最小宽超容器致双列失效。
## 问题根因
- 卡片使用`flex:0 0 48%`固定基宽，标题`white-space:nowrap`不换行且带图标，使内容最小宽超出48%容器
- 双列flex布局在最小宽超出时塌缩为单列
## 解决方案
- `pages_main/publicNotice/index.vue`改用CSS Grid `repeat(2,minmax(0,1fr))`，允许列宽收缩到0
- 标题去除`nowrap`改`word-break:break-all`，并缩小图标尺寸
## 验证与归属
- 验证证据：src=苏住房C/033.md
- 涉及文件：zhi2-mobile-shimin/src/pages_main/publicNotice/index.vue、publicNotice.vue、components/ZsImage/ZsImage.vue、uni.scss、pages_transaction/newHouseCertification/choose.vue、uno.config.ts、pages_guard/guardApply/components/step1.vue、pages_transaction/stockHouse/detail.vue
- 所属项目：苏住房C；来源会话ID：9774c8d1-2b21-4a57-a4db-44c6514d4939；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "card_layout_fix",
  "source_extraction_id": "683afd88640c49c496defff46d02b40e",
  "version": 1,
  "memory_type": "entities"
}
-->