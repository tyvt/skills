# 小区信息总面积m²换行排版修复
苏住房C小程序业主端小区信息页因三列等宽grid导致435,872.00 m²被拆成两行。

## 问题根因
- 统计区用三列等宽grid，第三列限制在约1/3宽度内
- 435,872.00 m²放不下被拆成两行

## 修复内容
- 统计行改为flex+space-between，三列按内容自然宽度分布，不再强制等分
- StatisticCard数值加white-space:nowrap，并开启virtualHost避免组件外层挤压宽度
- 去掉面积字符串里多余的空格

## 验证与归属
- 重新编译预览后应显示为单行：435,872.00 m²
- 涉及文件：project/info/index.vue、infoCard.vue、property-detail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：2bd50aeb-5d2b-4b29-b38e-f1aa4ae7ac4c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "project_info_m2_layout_fix",
  "source_extraction_id": "aded602703eb47bab03dc2c6bb2b83c5",
  "version": 1,
  "memory_type": "entities"
}
-->