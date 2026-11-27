---
audit_status: valid
last_checked: 2026-11-27T15:11:07+08:00
verdict_note: listAppendixPackage 后端接口、busCode 040100、sample.png(e2e asset)均存在，E2E 文件服务共享陷阱的核心实体属实
---
- 在 Playwright E2E 测试中，`sample.png` (`zhi2-web-admin/e2e/assets/test-files/sample.png`) 通过 `register-helpers.js` 中的 `uploadAllAppendixItems` 在没有 `busId` 的情况下被匿名上传；如果本地与 E2E 的文件服务被共享，后端 `listAppendixPackage` 会根据 `busCode: '040100'` 返回历史附件，且页面错误地显示了 `sample.png`。应隔离环境或清理测试数据。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->