# 流程设计器候选组编号显示修复
苏住房G 项目流程设计器用户任务配置中候选组显示角色 ID 而非名称，已通过 zs-remote-select 反查修复。

## 问题现象
- 流程设计器右侧属性面板用户任务配置中，「候选组」显示为编号 (roleId) 而非角色名称 (roleName)。

## 根因
- BPMN 持久化的是角色 ID，远程下拉组件回显时未按已选 ID 预取名称，只能把 value 当 label 展示。
- 相关页面：tool/definition/detail.vue、components/Process/index.vue、PropertyPanel.vue、nodePanel/task.vue。

## 修复方案
- zs-remote-select/index.vue 新增 resolveDetailUrl、resolveDataKey prop 及 resolveMissingLabels() 方法，对已选纯数字 ID 调用 GET 接口反查名称，pendingResolve 去重，失败静默。
- XForm.vue 将 dic.resolveDetailUrl、dic.resolveDataKey 透传给 zs-remote-select。
- task.vue 相应传入参数以修复候选组回显。

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G。
- 来源会话ID：1688d337-3c59-4439-8b61-494a949b35cb（调查）、24929f7a-3693-4ae6-b04b-d0abf802ee41（修复）。
- 涉及文件：src/components/zs-remote-select/index.vue、src/components/Process/common/XForm.vue、src/components/Process/components/nodePanel/task.vue。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_group_fix",
  "source_extraction_id": "f71cdca3fc7f42be8b25a9f5ef75b181",
  "version": 1,
  "memory_type": "entities"
}
-->