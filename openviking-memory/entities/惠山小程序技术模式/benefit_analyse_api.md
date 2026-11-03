# 收支分析页请求analyse接口
收支分析页 benefitAnalysis.vue 通过 GET /v2.0/benefit/app/accountStatistics/analyse 获取收支数据。

## 接口与参数
- 请求接口：GET /v2.0/benefit/app/accountStatistics/analyse
- 参数 regulatoryAccount 来自 store 的 benefitInfo
- 参数 year 指定统计年份

## 涉及文件
- d:/repository/惠山小程序/src/pages_benefit/benefit/benefitAnalysis.vue
- d:/repository/惠山小程序/src/pages_ownerCard/ownerCard/benefitDetail.vue
- d:/repository/惠山小程序/src/stores/repair.js
- d:/repository/惠山小程序/src/api/modules/repair.js
- d:/repository/惠山小程序/src/pages_benefit/benefit/index.vue
- d:/repository/惠山小程序/src/pages_ownerCard/ownerCard/index.vue

## 验证与归属
- 验证证据：extracted source=cursor session=c7143803-1e07-4d31-a2d8-bc520a5c601e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "benefit_analyse_api",
  "source_extraction_id": "506c6443b4d24c358b82c5a05e60bdc8",
  "version": 1,
  "memory_type": "entities"
}
-->