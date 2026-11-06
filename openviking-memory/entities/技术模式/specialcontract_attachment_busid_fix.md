# 合同网签备案比例变更附件busId修正
苏州市房地产监测V3 中「合同网签备案比例变更」详情因 `OperationBtnGroup` 误用路由防伪码作 `busId`，已改为传入业务主键 `specialContractId`。

## 问题根因
- 详情路由用防伪码 `antiCounterfeitingCode`（URL UUID），而附件接口 `listAppendixPackage` 的 `busId` 应传业务主键 `specialContractId`
- `OperationBtnGroup` 一直用 `getId()`（路由防伪码）作为 `busId`，请求出现 UUID

## 修复方案
- `specialcontract/detail.vue` 给操作栏传入业务主键 `:id="form.specialContractId"`
- `OperationBtnGroup` 新增 `id` prop，用 `attachmentBusId` 作为附件/提交 `busId`
- 页面显式传 `id` 时，在 `specialContractId` 未返回前不再回退到路由防伪码
- 将 `attachmentBusId` 传给 `ZsSubmit` 和附件抽屉的 `AnnexUpload`

## 验证与归属
- 涉及文件：`commercialHousingSales/presale/specialcontract/detail.vue`、`OperationBtnGroup`、路由信息
- 所属项目：苏州市房地产监测V3
- 来源会话ID：00603096-ce00-485a-bc85-12cd53fdaa6b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "specialcontract_attachment_busid_fix",
  "source_extraction_id": "756cd836611b4b25b7366c1b7ae83809",
  "version": 1,
  "memory_type": "entities"
}
-->