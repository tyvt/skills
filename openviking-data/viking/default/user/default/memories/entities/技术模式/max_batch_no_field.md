# 预售许可批次号字段取数
苏州市房地产监测V3 中 `maxBatchNo` 为预售许可批次号字段，前端只读、系统自动生成。

## 取数与容错
- `/presale/permit/project/list` 返回项挂在 `projectOptions[].raw` 上，`handleProjectChange` 从 raw 带出项目名、行政区划等，`maxBatchNo` 同样从此取
- `maxBatchNo` 为 null/空串时 `batchNo` 置 undefined，输入框显示「系统自动生成」占位符，不显示 NaN
- 用 `String(Number(raw.maxBatchNo) + 1)` 兼容后端返回字符串或数字两种类型

## 提交与回填
- `getForm()` 提交 payload 仍是白名单字段、不包含 `batchNo`
- 详情/审批态由 `/presale/permit/detail` 回填 `batchNo` 并覆盖（`detailCallback` 里 `...data` 在后），查看态展示不受影响
- 界面语义目前是「预售批次」而非「预售许可批次号」

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 涉及文件：src/views/property/bill/components/declarationRecord.vue、src/views/property/declare/components/declarationRecord.vue、permitConstants.js、PermitInfoPanel.vue、permitExtend/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：session_738a2a4d2ad93a91c77adf4b7c511d52；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "max_batch_no_field",
  "source_extraction_id": "2c072e69afdd4a59a3e7709f2e41e121",
  "version": 1,
  "memory_type": "entities"
}
-->