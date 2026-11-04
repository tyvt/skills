# 苏住房C含实名与房屋身份两套独立流程
仓库主体为 zhi2-mobile-shimin（uni-app+Vue3+Vite），含实名认证与房屋身份认证两套独立流程。

## 流程划分
- 实名认证逻辑位于 pages_my/verification
- 房屋身份认证位于 pages_owner/authentication

## 关键文件
- src/pages_my/verification/TypeChoose.vue
- src/pages_owner/authentication/TypeChoose.vue
- src/pages_my/verification/FormLocal.vue
- src/pages_my/verification/FormNonLocal.vue
- src/pages_my/verification/FormManual.vue
- src/utils/index.js
- src/pages_my/verification/UnauthorizedPage.vue

## 验证与归属
- 验证：extracted source=cursor session=954ffa8f-ec2a-42e2-9922-79c7c7b82379
- 所属项目：苏住房C/zhi2-mobile-shimin
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "dual_identity_flows",
  "source_extraction_id": "4f9fafcde30a44d79d3bdf239b563b9b",
  "version": 1,
  "memory_type": "entities"
}
-->