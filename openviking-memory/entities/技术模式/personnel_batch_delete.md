# 从业人员管理批量删除修复
苏州市房地产监测V3 修复两处列表页批量删除按钮逻辑，改用 mixin 的 multiDeleteButton。

## 改动内容
- toB/personnelRecord/components/index.vue（开发企业端）operationButtons 改用 this.multiDeleteButton。
- company/staffManagement/components/index.vue（管理端）同步修改。
- 未勾选时置灰：multiDeleteButton 自带 disabled: this.selection.length === 0。
- 勾选后删除正常：listeners: { click: this.handleDelete } 回退到 this.ids，修复 personnelRecordId 读取错误。
- 行内删除单行逻辑未改动。

## 涉及文件
- zhi2-web-admin/src/views/toB/personnelRecord/components/index.vue
- zhi2-web-admin/src/views/company/staffManagement/components/index.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：46f44839-514d-49c6-b6e2-858af0e1b263；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_batch_delete",
  "source_extraction_id": "9fd334bb627245ef84af5e82730e7532",
  "version": 1,
  "memory_type": "entities"
}
-->