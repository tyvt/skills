# E2E 主管部门账号与录屏策略配置
苏州市房地产监测V3 的 zhi2-web-admin 完成 E2E 主管部门账号配置及录屏策略拆分。

## 改动内容
- 新建 zhi2-web-admin/e2e/.env.e2e，设置 PLAYWRIGHT_ADMIN_USER=6000064、PLAYWRIGHT_ADMIN_PASSWORD=ZS001Aa!
- Playwright 要求 test.use({ video }) 在文件顶层，将分支用例拆到独立文件：company-register.spec.js（全流程 video:'on'）、company-register-branch.spec.js（分支流程 video:'off'）
- 合并脚本 merge-company-register-video.mjs 仅处理全流程录屏；单段时直接处理

## 涉及文件
- zhi2-web-admin/e2e/.env.e2e
- zhi2-web-admin/e2e/register/company-register.spec.js
- zhi2-web-admin/e2e/register/company-register-branch.spec.js
- zhi2-web-admin/e2e/register/company-register-fields.spec.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：4d758900-4805-4397-9af2-573b528c18fa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_admin_setup",
  "source_extraction_id": "81fd5c6810e94dd89c3a540e5bf7f87d",
  "version": 1,
  "memory_type": "entities"
}
-->