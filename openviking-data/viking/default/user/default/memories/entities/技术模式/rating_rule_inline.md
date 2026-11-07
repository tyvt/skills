# 信用评级规则详情名称与年度同行显示修复
园区物管2.0 中信用评级规则详情页将名称与年度字段调整为同一行显示，已从 develop/v2.6.1 提交并逐级合并。

## 问题根因
- 信用评级规则详情页名称与年度字段原未同行显示，布局需调整

## 修复要点
- 在 ratingRule/detail.vue 与 detail-template.vue 中调整布局使名称与年度字段同行
- 涉及 assessmentPlan/detail.vue 等相关详情页布局

## 分支与提交
- develop/v2.6.1：a0b68cb32 fix 信用评级规则详情页名称与年度字段同行显示
- develop/v2.6.2：ff9437094 merge 合并 develop/v2.6.1 修复
- develop/v2.6.2-yulin：8d059f2be merge 合并 develop/v2.6.2 修复
- 当前在 develop/v2.6.2-yulin 分支，本地超前远程 3 个提交

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 来源会话：450a52c6-5b85-4188-8de8-04fb775f08f1
- 涉及文件：evaluation/ratingRule/detail.vue、components/detail-template/detail-template.vue、evaluation/assessmentPlan/detail.vue
- 所属项目：园区物管2.0；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rating_rule_inline",
  "source_extraction_id": "600bbd713be74331893f24e8b2d0a727",
  "version": 1,
  "memory_type": "entities"
}
-->