# task.vue dataType监听缺oldVal清空候选组
流程节点 `task.vue` 中 `formData.dataType` 监听器缺少 `oldVal` 判断，初次赋值误删 XML 解析出的 `candidateGroups`。

## 问题根因
- `task.vue` 中 `formData.dataType` 监听器缺少 `oldVal` 判断
- 初次赋值（undefined 变 'fixed'）时执行清空逻辑，误删 XML 解析出的 `candidateGroups`
- 导致回显为空且保存写回空模型

## 修复方案
- 监听增加 `oldVal` 判断
- 仅用户切换类型时清空人员字段，初次赋值不触发清空

## 验证与归属
- 验证证据：产品2.0/054.md
- 涉及文件：Process/components/nodePanel/task.vue；Process/common/parseElement.js；Process/common/XForm.vue；Process/index.vue；tool/definition/detail.vue；Process/common/mixinPanel.js；Process/PropertyPanel.vue
- 所属项目：产品2.0；来源会话ID：8e2e88bc-89fe-4391-8ce3-07a15df52e5c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_defect",
  "name": "datatype_listener_clears",
  "source_extraction_id": "e09c5981c68446689aef84245a719298",
  "version": 1,
  "memory_type": "entities"
}
-->