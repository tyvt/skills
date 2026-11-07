# 操作人员授权弹窗查询参数修复（operatorId→operatorAuthId）
园区公共收益项目操作人员管理详情页「授权」弹窗加载不到物业管理区域列表的问题已修复。

## 问题根因
- operatorTable.vue 的 handleAuth 调用 /company/operatorAuthRange/bindSource/page 时传了 operatorId，而该接口需要 operatorAuthId（与用户授权模块 operatorAuthRangeTable.vue 一致）

## 修改内容
- 文件：operatorTable.vue
- 将 filterParams 从 { companyRecordId, operatorId: row.operatorId } 改为 { companyRecordId, operatorAuthId: row.operatorAuthId }

## 验证方式
- 进入操作人员管理详情页，点击某行操作栏「授权」
- 网络面板确认 bindSource/page 请求带 operatorAuthId，弹窗正常加载物业管理区域列表
- 若无数据，检查操作人员列表接口是否返回 operatorAuthId 字段

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：operatorTable.vue、operatorAuthRangeTable.vue、detail.vue
- 所属项目：园区公共收益；来源会话：92e02400-281a-4942-997e-0a53b4d14822；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operator_auth_fix",
  "source_extraction_id": "41ebe72cbac94dce89aa5307c597c661",
  "version": 1,
  "memory_type": "entities"
}
-->