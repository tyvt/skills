# 单位面积成本列宽修复
苏州市房地产监测V3中recordPriceMngSuzhou/detail.vue的「单位面积成本」因lg/xl=16占两格致布局缺失，已改FORM_COL_THREE。

## 问题根因
- recordPriceMngSuzhou/detail.vue中「单位面积成本」使用lg="16"/xl="16"占两格致布局缺失

## 修复方案
- 改为v-bind="FORM_COL_THREE"实现一行三列每字段1/3宽
- 查看模式DETAIL_COL_THREE不变

## 验证与归属
- 涉及文件：presale/surveyChange/components/List.vue、recordPriceMngSuzhou/detail.vue、recordPriceMngContentInfo.js、utils/detailLayout.js
- 来源会话：c17eb850-8da8-45be-8e07-7991bc836b23；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "unit_area_cost_col",
  "source_extraction_id": "48282b6d94f34f6a8a8894ba97586423",
  "version": 1,
  "memory_type": "entities"
}
-->