# 租赁从业人员 E2E 真实接口流程
苏州市房地产监测V3 的 zhi2-web-admin 已补充租赁从业人员端到端真实接口测试。

## 新增测试
- e2e/zljg/lease-personnel-real-api-flow.spec.js：企业端 init/page/save（校验走 /company/leasePersonnel/**、无 personnelType/photo）、主管端 pageManage；不含工作牌用例
- e2e/fixtures/zljg-menu-config.js：菜单 zljg/agencyPersonnel/index

## 账号与脚本
- 环境变量 PLAYWRIGHT_LEASE_COMPANY_USERNAME / PASSWORD（见 e2e/.env.e2e.example）
- auth-helpers.js 新增 assertLeaseCompanyCredentials、loginAsLeaseCompanyOnce、resetLeaseCompanyLoginCache

## 涉及文件
- zhi2-web-admin/e2e/zljg/lease-personnel-real-api-flow.spec.js
- zhi2-web-admin/e2e/fixtures/zljg-menu-config.js
- zhi2-web-admin/e2e/fixtures/auth-helpers.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：eb6a9251-f5a8-4caf-b277-c011cd96ca50；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_personnel_e2e",
  "source_extraction_id": "11c8801bf8684342866a4b4661e1ae1f",
  "version": 1,
  "memory_type": "entities"
}
-->