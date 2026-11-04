# personnel_enterprise_only
在 zhi2-web-admin (产品2.0) 中，添加人员的界面 (`personnelRecord`) 仅接受企业用户账号。

## 问题背景
- `personnel-record.spec.js` 使用管理员账号 (`zsbase`) 进行添加请求，返回错误提示仅支持企业用户。

## 解决方案
- 企业侧步骤使用 `loginAsCompany()`；审批使用 `loginAsAdmin()`。
- 创建 `e2e/.env.e2e` 以配置测试账号。
- 规范：人员流程的 E2E 测试分离企业登录和管理员登录。

## 涉及文件与来源
- e2e/company/personnel-record.spec.js, e2e/fixtures/auth-helpers.js, e2e/company/company-record-change.spec.js, e2e/toB/company-personnel-flow.spec.js, src/views/company/staffManagement/personnelRecord/detail.vue
- 来源会话：81bf4b53-55e2-427c-8ca3-f981d35d881b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_enterprise_only",
  "source_extraction_id": "5ba2dade06d048a48e78322216a00bde",
  "version": 1,
  "memory_type": "entities"
}
-->