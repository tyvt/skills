# 开业要件包按配置名复用注册包附件回显
苏州市房地产监测V3 租赁开业要件包在为空时按配置名复用注册要件包附件回显，并标记只读来源。

## 问题背景
- 开业要件包（030310）固定展示4项，请求注册要件包（030300）并按配置名称对齐
- 开业项为空且注册同名项有文件时，将注册附件填入开业配置格回显

## 实现要点
- 始终请求开业要件包（4项）与注册包 030300，按配置名称对齐
- 开业项为空且注册同名项有文件时，将注册附件填入开业格子并标记 fileSource:'2'（只读不可改）
- 提交仅校验开业包并携带 fillFromBusCode: 030300，注册已上传视为必填满足
- 两包配置名称（含空格）须完全一致否则回显为空

## 涉及文件
- 页面与组件：`LeaseEntryNetworkSections.vue`、`leaseEntryNetwork/detail.vue`、`AgencyEntryNetworkDetail.vue`、`AppendixPackageSection/index.vue`、`AnnexUpload/index.vue`
- 逻辑与接口：`src/utils/entryNetwork.js`、`e2e/fixtures/appendix-package-helpers.js`、`src/api/company/companyRecord.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/080.md、苏州市房地产监测V3/121.md
- 所属项目：苏州市房地产监测V3；来源会话：214f8941-3e04-4144-869c-06b35138075d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "open_attachment_reuse",
  "source_extraction_id": "5f5198d2b46443abad5d1a01cf1edbb4",
  "version": 2,
  "memory_type": "entities"
}
-->