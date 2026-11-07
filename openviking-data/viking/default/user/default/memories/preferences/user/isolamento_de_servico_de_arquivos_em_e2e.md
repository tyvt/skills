- 在 Playwright E2E 测试中，`sample.png` (`zhi2-web-admin/e2e/assets/test-files/sample.png`) 通过 `register-helpers.js` 中的 `uploadAllAppendixItems` 在没有 `busId` 的情况下被匿名上传；如果本地与 E2E 的文件服务被共享，后端 `listAppendixPackage` 会根据 `busCode: '040100'` 返回历史附件，且页面错误地显示了 `sample.png`。应隔离环境或清理测试数据。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: E2E 中的文件服务隔离",
  "source_extraction_id": "cdba16e1b48b43e19c67c704e7a4b0f6",
  "version": 1,
  "memory_type": "preferences"
}
-->
