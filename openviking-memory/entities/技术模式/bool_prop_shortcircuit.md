# Vue2布尔prop短路求值告警
B端页面将`a && b`短路结果绑到布尔prop，返回字符串ID触发prop类型警告且禁用态可能不生效。

## 问题根因
- `:disabled="isBTerminal() && currentProjectId"`当两侧为真时返回右侧19位雪花ID字符串而非true
- Vue2/Element的Boolean prop做类型校验，遇非true字符串语义分叉，控件可能仍可编辑
- 同类写法在v-if/:class/纯JS分支无害，仅绑给Boolean prop时暴露

## 解决方案
- 传给Boolean prop的表达式末段一律加`!!`归一，如`return terminalType === 'B' && !!currentProjectId`
- 多个同类禁用条件（详情表单、批量导入弹窗等）一起改，避免只修报错处
- 改后刷新确认警告消失且禁用态视觉真正生效

## 验证与归属
- 验证证据：会话6628d00f用户贴Invalid prop: type check failed for prop "disabled". Expected Boolean, got String "667570210075104"
- 涉及文件：feeDeclare2/components/bulkImportDialog.vue、feeDeclare2/detail.vue、feeDeclare2/index.vue
- 所属项目：苏住房G；来源会话：6628d00f-987f-45b2-80c7-d0bedcc72598；代码基线：69e9d4d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bool_prop_shortcircuit",
  "source_extraction_id": "e32fbf3f2ec94e2394584ddc813a6f8f",
  "version": 1,
  "memory_type": "entities"
}
-->