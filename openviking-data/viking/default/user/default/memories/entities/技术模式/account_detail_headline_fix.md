# 协议详情页三列布局与 Headline 栅格修复
苏州市房地产监测V3 的 account/detail.vue 已修复因 Headline 样式破坏导致栅格固定两列的问题。

## 问题根因
- account/detail.vue 在 Headline 里多包了一层 el-row，被 Headline/index.vue 的 .collapse-container .el-row 样式覆盖，固定变两列
- 与已验证的三列页面（AgencyBranchDetail、xy/detail.vue）不一致，后者 el-col 直接放在 Headline 下
- 详情态可能未识别：URL 无 formMode=view 时走新增/编辑表单而非 DetailTemplate

## 修复内容
- account/detail.vue 去掉 Headline 内多余的 el-row
- Headline/index.vue 相关样式调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：account/detail.vue、Headline/index.vue、AgencyBranchDetail、xy/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：8a18efb7-69a4-435c-9c80-a15e3577b2b6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_detail_headline_fix",
  "source_extraction_id": "15c5db80af5a4cc68efbfcf5a6974f2c",
  "version": 1,
  "memory_type": "entities"
}
-->