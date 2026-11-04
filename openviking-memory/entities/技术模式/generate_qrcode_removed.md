# 移除 generateQrCode 接口和扫码上传 UI
`AnnexUpload/index.vue` 移除了扫码上传弹窗和 `showQrCode()` 方法，并删除了 `/file/appendixConfig/generateQrCode` 的 mock。

## 问题
- `AnnexUpload/index.vue` 有扫码上传弹窗和 `showQrCode()` 方法
- `agency-branch-flow.spec.js` 中的 Mock 拦截了 `/file/appendixConfig/generateQrCode`

## 解决方案
- 从 `AnnexUpload/index.vue` 中移除扫码上传弹窗和 `showQrCode()` 方法
- 删除 `agency-branch-flow.spec.js` 中对 `/file/appendixConfig/generateQrCode` 的 Mock 拦截
- 本地组件 `qrCode.vue` 未受影响

## 文件
- `zhi2-web-admin/src/components/AnnexUpload/index.vue`
- `zhi2-web-admin/e2e/institution/agency-branch-flow.spec.js`
- `zhi2-web-admin/e2e/institution/agency-branch-real-api-flow.spec.js`
- `zhi2-web-admin/docs/agencyBranch-menu.md`
- `zhi2-web-admin/package.json`
- `qrCode.vue`

## 验证
- 验证证据: src=苏州市房地产监测V3/236.md
- 会话: bee3c0ee-1c52-49fd-aba5-14405edf6707
- 所属项目: 苏州市房地产监测V3; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "generate_qrcode_removed",
  "source_extraction_id": "5a368dde30334afa99f7154d2f5147cf",
  "version": 2,
  "memory_type": "entities"
}
-->