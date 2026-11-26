---
audit_status: invalid
last_checked: 2026-11-26T14:39:01+08:00
verdict_note: e2e filechooser 超时「既有环境问题」属测试观察结论，涉及接口无法在代码中定位佐证，无有效现状证据，无法证明有效。
---
# 租赁机构注册 e2e 附件上传 filechooser 超时既有问题
苏州市房地产监测V3 中租赁机构注册 e2e 用例（lease-institution-register-organ-type）失败点为附件上传 filechooser 超时，属既有环境问题。

## 关键事实
- lease-institution-register-organ-type e2e 用例失败点为附件上传 filechooser 超时，用改动前原始文件跑同样失败
- 该用例中新增的两条字段断言在失败前已经通过

## 涉及接口与文件
- /company/institutionRegister/saveAndSubmit（InstitutionRegisterSingleForm.vue）
- /company/companyRecord/entryNetwork/save（AgencyEntryNetworkDetail.vue、AgencyEntryNetworkSections.vue）
- companyRecord.js

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：session_9e585135bd48a4996ce340afc84069d8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_e2e_timeout",
  "source_extraction_id": "b18177727e884bf08b33fa82839cc86b",
  "version": 1,
  "memory_type": "entities"
}
-->