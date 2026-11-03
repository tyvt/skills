# 统一房屋编码误取房屋编号致显示异常
苏州市房地产监测V3 房屋限制模块 houseLimitConstants.js 误取 houseCode 作统一房屋编码，导致房屋编号优先级高显异常。

## 问题根因
- houseLimitConstants.js 统一房屋编码列误取 houseCode 字段
- 导致房屋编号优先级高显如 3-101_MD001 显示异常

## 修复方案
- 新增 resolveUnifiedHouseCode() 优先取 unified 字段
- limitFormMixin.js 修正回显与保存映射避免脏存

## 涉及文件
- 根因与修复：houseLimitConstants.js、limitFormMixin.js
- 房屋限制模块联动：LimitRecordDetailDialog.vue、limitCancel.vue、HouseSelectDialog.vue
- 其他联动：buildinginfo/detail.vue、house/index.vue、SurveyChangeHouseTable.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/223.md
- 来源会话：07483970-f530-4552-ae4c-66e1d899da34；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_house_code_mismatch",
  "source_extraction_id": "8b8969cc4b26467f9fcb5928d426f082",
  "version": 1,
  "memory_type": "entities"
}
-->