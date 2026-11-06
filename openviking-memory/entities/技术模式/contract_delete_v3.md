# 销售合同四菜单删除接口V3对齐
苏州市房地产监测V3 项目完成销售合同四菜单删除接口 V3 对齐，走 mixin 默认 v1。

## 列表页改动
- `versionManagement/index.vue`、`template/index.vue`：去掉 `deleteType:'v2'`，走 mixin 默认 v1（裸 ID 数组）
- `contractRevoke/index.vue`：去掉 `deleteType`、`deleteParamKey` 及自定义 `deleteRequest`
- `contractMainInfo` 本身已是 v1，未改

## API 封装
- `contractRequest.js` 中对应删除请求已对齐 V3（默认 v1 裸 ID 数组）

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`versionManagement/index.vue`、`template/index.vue`、`contractRevoke/index.vue`、`contractRequest.js`、`contract-version-helpers.js`、`contract-template-helpers.js`
- 来源会话ID：02493c7b-f06b-483c-88cf-bdc96dade318
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_delete_v3",
  "source_extraction_id": "446d1dc5ce95440aa4c26ec03a483ac8",
  "version": 1,
  "memory_type": "entities"
}
-->