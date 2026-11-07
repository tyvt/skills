# BPMN候选组/人员回显ID修复模式
苏住房G项目 BPMN 流程设计器与 zs-remote-select 组件在回显候选组/人员时显示 ID 而非名称，需补全标签反查。
## 问题根因
- BPMN userTask 持久化 candidateGroups/candidateUsers 为标识串(roleId/userId)，而非名称
- 属性面板 select 渲染为 zs-remote-select，仅输入关键字才请求选项，回显阶段不按已选 ID 预取 label，退化成 value 当 label
- zs-remote-select 标签只来自当前选项列表或父级 initialOptions，裸数字 ID 不在其中时显示编号
- views/tool/definition/detail.vue 曾注释「不再预加载人员/角色」，打开时无全量 id→name 映射
## 解决方案
- 给 zs-remote-select 增加 resolveDetailUrl(如'/system/role/')与 resolveDataKey prop，新增 resolveMissingLabels() 遍历纯数字无 label 项反查名称合并进 options
- 用 pendingResolve 去重、失败静默；触发点挂 value 变化、initialOptions 变化、用户选择后
- XForm.vue 透传 dic.resolveDetailUrl/resolveDataKey；task.vue 的 roleRemoteDic/userRemoteDic 各配一条
- 非数字表达式(${INITIATOR}、#{approval})必须用数字正则拦截，避免误请求无效地址
- 备选：打开设计器时预拉角色/用户字典以 dic 传入；保留 allowCreate 语义不静默清空未匹配 ID
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：1688d337-3c59-4439-8b61-494a949b35cb
- 验证会话1：1688d337-3c59-4439-8b61-494a949b35cb，结论远程下拉回显未预取 label
- 验证会话2：24929f7a-3693-4ae6-b04b-d0abf802ee41，修复后短暂显示编号随后自动替换为角色名
- 涉及文件：components/Process/components/nodePanel/task.vue、common/XForm.vue、PropertyPanel.vue、common/parseElement.js、views/tool/definition/detail.vue、components/zs-remote-select/index.vue
- 所属项目：苏住房G；代码基线：cb37a39（及 2a3ef8a 部分）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bpmn_candidate_id",
  "source_extraction_id": "71cf8ea7ee9642e091216d28eb95e865",
  "version": 1,
  "memory_type": "entities"
}
-->