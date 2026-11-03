# BPMN 设计器点空白/保存清空「指定人员」的三层根因
BPMN 流程设计器给用户任务选「指定人员」后，点画布空白或直接保存会清空人员并保存失败，有三层根因。

## 问题根因
- ① 取消选中节点时 PropertyPanel 卸载 task.vue，el-select 卸载时可能触发空值 input，assignee 的 watch 把模型里的指定人员抹掉
- ② XForm.setFieldValue 用 `{ ...formModel, [name]: value }` 整对象替换 formData，触发字段 watch 时序异常，选中值未及时写入模型
- ③ 下拉选项 userId 是字符串而模型解析出的 assignee 可能是数字等类型，类型不一致导致回显为空

## 解决方案
- ① task.vue 在 beforeDestroy 时跳过人员字段同步，且同时写标准 assignee 与 flowable:assignee 两个属性
- ② XForm 用 $set 就地更新字段，禁止整对象替换
- ③ PropertyPanel 对同一节点重复选中不销毁面板
- ④ parseElement.js 把 assignee 统一规范为字符串

## 验证与归属
- 验证：选人→点空白→重新选中节点应保留，保存后用「查看 XML」确认 userTask 节点带 assignee 属性
- 涉及文件：zhi2-web-admin/src/components/Process/components/nodePanel/task.vue、XForm.vue、PropertyPanel.vue、parseElement.js
- 所属项目：产品2.0
- 来源会话ID：9368bed1-6d47-4b7e-aa8e-585db398488b
- 代码基线：2e3ec05

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bpmn_assignee_bug",
  "source_extraction_id": "e3897fa6cf07484a96b884627556c453",
  "version": 1,
  "memory_type": "entities"
}
-->