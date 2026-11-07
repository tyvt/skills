# AgencyPersonnelList.vue 中的冗余名称过滤器
在项目苏州市房地产监测V3的G模块中，组件AgencyPersonnelList.vue存在重复的名称字段，已被移除。

## 问题
- formItems 和 queryParams 冗余地配置了«人员姓名» (name) 和 «从业人员姓名» (keyWord)
- 两个名称字段在列表筛选中造成了歧义

## 修正
- 从 formItems 中移除了«人员姓名»筛选项，并从 queryParams 中移除了 name 参数
- 在 agency-personnel-real-api-flow.spec.js 中添加了 E2E 断言以确保仅使用 keyWord 标签

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：c1779a4f-3141-425a-bf33-25bd2342d93d
- 验证证据: src=苏州市房地产监测V3/178.md
- 涉及文件: AgencyPersonnelList.vue, agency-personnel-real-api-flow.spec.js, LeasePersonnelList.vue, AgencyBranchList.vue, index.vue
- 会话: c1779a4f-3141-425a-bf33-25bd2342d93d; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_name_redundancy",
  "source_extraction_id": "637076c2ee6643d5b35f55f28e70f356",
  "version": 1,
  "memory_type": "entities"
}
-->