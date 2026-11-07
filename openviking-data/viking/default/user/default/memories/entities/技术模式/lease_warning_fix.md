# 租赁合同忽略预警勾选修复
苏住房G项目通过新增公共 mixin 统一租赁合同列表页预警合同勾选与忽略逻辑。

## 新增公共 Mixin
- 文件：zhi2-web-admin/src/mixins/leaseContractWarningMixin.js
- 封装 isWarningContract（兼容 1/'1'/true）、isLeaseWarningSelectable、setWarningRowStyle、handleIgnoreWarning（校验+仅提交预警合同ID）

## 修改的 4 个列表页
- 经营用房租赁合同：预警合同 或 待提交（bizState=0）
- 停车泊位租赁管理：预警合同 或 待提交/审核中（0/1）
- 资源租赁合同：预警合同 或 待提交（0）
- 收入合同（旧页）：同上
- 各页统一将勾选列改为 :selectable="(row) => isSelectable(row)" 避免 this 丢失；「忽略预警」按钮在未选中预警合同时禁用

## 验证与归属
- 所属项目：苏住房G；来源会话：1e8e4ca2-26cb-4b86-b061-d23f725e38ef；代码基线：none
- 验证证据：extracted source=cursor project=苏住房G；涉及 zhi2-web-admin/src/mixins/table.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_warning_fix",
  "source_extraction_id": "abdd97970a8a4abf9d8be3872a649e61",
  "version": 1,
  "memory_type": "entities"
}
-->