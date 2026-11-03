# 流程名 find 因字典映射报错改 label.sync
ConfigDialog.vue 的 flowOptions 映射为 {dictLabel,dictValue} 字典，onFlowChange 用 e.id 查找返回 undefined 致报错。

## 问题根因
- flowOptions 映射为 {dictLabel, dictValue} 字典结构
- onFlowChange 用 e.id 查找流程，但字典无 id 字段，返回 undefined 致报错

## 解决方案
- 移除 onFlowChange 方法
- 改用 zs-select 的 :label.sync 自动同步流程名

## 验证与归属
- 验证：extracted source=cursor session=4659e580-4acf-439b-89b7-52c74726a8d6
- 涉及文件：zs-select.vue、SingleSelect.vue、ConfigDialog.vue
- 来源会话：4659e580-4acf-439b-89b7-52c74726a8d6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_label_sync",
  "source_extraction_id": "51146e819e2648e6a9106f0127108af7",
  "version": 1,
  "memory_type": "entities"
}
-->