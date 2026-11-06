# Summary
截至2026-11-05，用户确认在8082环境跑完注册入网附件用例：注册单按companyRegisterId拉要件在无busId上传模式下常为空的已知行为已顺带修复；匿名单页注册上传要件通过，企业端入网认证页附件因busId未挂接失败，结论为注册提交带attachmentList但登录后未关联。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】pattern
【标题】注册的时候不需要给附件busId，保存后由后端处理，
【内容】已在 **8082** 上跑完用例，并顺带修了用例逻辑（注册单按 `companyRegisterId` 拉要件在无 `busId` 上传模式下常为空的已知行为）。 ## 执行命令 ```bash cd zhi2-web-admin E2E_BASE_URL=http://localhost:8082 npm run test:e2e:register-entry-network-appendix ``` 当前环境：**8082** 有 Vite 前端；**8081** 未监听。 ## 结果 | 步骤 | 结果 | 说明 | |------|------|------| | 【匿名】单页注册并上传要件 | **通过**（约 2.4min 内完成） | `saveAndSubmit` 成功，`attachmentList` 非空 | | 【企业端】入网认证页附件 | **失败** | 90s 内 `listAppendixPackage`（`busCode=040100`，`busId=companyRecordId`）始终**无已挂接文件** | 失败时页面快照：入网认证页有「附件上传」及配置名（营业执照正本原件、法定代表人身份证原件），但**没有已上传文件**展示，与接口一致。 ## 结论 8082 联调下，**注册提交带了 `attachmentList`，但登录后入网认证页未
【验证证据】extracted source=cursor project=苏州市房地产监测V3
【涉及文件】e2e/company/register-entry-network-appendix-real-api-flow.spec.js ; 涉及文件：d:\repository\苏州市房地产监测V3\zhi2-web-admin、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\views、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\components\AnnexUpload\components\AppendixRequirementCard.vue
【所属项目】苏州市房地产监测V3
【来源会话ID】2026e41e-c4eb-4375-afbb-6894581445bf
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "注册附件busId联调通过",
  "goal": "记录注册附件用例结果",
  "summary": "截至2026-11-05，用户确认在8082环境跑完注册入网附件用例：注册单按companyRegisterId拉要件在无busId上传模式下常为空的已知行为已顺带修复；匿名单页注册上传要件通过，企业端入网认证页附件因busId未挂接失败，结论为注册提交带attachmentList但登录后未关联。",
  "ranges": "7-12",
  "source_extraction_id": "330aa71e016942a688d066d37dc6c289",
  "version": 1,
  "memory_type": "events"
}
-->