# 监管标准详情片区下拉修复
苏州市房地产监测V3 项目中修复监管标准详情「所属区域」片区下拉无值问题。

## 修改文件
- zhi2-web-admin/src/views/supervision/agreement/version/detail.vue

## 修复内容
- 统一 API 引用：@/api/zone/zone.js → @/api/system/zone（与列表页 index.vue 一致）
- 为 listZone 补充分页参数：{ pageSize: 9999, pageNum: 1 }
- 增强响应解析：response.rows || response.data?.records || []

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：ff916423-d72a-4b4e-b8d0-925acbfa29d1
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_detail_area_dropdown_fix",
  "source_extraction_id": "6ae9df91bcf942f9a3361c899633d9bd",
  "version": 1,
  "memory_type": "entities"
}
-->