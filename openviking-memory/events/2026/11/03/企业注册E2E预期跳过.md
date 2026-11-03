# Summary
2026-11-03，执行 zhi2-web-admin 开发企业注册 7 个 E2E 文件共 24 条用例，23 通过 1 跳过 0 失败；company-register.spec.js 因 saveAndSubmit 返回非 200（后端未就绪）触发 test.skip，属预期跳过而非失败。
# 2026-11-03 (Tuesday) ChatLog:
**user**: 【记忆类型】bug
【标题】saveAndSubmit非200致企业注册E2E跳过
【内容】执行 zhi2-web-admin 开发企业注册 7 个 E2E 文件共 24 条用例，23 通过 1 跳过 0 失败。company-register.spec.js 单页全流程注册因 saveAndSubmit 返回非 200（后端未就绪）触发 test.skip 注明联调原因，属预期跳过而非失败。
【验证证据】src=苏州市房地产监测V3/017.md
【涉及文件】e2e/register/property-register-entry.spec.js ; e2e/register/company-register-extract.spec.js ; e2e/register/company-register-reset.spec.js ; e2e/register/company-register-fields.spec.js
【来源会话ID】b551ec7a-093b-429a-9873-1c1de6cde7f8
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "企业注册E2E预期跳过",
  "goal": "记录E2E测试结果",
  "summary": "2026-11-03，执行 zhi2-web-admin 开发企业注册 7 个 E2E 文件共 24 条用例，23 通过 1 跳过 0 失败；company-register.spec.js 因 saveAndSubmit 返回非 200（后端未就绪）触发 test.skip，属预期跳过而非失败。",
  "ranges": "21-24",
  "source_extraction_id": "fbfff1862e164eeabf03bcd1386ab8d9",
  "version": 1,
  "memory_type": "events"
}
-->