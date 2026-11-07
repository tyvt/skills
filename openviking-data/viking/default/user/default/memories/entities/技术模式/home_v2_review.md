
# 首页 V2 代码审查发现（苏住房G）
苏住房G 项目 zhi2-web-admin 分支 develop/v2.6.2-suzhufang-home 首页 V2 相关代码审查结果。

## 审查范围
- 分支 develop/v2.6.2-suzhufang-home 相对 merge-base 的首页 V2 相关 .vue/.js，并包含工作区未提交改动（横向滚动、SectionCard.bodyScrollX、RegionTabs 等）。

## CRITICAL 级
- 未发现 v-html、响应性解构等 CRITICAL 级 Vue 问题。

## HIGH 级问题
- TodoPanel.vue:109-116：待办 tab 列表不足 4 条时用 DEMO_ROW 补满，文案像真实业务数据，用户可能误读；StudyPanel 有 is-placeholder，TodoPanel 无对应区分；建议空位用骨架/灰块占位或加 is-placeholder 样式且标题改为「暂无」类文案，与 StudyPanel 一致。
- index-v2.vue:274-291：学习园地切换 tab 无请求序号，慢响应可覆盖新 tab 数据。

## 涉及文件
- src/views/home/v2/components/TodoPanel.vue
- src/views/home/index-v2.vue
- src/views/home/preview-main.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话ID：22db11e4-4ebb-4504-8a6e-e93aa9791182；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_v2_review",
  "source_extraction_id": "35152ab6f89644c1b5de7b32d547e962",
  "version": 1,
  "memory_type": "entities"
}
-->