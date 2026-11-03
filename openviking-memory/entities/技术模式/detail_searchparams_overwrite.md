# 详情响应整体覆盖 searchParams 引发冗余渲染
苏找房web 核验页 loadEditData() 将详情接口整体响应覆盖至 searchParams，导致冗余字段参与渲染。

## 问题根因
- src/views/verification/index.vue:441 的 loadEditData() 调用 houseInfoDisplayDetailOld()
- 将 response.result 整体覆盖至 this.searchParams 而非按需取值
- 冗余字段参与渲染，引发非预期行为

## 修复方案
- 仅提取 position、purpose 等回显字段赋值给 searchParams
- 不应将整个 response.result 直接覆盖

## 验证与归属
- 涉及文件：src/api/modules/houseInfo.js、src/views/verification/index.vue、PropertyInfoStep.vue、BasicInfoStep.vue、ListingInfoStep.vue、constants.js
- 来源会话：f604cb49-0257-4774-bbdf-e979f4f54972；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_searchparams_overwrite",
  "source_extraction_id": "f667ae03057146ae8933dff0fd05df44",
  "version": 1,
  "memory_type": "entities"
}
-->