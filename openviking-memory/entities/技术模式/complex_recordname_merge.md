# 物业管理区域名称与备案名称合并为 recordName
园区公共收益项目(zhi2-web-admin)中，complex 系列详情页将「备案名称」与「物业管理区域名称」合并展示为 recordName。

## 字段合并规则
- complex/detail.vue 与 complexChange/detail.vue 合并「备案名称」与「物业管理区域名称」为 recordName，输入同步 complexName
- 移除 complexName 必填校验
- 查看模式合并展示两名称
- detailCallback 与 getForm 兼容同步
- complexChange/detail.vue 变更对比保留 field: 'recordName'
- complex/detail.vue 修复后第一行恢复三列布局

## 涉及文件
- zhi2-web-admin/src/views/property/complex/detail.vue
- zhi2-web-admin/src/views/transaction/complex/detail.vue
- zhi2-web-admin/src/views/property/complexChange/detail.vue
- zhi2-web-admin/src/views/property/complexAdjust/detail.vue
- zhi2-web-admin/src/mixins/detailMixins.js
- zhi2-web-admin/src/mixins/form.js
- zhi2-web-admin/src/views/publicQuery/complex/detail.vue
- zhi2-web-admin/src/views/building/complexSearch/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：0cbe9323-9602-4630-99d3-b3fb037c7d96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_recordname_merge",
  "source_extraction_id": "d29a058ffc4a4d00972767cc35116df4",
  "version": 2,
  "memory_type": "entities"
}
-->