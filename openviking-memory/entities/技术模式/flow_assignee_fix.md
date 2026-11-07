# 流程定义指定人员点击空白清除修复
产品2.0 项目修复流程定义中选中指定人员后，点击画布空白导致人员被清空的问题。

## 问题原因
- 点击画布空白销毁属性面板，取消选中节点时 PropertyPanel 卸载任务配置组件
- el-select 卸载时触发空值 input，assignee 的 watch 把 BPMN 模型里的指定人员清掉
- XForm 的 setFieldValue 用整对象替换更新 formData，造成人员字段 watch 时序异常
- 人员 ID 类型不一致：下拉选项 userId 是字符串，模型里 assignee 可能是其他类型致回显为空

## 修复内容
- task.vue：组件销毁时跳过人员字段同步；同时写入标准 assignee 和 flowable:assignee
- XForm.vue：用 $set 就地更新字段，不再替换整个对象
- PropertyPanel.vue：同一节点重复选中时不销毁面板
- parseElement.js：将 assignee 统一规范为字符串

## 涉及文件与来源
- 文件：task.vue、XForm.vue、PropertyPanel.vue、parseElement.js
- 所属项目：产品2.0；来源会话：9368bed1-6d47-4b7e-aa8e-585db398488b

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_assignee_fix",
  "source_extraction_id": "ffd3dd5456804c4ea536ebe90a7ba6e5",
  "version": 1,
  "memory_type": "entities"
}
-->
