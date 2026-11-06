# 预售资金监管选择弹窗统一
苏州市房地产监测V3 中预售资金监管模块的选择弹窗已统一到 `SelectDialog.open`（`supervision/utils/selectDialog`）。

## 核心交付
- 在 `prefund.js` 增加 `openAllotNoticeSelect`、`openUseMoneyApplyRevokeSelect`，并在 `index.js` 导出
- P0–P3 页面/组件补全收口：noticeChange/detail.vue、usemoneyRevoke/detail.vue、guarantee/detail.vue、guarantee/changedetail.vue、deposit/additional、other_record、adjustmentofAccounts、progress 相关弹窗等

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：prefund.js、index.js、多处 detail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：c030d1b1-f5f1-4b79-ae7f-2285cd482609

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prefund_select_dialog",
  "source_extraction_id": "79b5aa53d4d3492ab1e8446e4879e7ca",
  "version": 1,
  "memory_type": "entities"
}
-->