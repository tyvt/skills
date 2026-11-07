# 合同退款页只读字段栅格占位修复
苏州市房地产监测V3 中合同退款新增/编辑页（`detail.vue`）将只读字段的 `v-show` 从 `el-form-item` 移到 `el-col` 以修正布局错位。

## 问题原因
- 仅查看态展示的字段（通知书/凭证打印标识、次数等）原将 `v-show="isFormDisabled"` 写在 `el-form-item` 上
- `el-col` 仍参与三列栅格导致列占约 1/3 宽度，后续行被挤乱错位

## 修改内容
- 将 4 个字段（通知书打印标识/次数、凭证打印标识/次数）的 `v-show` 移到对应 `el-col`
- 新增/编辑时这些列不再占位，底部字段按三列正常排布

## 涉及文件
- `src/views/supervision/deposit/refund/detail.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：1adcc8b9-6699-41f9-bf0d-ae4e72071c78
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_col_fix",
  "source_extraction_id": "4e19ad089b314ee7a3955a02853db69b",
  "version": 1,
  "memory_type": "entities"
}
-->