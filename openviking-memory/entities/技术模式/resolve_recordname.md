# 变更单名称字段统一回退模式
在苏住房G项目 complexChange/detail.vue 中，变更单 add 模式下名称字段需通过 resolveRecordName 四级回退统一取值。
## 问题背景
- 变更单 recordName 仅在保存/提交后由后端回填，add 模式必然为空
- 页面展示区、detailCallback、子表 rangeTable 各自直接读 form.recordName，导致整页空白
- 源数据仅带 complexName（如「财神里小区」），无变更单自身 recordName
## 解决方案
- 编写 resolveRecordName 回退链：recordName → complexName → originalObj.recordName → originalObj.complexName
- 在 add 模式 created 钩子用源数据把 complexName 回填进 recordName
- 展示区(contentInfo 查看态)、detailCallback、子表 prop 全部改为调用 resolveRecordName(this.form)
## 验证与归属
- 验证：会话 81e0c5dc（基线 2a3ef8a）修复前后对比，备案名称正常显示
- 涉及文件：zhi2-web-admin/src/views/property/complexChange/detail.vue
- 所属项目：苏住房G；来源会话ID：81e0c5dc-49f5-4db4-8eef-299f62b77144；代码基线：2a3ef8a
- 与 #941 区别：本条针对变更单 add 模式名称不存在场景，给出带回填时机的四级回退+三处统一调用点

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "resolve_recordname",
  "source_extraction_id": "71cf8ea7ee9642e091216d28eb95e865",
  "version": 1,
  "memory_type": "entities"
}
-->