# 房屋质保协议统一使用 companyRecordId
园区物管2.0 房屋质量保证相关页面统一只使用 `companyRecordId`，不再兼容 `companyId`。

## 改造要点
- 移除 `getCompanyRecordId` 兼容方法，不再回退到 `companyId`
- 选择弹窗赋值：`setDeveloperCompany` / `setPropertyCompany` 仅取 `row.companyRecordId`
- 接口数据过滤：`companylist`、`propertyCompanylist` 仅按 `item.companyRecordId` 判断
- 自动带出逻辑：物业合同、区域关联合同均只读取 `companyRecordId`
- 填充方法：`fillDeveloperInfo` / `fillPropertyCompanyInfo` 统一从 `company.companyRecordId` 取值
- 表单提交字段名仍为 `companyId`、`propertyCompanyId`（与后端接口一致），但其值均来源于 `companyRecordId`

## 涉及页面
- maintenance/guaranteeDepositAgreement/detail.vue（房屋质量保证金协议）
- maintenance/initiation/detail.vue
- evaluation/rectificationNotice/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 所属项目：园区物管2.0；来源会话ID：0a8622de-8e91-4ab1-bda2-f07280e64814；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "companyRecordId统一使用",
  "source_extraction_id": "b6f1ddc484254c13960ed58672e6cb01",
  "version": 1,
  "memory_type": "entities"
}
-->