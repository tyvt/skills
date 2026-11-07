# 所属区域编码转名称修复
苏州市房地产监测V3 的 projectDelivery 模块中 region 字段存储行政区划编码，详情视图已修复为展示可读名称。

## 问题根因
- region 存储行政区划编码（如 320505），详情视图直接展示编码未转名称

## 修复内容
- ProjectDeliveryInfoPanel.vue 新增 regionLabel 计算属性，使用 formatters.provinceFormatter 转换（与 building/project 模块一致）
- regionLabel 在详情视图和编辑表单中统一使用

## 涉及文件与归属
- 涉及文件：ProjectDeliveryInfoPanel.vue、projectDeliveryConstants.js、ProjectDeliveryDetail.vue、index.vue、detail-template.vue、listMixins.js、detailMixins.js、ruoyi.js
- 所属项目：苏州市房地产监测V3
- 来源会话：189a9e5a-b1d3-44f4-a6ab-16d07c1529ef
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_label_fix",
  "source_extraction_id": "fd68f442701b43a49b6d854439887c52",
  "version": 2,
  "memory_type": "entities"
}
-->