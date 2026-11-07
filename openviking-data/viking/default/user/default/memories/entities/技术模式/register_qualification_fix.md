# 开发企业注册资质信息选填与提交校验对齐
苏州市房地产监测V3 开发企业注册流程已完成资质选填与提交校验对齐改造。

## 修改内容
- `registerQualification.js`：导出 `isRowFilled`、`isQualificationRowFilled`、`getFilledQualificationRows`
- `buildQualificationListPayload` 只输出有实质内容的行（仅默认资质类型不算已填）
- `strict: false` 时未填资质仍可通过；半填仍走 `validateRow` 拦截
- `Step4Shareholders.vue`：提交前校验改为 `strict: false`（与 Step1 一致）
- `buildSubmitPayload` 仅在 `qualificationList.length > 0` 时带上 `qualificationList`，避免提交空壳对象
- `Step1CompanyInfo.vue` 同步调整

## 涉及文件
- `zhi2-web-admin/src/utils/registerQualification.js`
- `zhi2-web-admin/src/views/register/components/Step4Shareholders.vue`
- `zhi2-web-admin/src/views/register/components/Step1CompanyInfo.vue`
- `zhi2-web-admin/e2e/register/register-qualification-utils.spec.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：dd46f406-845b-41b5-b9da-a02d69c7ec8a
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_qualification_fix",
  "source_extraction_id": "ab3da10e36a44bd0aa5622239b14a9f5",
  "version": 1,
  "memory_type": "entities"
}
-->