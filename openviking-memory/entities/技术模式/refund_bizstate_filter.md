# 资金返还列表业务状态筛选补全
惠山G 项目 zhi1-web-admin 中资金返还（refund）列表页筛选区新增「业务状态」下拉，改动与同项目其他列表页一致。

## 筛选与查询
- 在「通知书状态」后新增 `bizState` 下拉，选项来自已有字典 `BIZ_STATE`（`bizStateOptions`）
- `queryParams` 新增 `bizState: undefined`，查询时随其他条件一并传给列表接口
- 清空筛选使用「重置」按钮，刷新页面后选择业务状态并点击查询即可按状态筛选

## 注意事项
- 未在 `bizStateOptions` 中追加「全部」项，因该数组同时用于表格 `dict-tag` 展示，避免影响列表显示
- 实现方式与同项目其他列表页（如开户申请 openacc）保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=惠山G
- 涉及文件：repairFunds/refund/index.vue、refund/detail.vue、repairFunds/accountTubereason/openacc/index.vue
- 所属项目：惠山G；来源会话：f806d7db-8f65-4a74-aef3-7fe7b1fc2de5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_bizstate_filter",
  "source_extraction_id": "f6174fe7b1f44ced861b7268243dc86a",
  "version": 1,
  "memory_type": "entities"
}
-->