# 通过对齐标准列表修正 statistics 页面冗余
`statistics/index.vue` 页面已对齐列表标准写法 (`release/index.vue`)，消除了冗余代码。

## 问题
- `statistics/index.vue` 未遵循列表标准，导致冗余数据和手动方法。

## 解决方案
- 采用 `ListTemplate.js` + `listMixins`。
- 移除手动 `getList` 和冗余数据；`operationButtons` 返回空。
- `buttons` 仅保留 `viewButton`；保留 `initDict` 和 `handleView`。

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/views/evaluation/surveyRelease/statistics/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/evaluation/surveyRelease/release/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/ListTemplate.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/table.js
- d:/repository/产品2.0/zhi2-web-admin/src/components/ListOperationButtonContainer/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/evaluation/surveyRelease/release/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/benefit/mobilePreview/components/mobileContainer.vue

## 验证
- cursor 会话 79d8b01e-dd31-4523-9359-f9809fc997bf；代码基线: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：79d8b01e-dd31-4523-9359-f9809fc997bf


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statistics_list_align_fix",
  "source_extraction_id": "6cf12ed8dafc4ab8be54e780e28cb271",
  "version": 1,
  "memory_type": "entities"
}
-->
