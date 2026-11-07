# 批量删除改mixin按钮回退ids防误读
苏州市房地产监测V3中personnelRecord与company/staffManagement的批量删除按钮改用mixin的multiDeleteButton，避免personnelRecordId读取错误。

## 关键逻辑
- personnelRecord/components/index.vue 与 company/staffManagement/components/index.vue 将 operationButtons 改为 mixin 的 this.multiDeleteButton
- 内置 disabled: this.selection.length === 0 实现未勾选置灰
- 通过 listeners: { click: this.handleDelete } 回退 this.ids 避免 personnelRecordId 读取错误

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/160.md
- 涉及文件：personnelRecord/index.vue、personnelRecord/components/index.vue、company/staffManagement/components/index.vue、mixins/listMixins.js、mixins/table.js
- 所属项目：苏州市房地产监测V3；来源会话：46f44839-514d-49c6-b6e2-858af0e1b263；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "multidelete_button_mixin",
  "source_extraction_id": "a80b2fd6890746ea80eb4641c8c2c4f9",
  "version": 1,
  "memory_type": "entities"
}
-->