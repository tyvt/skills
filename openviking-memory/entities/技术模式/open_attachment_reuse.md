# 开业空附件按配置名复用注册包附件回显
苏州市房地产监测V3租赁开业要件包在为空时，按配置名复用注册要件包附件回显，标记只读来源。

## 问题背景
- 开业要件包（030310）固定展示4项，请求注册要件包（030300）并按配置名称对齐
- 开业项为空且注册同名项有文件时，将注册附件填入开业配置格回显

## 修复要点
- 回显标记 fileSource: '2'（只读不删）
- 提交校验仅验开业包并带 fillFromBusCode: 030300，注册已上传视为必填满足
- 两包配置名称（含空格）须完全一致否则回显为空

## 涉及文件
- LeaseEntryNetworkSections.vue、entryNetwork.js、AgencyEntryNetworkDetail.vue
- leaseEntryNetwork/detail.vue、AppendixPackageSection/index.vue
- appendix-package-helpers.js、AnnexUpload/index.vue、companyRecord.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/080.md
- 所属项目：苏州市房地产监测V3；来源会话：214f8941-3e04-4144-869c-06b35138075d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "open_attachment_reuse",
  "source_extraction_id": "c9ec89c294bb40ec83fcfcf2a273efec",
  "version": 1,
  "memory_type": "entities"
}
-->