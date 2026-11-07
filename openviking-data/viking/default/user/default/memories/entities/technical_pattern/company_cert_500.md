# 企业证书companyAdd通Update报500
苏州市房地产监测V3 中 E2E 验证企业证书 companyAdd 成功但 companyUpdate 编辑阶段响应 500，需排查后端接口逻辑。

## 验证事实
- E2E 脚本 `e2e/company/personnel-record.spec.js` 验证 `POST /company/personnelCertificate/companyAdd` 返回 200 并生成证书 ID `2097273270178066434` 关联从业人员 `2097273232483856385`
- `POST /company/personnelCertificate/companyUpdate` 编辑阶段响应 500 服务器异常

## 待办与归属
- 需排查后端接口逻辑修复 companyUpdate 的 500 异常
- 验证证据：src=苏州市房地产监测V3-leftover/112.md
- 涉及文件：e2e/company/personnel-record.spec.js、certificatesDialog.vue、package.json、playwright.config.js 等
- 所属项目：苏州市房地产监测V3；来源会话：084280e9-5e64-4d3d-b430-7c85282061df；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "company_cert_500",
  "source_extraction_id": "708b39ed40c847009c995dd6200f64ae",
  "version": 2,
  "memory_type": "entities"
}
-->
