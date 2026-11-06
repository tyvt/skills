# 监管弹窗项目参数缺失修复
苏州市房地产监测V3 中修复 `regulatorDialog.vue`（保函+用款）请求缺少项目参数导致 `getRegProjectByProId` 异常的问题。

## 根因
- `regulatorDialog.vue` 请求时未写入 `projectId`、`regulatorProjectId`、`useMoneyApplyType`，导致监管项目查询异常

## 弹窗修复内容
- 新增 `useMoneyApplyType` prop 由父表单传入；抽取 `buildQueryParams()` 每次请求前写入 `projectId`、`regulatorProjectId`、`useMoneyApplyType`
- `handleQuery()` 改为调用 `getList()` 避免搜索时丢失参数；`resetQuery()` 重置后调用 `handleQuery()`
- 打开弹窗无 `projectId` 时提示「请先选择项目名称」并中止请求；删除无用 `userMoneyApplyType` 拼写错误字段

## 父页面改动
- `guarantee/detail.vue`、`changedetail.vue`、`usemoney/detail.vue` 向 `regulatorDialog` 传入 `:use-money-apply-type="form.useMoneyApplyType"`
- `setProject` 使用 `row.projectId ?? row.id` 兼容接口字段；切换项目时显式清空监管项目、保函相关字段
- 移除 `resetFields()` 避免把刚选的 `project` 清空

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`regulatorDialog.vue`、`guarantee/detail.vue`、`changedetail.vue`、`usemoney/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：44c8588d-291f-4d97-ae02-6e6896d8ed9c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulator_dialog_project_fix",
  "source_extraction_id": "6b2829c917c749e4b68d277d60842f1c",
  "version": 1,
  "memory_type": "entities"
}
-->