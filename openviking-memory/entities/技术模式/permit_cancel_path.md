# 预售注销列表硬编码路径致跳转错位
苏州市房地产监测V3 中 `permitCancel/index.vue` 硬编码模块路径致跳至预售许可申请详情，改为基于 meta 推导本模块路径。

## 问题根因
- `permitCancel/index.vue` 的 `handleViewPermit` 硬编码模块路径致跳至预售许可申请详情

## 解决方案
- 改为 `handleView(row)` 基于 `meta.filePath` 推导本模块注销详情路径并使用 `presalePermitCancelId`
- 要件 busCode 由 `resolveCancelAppendixBusCode` 解析
- 移除 `buildNavigationByFilePath` 等无效引入

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/109.md
- 涉及文件：路由信息.json、permitCancel/index.vue、detail.vue、permitCancelConstants.js、mixins/listMixins.js、utils/ruoyi.js、e2e/presale/presale-cancel-real-api-flow.spec.js 等
- 所属项目：苏州市房地产监测V3；来源会话：ced7c12b-e4ad-4fd7-ab5c-966c08d44923；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_cancel_path",
  "source_extraction_id": "db8ea7dbd9be4e8bab0f903cf2e33840",
  "version": 1,
  "memory_type": "entities"
}
-->