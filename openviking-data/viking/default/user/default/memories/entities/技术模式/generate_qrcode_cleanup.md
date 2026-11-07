# generateQrCode 接口及相关逻辑清理
苏州市房地产监测V3 项目按计划完成 `generateQrCode` 接口及相关前端逻辑的清理下线。

## 改动摘要
- `AnnexUpload/index.vue` 移除「扫码上传」弹窗 UI（`el-popover` + `qr-code`）、`qrCode` 组件导入与 `mapState(projectId)`
- 移除 `code`、`tempToken`、`qrCodeUrl` 及 `showQrCode()` 方法，`created` 仅保留 `getList()`
- `agency-branch-flow.spec.js` 删除 `/file/appendixConfig/generateQrCode` 的 Mock 拦截

## 验证与归属
- Mock E2E 全流程 6 条用例全部通过，附件上传、删除、注销校验等流程正常
- 物业模块 `QrCodeDialog` 使用的本地 `qrCode.vue` 组件未改动，与本次接口下线无关
- 涉及文件：`AnnexUpload/index.vue`、`agency-branch-flow.spec.js`、`qrCode.vue`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：bee3c0ee-1c52-49fd-aba5-14405edf6707

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "generate_qrcode_cleanup",
  "source_extraction_id": "e5756bdd8c034e2494a05870d03ebaea",
  "version": 1,
  "memory_type": "entities"
}
-->