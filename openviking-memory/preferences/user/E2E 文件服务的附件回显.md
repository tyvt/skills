- `sample.png` 是 `zhi2-web-admin/e2e/assets/test-files/` 中的 Playwright E2E 测试文件；`company-register.spec.js` 使用 `uploadAnonymous` 仅带 `busCode: '040100'`（无 `busId`），匿名上传。
- 当本地/E2E 环境共享文件服务时，后端 `listAppendixPackage` 将历史文件插入 `packages[].appendices` 中，导致页面回显；隔离文件服务，或清理 `CompanyRegisterSingleForm` 中由 `initAppendix` 加载的项。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: E2E 文件服务的附件回显",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 1,
  "memory_type": "preferences"
}
-->
