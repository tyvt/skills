# 企业关联 ID 统一 companyRecordId
园区物管2.0 后台涉及物业/开发商/企业关联的字段一律只认 companyRecordId，提交字段名保留 companyId。

## 问题背景
- 列表/弹窗选择返回的行里只有 companyRecordId 是稳定主键，companyId 命名在不同接口间含义漂移。
- 做多候选回退会把错误 ID 带进自动带出逻辑（如选择物业管理区域后物业服务企业信息不回填）。

## 解决方案
- 选择弹窗赋值方法（setDeveloperCompany/setPropertyCompany）只取 row.companyRecordId。
- companylist/propertyCompanylist 过滤只按 item.companyRecordId 判断。
- fillDeveloperInfo/fillPropertyCompanyInfo 从 company.companyRecordId 取值。
- 删除 getCompanyRecordId 之类回退 companyId 的兼容方法，提交时才把值写进 companyId 字段名。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：移除 getCompanyRecordId、赋值/过滤/带出五处统一、提交字段名仍为 companyId/propertyCompanyId。
- 涉及文件：guaranteeDepositAgreement/detail.vue、initiation/detail.vue、apply/detail.vue 等。
- 所属项目：园区物管2.0；来源会话 0a8622de-8e91-4ab1-bda2-f07280e64814；代码基线 7814a0c2a 等。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_record_id",
  "source_extraction_id": "2079698ec51f42c99af5e0a35fcac0da",
  "version": 1,
  "memory_type": "entities"
}
-->