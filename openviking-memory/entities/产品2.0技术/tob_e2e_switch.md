# ToB 一套 E2E 用登录类型切管理端/企业端
同一份 ToB e2e 用例通过 e2e/.env.e2e 的 PLAYWRIGHT_LOGIN_TYPE 切换管理端与企业管理端，无法两端执行的用例需 test.skip 并单列跳过原因。

## 实现方式
- 用 e2e/.env.e2e 的 PLAYWRIGHT_LOGIN_TYPE（account 管理端 / company 企业端）切换登录夹具，同一 spec 出两套结果
- 不在用例内部写 if 分支以免脚本逻辑耦合
- 因权限差异仅一端可执行的用例（企业端变更保存、审核流程、新增后编辑/查看/删除）在管理端模式 test.skip

## 报告规范
- skipped 用例须在报告单列「跳过原因」，passed 与 skipped 分开报，不计入通过
- 实测管理端模式结果 4 passed / 5 skipped（21.6s）

## 验证与归属
- 来源会话 f5a65df2：模式由 PLAYWRIGHT_LOGIN_TYPE 控制，account 为管理端（默认 zsbase）、company 为企业端全流程
- 给出 01~09 用例通过/跳过矩阵与「4 passed, 5 skipped（21.6s）」
- 涉及文件：e2e/.env.e2e、e2e/fixtures；所属项目：产品2.0；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "tob_e2e_switch",
  "source_extraction_id": "90d1b0f9d9774c0d9a37f9b9cd45eeee",
  "version": 1,
  "memory_type": "entities"
}
-->