# 授权弹窗operatorAuthId
园区公共收益操作人员管理详情里行内「授权」弹窗拉取物业管理区域时，bindSource/page 必须用 operatorAuthId 而非 operatorId。

## 问题根因
- 授权弹窗请求 `/company/operatorAuthRange/bindSource/page`，筛选主键是 `operatorAuthId`（与 `operatorAuthRangeTable.vue` 一致）。
- 若在 `operatorTable.vue` 的 `handleAuth` 里把 `filterParams` 写成 `operatorId`，请求可能 200 但列表为空或行为异常。

## 解决方案
- 修复：`filterParams: { companyRecordId, operatorAuthId: row.operatorAuthId }`。
- 联调时在网络面板核对 query/body；若列表接口未返回 `operatorAuthId`（首次授权），需后端补字段或先调 `/company/operatorAuth/authorize` 初始化授权记录。

## 验证与归属
- 验证会话：92e02400（用户反馈授权选不到物业管理区域、未传 operatorAuthId；改为 operatorAuthId 并与 operatorAuthRangeTable 对齐）
- 涉及文件：zhi2-web-admin/src/views/company/userManagement/operator/operatorTable.vue、zhi2-web-admin/src/views/company/userManagement/operatorAuth/operatorAuthRangeTable.vue
- 所属项目：园区公共收益；代码基线：0c9b8c2；来源会话：92e02400-281a-4942-997e-0a53b4d14822

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "授权弹窗operatorAuthId",
  "source_extraction_id": "1e816f9fc3aa4168b1160713b0d4dc9c",
  "version": 1,
  "memory_type": "entities"
}
-->