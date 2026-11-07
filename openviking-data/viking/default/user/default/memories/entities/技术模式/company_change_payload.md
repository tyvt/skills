# 开发/经纪机构变更保存参数修复
苏州市房地产监测V3 中修复 `companyRecordChange/add` 请求缺失 `administrativeArea` 的问题，统一使用 `companyBasicInfoShared.js` 的构建函数。

## 问题原因
- `/company/companyRecordChange/add` 要求传 `administrativeArea`，且不要传 `provinceCityArea`（见 `companyRecord.js` 注释）
- 原 `getForm()` 把 `provinceCityArea` 从请求体删掉却未写入 `administrativeArea`
- 开发企业变更页（`DeveloperBasicInfoForm`）只绑定 `provinceCityArea`，导致请求行政区划为空

## 修复方案
- 在 `companyBasicInfoShared.js` 增加 `buildCompanyRecordChangeSavePayload`：用 `administrativeArea || provinceCityArea` 作为 `administrativeArea` 提交，并去掉 `provinceCityArea`
- 已接入 `toB/companyRecord/detail.vue`（开发企业变更申请/详情）与 `companyRecordAgency/change/detail.vue`（经纪/租赁机构变更）

## 验证与归属
- 保存后可在网络面板确认 `add`/`update` 请求体中包含 `administrativeArea`
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`companyRecord.js`、`companyBasicInfoShared.js`、`toB/companyRecord/detail.vue`、`companyRecordAgency/change/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：edb3ac8c-9101-4ea8-871a-f3e115e70ff8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_payload",
  "source_extraction_id": "79f8ae00a108477b8779e22490c3122c",
  "version": 1,
  "memory_type": "entities"
}
-->