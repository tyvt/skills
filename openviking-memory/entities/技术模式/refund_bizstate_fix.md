# 定金退款列表查询与列对齐修复
苏州市房地产监测V3 的「定金退款列表」完成两处修改：查询条件改业务状态、缴款通知书号正常左对齐。

## 修改内容
- 查询条件：「通知书状态」→「业务状态」，文件 `supervision/deposit/refund/index.vue`
- 查询字段 `refundState`→`bizState`，字典 `NOTICE_STATE`→`BIZ_STATE`；列表仍保留两列，仅查询按业务状态过滤
- 「缴款通知书号」左对齐根因：列标题含「缴款」被 `tableColumnMeasure.js` 当成金额列格式化为 `0.00` 右对齐
- 在 `MEASURE_LABEL_EXCLUDE_RE` 增加 `通知书号`，使编号列按普通文本左对齐

## 验证与归属
- 刷新后应见筛选为业务状态、缴款通知书号不再显示 `0.00` 且左对齐；编号为空需核对接口 `payNoticeNo`
- 所属项目：苏州市房地产监测V3；来源会话：6f0a6e3a-9141-46e0-84c9-7466c7b18511
- 涉及文件：`src/views/supervision/deposit/refund/index.vue`、`tableColumnMeasure.js`、`mixins/ListTemplate.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "refund_bizstate_fix",
  "source_extraction_id": "638fb30e6cd94513816c8de2632f1313",
  "version": 1,
  "memory_type": "entities"
}
-->