# 预售注销列表硬编码路径致跳转错位
苏州市房地产监测V3 中 `permitCancel/index.vue` 硬编码模块路径致跳至预售许可申请详情，改为基于 meta 推导本模块路径。

## 问题根因
- `permitCancel/index.vue` 的 `handleViewPermit` 硬编码 `presale/permit/detail` 与 `presalePermitId` 导致点击跳至申请详情

## 解决方案
- 改为通用 `handleView(row)` 利用路由 `meta.filePath` 推导 `presale/permitCancel/detail` 及主键 `presalePermitCancelId`
- 要件 busCode 由 `resolveCancelAppendixBusCode` 解析
- 移除无效引入 `buildNavigationByFilePath` 与 `PERMIT_APPENDIX_BUS_CODE`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/309.md
- 涉及文件：路由信息.json、permitCancel/index.vue、detail.vue、permitCancelConstants.js、mixins/listMixins.js、utils/ruoyi.js、e2e/presale/presale-cancel-real-api-flow.spec.js 等
- 所属项目：苏州市房地产监测V3；来源会话：ced7c12b-e4ad-4fd7-ab5c-966c08d44923；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_cancel_path",
  "source_extraction_id": "2080a0baaff942c089970729ab9937c9",
  "version": 2,
  "memory_type": "entities"
}
-->