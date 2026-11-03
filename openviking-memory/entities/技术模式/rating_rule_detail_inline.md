# 信用评级规则详情页名称与年度字段同行显示
园区物管2.0 中信用评级规则详情页名称与年度字段原未同行显示，提交 a0b68cb32 调整布局实现同行。

## 修复方案
- 调整布局使名称与年度字段同行显示
- 提交 a0b68cb32 合并至 develop/v2.6.2 与 develop/v2.6.2-yulin 分支
- 该分支本地较远程超前 3 提交

## 验证与归属
- 验证：园区物管2.0/045.md
- 涉及文件：zhi2-web-admin/src/views/evaluation/ratingRule/detail.vue、zhi2-web-admin/src/components/detail-template/detail-template.vue、zhi2-web-admin/src/views/evaluation/assessmentPlan/detail.vue
- 所属项目：园区物管2.0；来源会话：450a52c6-5b85-4188-8de8-04fb775f08f1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rating_rule_detail_inline",
  "source_extraction_id": "de8a6947a0e14949a53e7349a4441c17",
  "version": 1,
  "memory_type": "entities"
}
-->