# 后端响应混用PascalCase致交易项目不显示
维修资金交易详情因后端响应混用PascalCase且storage传参不稳定，需忽略大小写兼容并优先内存缓存。

## 问题根因
- 实际响应混用PascalCase（ProDeal/AccountTransInfos）
- storage传参嵌套对象不稳定

## 解决方案
- utils.js忽略字段大小写并兼容多种proDeal格式
- setTransDetailPayload/getTransDetailPayload内存缓存优先加storage兜底
- transDetail.vue在onLoad/onShow重取规范化detail.proDeal渲染

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：src=无锡市区小程序嵌入H5/011.md
- 涉及文件：src/pages_owner/maintain/transDetail.vue、src/pages_owner/maintain/utils.js、src/api/transaction.js、src/pages_owner/maintain/components/ExpenseList.vue、src/pages_owner/maintain/detail.vue、src/pages_owner/maintain/index.vue、src/pages_owner/maintain/components/TransactionTable.vue、src/hooks/useLocalLoadMore.js
- 来源会话：c1b915a6-9ab8-420f-abd0-e1ca4246a1f9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "pascalcase_transdetail_bug",
  "source_extraction_id": "e41348d9ae7f40a696931618195d7ebc",
  "version": 1,
  "memory_type": "entities"
}
-->