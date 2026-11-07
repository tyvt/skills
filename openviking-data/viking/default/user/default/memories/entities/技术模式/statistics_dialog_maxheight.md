# StatisticsDialog 限制视口高度
在 zhi2-web-admin（产品 2.0）中，StatisticsDialog.vue 因 zs-dialog 缺少高度限制而撑爆视口。

## 问题
- zs-dialog 根据内容自动计算高度；多个数据块导致 StatisticsDialog.vue 撑爆视口

## 解决方案
- 在组件中定义 max-height: 88vh
- 内容区域 .dialog-box 设置 overflow-y: auto
- 固定的标题栏确保关闭按钮可见

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：fe6a9c71-d8dc-4321-9d4d-34e4729e5e46
- 涉及文件: property/complex/detail.vue, property/complex/components/StatisticsDialog.vue, building/complexSearch/components/buildDialog.vue, property/complexMeterRecord/detail.vue, components/zs-dialog/zs-dialog.vue, property/complexService/detail.vue, property/subdistrict/components/SubdistrictDialog.vue
- 验证证据: src=产品2.0/074.md; 会话 fe6a9c71-d8dc-4321-9d4d-34e4729e5e46; base none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "statistics_dialog_maxheight",
  "source_extraction_id": "0edb7cc648894aa9871156f6c2fe3d68",
  "version": 1,
  "memory_type": "entities"
}
-->