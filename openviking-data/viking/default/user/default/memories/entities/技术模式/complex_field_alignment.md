# 物业管理区域备案变更字段对齐
园区小区备案将「住宅性质」改为「项目类型」projectType 并新增多项字段、变更单对齐与历史字段兼容的改造约定。
## 字段改造
- 「住宅性质」改为「项目类型」projectType，字典 complex_project_type（1=住宅，2=非住宅）。
- 新增备案名称、推广名称、法定名称、宗地号 landPlotCode、备案说明 remark 等字段。
- 开发建设单位/联系人/电话与备案说明设为必填。
## 变更与兼容
- 变更单 complexChange/detail 字段顺序与校验与备案页一致，contentInfo 带 field 映射以支持变更前后高亮。
- 从备案发起变更时兼容旧字段 complexPromotionName → promotionName。
- 关联只读页（授权、公示查询等）需同步展示项。
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/property/complex/detail.vue、complexChange/detail.vue、complexBuildingAuth/detail.vue、building/complexSearch/detail.vue、publicQuery/complex/detail.vue、property/complex/components/enums.js
- 所属项目：园区公共收益；来源会话：7729383f-55e8-4db5-9f02-f68fec1e625f；代码基线：191094f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_field_alignment",
  "source_extraction_id": "7305906246884e7399822169329ad226",
  "version": 1,
  "memory_type": "entities"
}
-->