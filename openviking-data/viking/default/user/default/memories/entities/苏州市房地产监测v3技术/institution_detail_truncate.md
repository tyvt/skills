# 机构注册详情页内容截断修复
苏州市房地产监测V3 的 institutionRegister/detail.vue 因 Headline 区块直接置于 .detail-container 下导致内容裁切，需包裹滚动容器。

## 问题根因
- institutionRegister/detail.vue 四个 Headline 区块直接置于 .detail-container 下
- 缺少滚动容器致内容被裁切，与其他详情页结构不一致

## 修复方案
- 将区块包裹进 .detail-from-container 滚动容器
- 对齐其他详情页的结构布局

## 涉及文件
- src/views/company/institutionRegister/detail.vue
- src/views/zljg/institutionRegister/detail.vue
- src/components/CompanyOrganProvider/index.vue
- src/styles/index.scss

## 验证与归属
- 验证证据：extracted source=workbuddy session=cdc32b79-3b70-462e-be5f-487ebd59e555
- 所属项目：苏州市房地产监测V3（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "institution_detail_truncate",
  "source_extraction_id": "e48180d462ec477a8cff68759c2854c7",
  "version": 1,
  "memory_type": "entities"
}
-->