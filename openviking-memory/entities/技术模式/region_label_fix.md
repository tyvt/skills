# 使用省级格式化器修正区域标签
在 Suzhou Real Estate Monitoring V3 中，projectDelivery 中的 region 字段存储代码，详情视图应转换为名称。

## 问题根因
- 在 `supervision/projectDelivery` 中，`region` 存储行政区划代码；详情视图直接显示代码而未转换为名称。

## 解决方案
- `ProjectDeliveryInfoPanel.vue` 添加了计算属性 `regionLabel`，该属性调用 `formatters.provinceFormatter` 进行转换。
- `regionLabel` 统一用于详情和编辑表单中。

## 验证
- 验证证据: src=苏州市房地产监测V3/092.md
- 涉及文件: ProjectDeliveryInfoPanel.vue, projectDeliveryConstants.js, ProjectDeliveryDetail.vue, index.vue, detail-template.vue, listMixins.js, detailMixins.js, ruoyi.js
- 原始会话: 189a9e5a-b1d3-44f4-a6ab-16d07c1529ef; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_label_fix",
  "source_extraction_id": "001ba47e03e9421b8f9ada51bc0b7ab9",
  "version": 1,
  "memory_type": "entities"
}
-->