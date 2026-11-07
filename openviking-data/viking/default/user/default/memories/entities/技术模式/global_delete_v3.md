# 全局删除接口V3对齐
苏州市房地产监测V3 完成全局删除接口排查与修复，统一为直接传 ID 数组、不带键名（走 mixin 默认逻辑）。

## 公共Mixin改动
- `zhi2-web-admin/src/mixins/table.js`：去掉 `deleteType: 'v2'` 及 `{ [paramKey]: ids }` 包装；`deleteRequest` 统一为 `this.$post(url, ids)`

## 监管银行模块
- `superviseBank/detail.vue`：`/prefund/bankBranch/deleteBranchId` 请求体由 `{ bankBranchManageIds: [...] }` 改为 `ids` 数组，并补齐选中校验
- `jgwd/index.vue`：删除自定义 `deleteRequest`，走 mixin 默认逻辑

## 其它删除接口
- `presale/surveyChange/components/List.vue`：移除 `deleteType` / `deleteParamKey`
- `presale/entrustSale/index.vue`、`leaseContractEntry/index.vue`、`leaseContractEntry/detail.vue`：改为直接传 `ids`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：d6bd314a-ae6f-4dd4-8f5c-f5acaa163b6d
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_delete_v3",
  "source_extraction_id": "2fc661addc014e93b50dd3ca11d84086",
  "version": 1,
  "memory_type": "entities"
}
-->