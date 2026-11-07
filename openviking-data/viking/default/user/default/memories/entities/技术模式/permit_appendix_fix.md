# 预售方案受理详情附件查询修复
苏州市房地产监测V3 中预售方案受理等详情子路由因 busCode 为空导致附件查不到，新增统一解析与显式传参机制。

## 问题根因
- 上次加的 `detail` 监听会在 `form` 每次变化时调 `getList()`，有时 `busCode` 未就绪后端报「业务编码为空」
- 受理等详情子路由的 `meta.busCode` 常为空，仅靠 `AnnexUpload` 从当前路由取码不够

## 修复方案
- `permitConstants.js` 新增 `resolvePermitAppendixBusCode`，按顺序解析：当前路由 `matched` 链 `meta.busCode` → 同级列表菜单 → 企业申请菜单
- `detail.vue` 用 `appendixBusCode` 显式传给 `PermitAppendixPanel`，不再依赖子组件猜路由
- `PermitAppendixPanel` 接收并传入 `bus`，仅 `busId` 和 `bus` 都有值才挂载 `AnnexUpload`；`refreshAppendix` 前校验 `busCode` 非空；`detail` 监听仅在 `projectId`/`presaleP` 变化时触发

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`permitConstants.js`、`detail.vue`、`PermitAppendixPanel.vue`、`PermitPlanPanel.vue`
- 所属项目：苏州市房地产监测V3；来源会话：e5947e2b-177c-437d-beee-e32448d7d98d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_appendix_fix",
  "source_extraction_id": "cef2b075f6c0442896293524a42a0f30",
  "version": 1,
  "memory_type": "entities"
}
-->