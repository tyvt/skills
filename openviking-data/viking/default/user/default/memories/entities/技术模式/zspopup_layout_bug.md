# ZsPopup布局致字段错位及标题背景不符
太仓一网通办H5 的 ZsPopup 因 flex 布局导致选项说明字段错位，且标题背景与 C 端决策页不符。

## 问题根因
- ZsPopup 内容区 display: flex 加 align-items: center 令独立子元素对齐异常
- 致字段名错位
- 标题背景使用 bg-dialog.png 与 C 端决策页不符

## 修复方案
- 于 OptionStepChoose.vue 用 .notice-content 包裹字段块并设 width: 100%、text-align: left 统一左对齐
- ZsPopup.vue 标题背景由 bg-dialog.png 改为 /static/images/decision-bg.png 以匹配 C 端决策页

## 验证与归属
- 验证证据：extracted source=cursor session=d3e91bdb-3f55-493c-b752-acb9e3a0a963
- 涉及文件：src/views/decision/components/StepChoose.vue、src/views/decision/ParticipateIn.vue、src/views/decision/common/StepChoose.vue、src/views/decision/DecisionDetail.vue、src/components/ZsPopup/ZsPopup.vue、src/views/owner-decision/components/OptionStepChoose.vue、src/views/owner-decision/ParticipateIn.vue、src/views/decision/components/ConfirmDialog.vue
- 所属项目：太仓一网通办H5；来源会话：d3e91bdb-3f55-493c-b752-acb9e3a0a963；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zspopup_layout_bug",
  "source_extraction_id": "ce2fc0065fb543bc9d68e84262ae7ddf",
  "version": 1,
  "memory_type": "entities"
}
-->