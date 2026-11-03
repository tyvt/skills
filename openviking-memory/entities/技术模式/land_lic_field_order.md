# 不动产权证三页面字段顺序未按标注排列
ProjectStateLandLicPanel.vue 等三页面查看态与表单字段顺序未按图标注排列，需统一调整。

## 问题根因
- ProjectStateLandLicPanel.vue、stateLandLic/detail.vue 与 stateLandLic/changeDetail.vue 的查看态（contentInfo）字段顺序错乱
- 编辑/新增表单字段顺序未按图标注排列

## 解决方案
- 统一调整为：项目名称、不动产权证号、不动产单元号、权利人、共有情况、坐落、规划用途、占地面积、发证单位、发证日期等顺序
- 变更详情页附图、附件名称及变更原因保留末尾

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/100.md
- 涉及文件：certificate/stateLandLic/detail.vue、customerProject/components/certificate/ProjectStateLandLicPanel.vue、certificate/stateLandLic/changeDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：7128e0f4-00dc-4df9-8734-952fe4c706d3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "land_lic_field_order",
  "source_extraction_id": "2136db77eeb545a3bfb5c7faab73e6ab",
  "version": 1,
  "memory_type": "entities"
}
-->