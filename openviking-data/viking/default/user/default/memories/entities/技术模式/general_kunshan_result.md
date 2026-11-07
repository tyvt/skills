# 一般表决结论维护弹窗对齐昆山
太仓G 已按昆山对齐「一般表决 → 表决结论维护」弹窗，主要差异均已修复。

## 修复差异
- NaN%：改用昆山同款 `ownerCalculationChart` 字段计算并加 `|| 0`，无数据显示 `0.00`
- 字段：补「参与权数占比」；「同意占参与户数占比」改为「同意占参与权数占比」；参与/同意占比加民法典提示
- 暂无数据：一般/维修资金表决不再渲染候选人表（仅业委会/监委会选举显示）
- 按钮文案：改为「确认并推送APP」，成功提示与昆山一致

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证：刷新后重新打开「结果维护」核对
- 涉及文件：`decisionCommon/components/MaintainResultDialog.vue`、`MaintainResultDialogLite.vue`、`decisionCommon/config.js`
- 所属项目：太仓G；来源会话：b4e53b8e-164f-4672-9854-192edd804ed5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_kunshan_result",
  "source_extraction_id": "2dd7391766cd43be9516f6aa2465c206",
  "version": 1,
  "memory_type": "entities"
}
-->