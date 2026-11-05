# personnel_enterprise_only
在 zhi2-web-admin (产品2.0) 中，添加人员的界面 (`personnelRecord`) 仅接受企业用户账号，相关 E2E 用例已修复登录策略。

## 问题背景
- `personnel-record.spec.js` 原使用管理端账号 (`zsbase`) 走新增接口，返回「该操作只支持企业用户」。
- 根因为用例走了管理端账号而非企业账号。

## 解决方案
- 企业侧步骤改用 `loginAsCompany()`（机构登录），审批步骤（08）改用 `loginAsAdmin()`。
- 创建 `e2e/.env.e2e`（已 gitignore）配置账号：企业 `91320506MA1X901519`/`ZS0001Aa!`，管理端 `zsbase`/`ZS001Aa!`。
- 路由策略：企业账号优先走 `toB/personnelRecord`（企业门户页面）。
- 保存按钮兼容「保存」和「保存并提交」两种文案。
- 规范：人员流程的 E2E 测试分离企业登录和管理员登录。

## 验证结果
- 01 企业端登录✅、02 列表查询✅、03 新增从业人员✅（原报错已修复）、04 查看详情✅。
- 05 编辑❌ 后端 500「手机号已存在」（与登录无关，未修复）。

## 涉及文件与来源
- e2e/company/personnel-record.spec.js, e2e/.env.e2e, e2e/fixtures/auth-helpers.js, e2e/company/company-record-change.spec.js, src/views/company/staffManagement/personnelRecord/detail.vue
- 来源会话：81bf4b53-55e2-427c-8ca3-f981d35d881b；所属项目：产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_enterprise_only",
  "source_extraction_id": "cdd213eb2a634e3fb3eece7b8099cf7a",
  "version": 2,
  "memory_type": "entities"
}
-->