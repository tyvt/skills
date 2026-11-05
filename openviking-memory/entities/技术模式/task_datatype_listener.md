# 任务节点候选组回显清空修复
产品2.0 流程配置 task.vue 中 formData.dataType 监听器在初次赋值时误删候选组，导致详情回显为空。

## 问题根因
- created() 将 formData 整份替换为 XML 解析结果，dataType 从 undefined 变为 'fixed' 触发监听器
- 监听器每次触发都删除 flowable:assignee/candidateUsers/candidateGroups 及对应字段
- 刚解析出的候选组被删除，详情再进来看回显为空；保存会把已删模型写回 XML
- formData.userType 用了 if(oldVal) 初次不误删，dataType 段缺少对首次赋值的判断

## 解决方案
- 为 formData.dataType 监听增加 oldVal 判断
- 只在用户真正改过指定方式时清空人员字段

## 验证与归属
- 涉及文件：zhi2-web-admin/src/components/Process/components/nodePanel/task.vue、common/parseElement.js、common/XForm.vue
- 所属项目：产品2.0；来源会话：8e2e88bc-89fe-4391-8ce3-07a15df52e5c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "task_datatype_listener",
  "source_extraction_id": "82270027bd254d6e9e2b58eca3f38ac5",
  "version": 1,
  "memory_type": "entities"
}
-->