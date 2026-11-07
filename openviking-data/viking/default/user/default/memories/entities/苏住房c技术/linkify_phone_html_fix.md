# 电话号转链接HTML跳过修复
`utils/index.js` 的 `linkifyPhoneNumbersInHtml` 因切分逻辑缺陷导致整段 HTML 未被转换，已改为标签级切分。
## 问题根因
- 原函数按 `<a>` 切分 HTML，并以正则 `/^</` 判断跳过标签，因正文以 `<p` 开头命中跳过规则，导致整段 HTML 被略过、电话号未转换
## 解决方案
- 改为正则 `/(<[^>]*>)/g` 切分纯文本片段，仅跳过 `<a>` 标签内文本，同时保留标签属性中的数字（如 width 等）
## 验证与归属
- 涉及文件：src/utils/index.js、components/ZsRichText/ZsRichText.vue、pages_main/automaticRobot/index.vue、pages/index/home.vue、components/HomeRobotFloater/HomeRobotFloater.vue、utils/openAutomaticRobot.js、小程序报错问题汇总.md、package.json
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 1ee54692-8a12-4edb-825c-181f617f22db；验证证据 苏住房C/023.md

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "linkify_phone_html_fix",
  "source_extraction_id": "eda857c276dd4b41a6be633cb004b45e",
  "version": 1,
  "memory_type": "entities"
}
-->