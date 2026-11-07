# C端选项说明字段名不对齐与弹窗背景修复
太仓一网通办H5 的 C 端选项表决详情「选项说明」弹窗存在字段名错位和标题背景图不符两处问题，均已修复。

## 字段名不对齐
- 根因：`ZsPopup` 内容区用 `display: flex` + `align-items: center`，「选项名称」与「选项描述」作为独立子元素时短内容居中、长内容左对齐致标签错位
- 修复：在 `OptionStepChoose.vue` 用 `.notice-content` 包裹两个字段块，设 `width: 100%`、`align-self: stretch`、`text-align: left` 统一左对齐

## 弹窗标题背景
- 将 `ZsPopup` 标题背景从金色 `bg-dialog.png` 改为 C 端决策模块蓝色背景图 `/static/images/decision-bg.png`
- 与参与决策页背景保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 修改文件：`src/views/owner-decision/components/OptionStepChoose.vue`、`src/components/ZsPopup/ZsPopup.vue`
- 涉及文件：owner-decision/components/OptionStepChoose.vue、components/ZsPopup/ZsPopup.vue、decision/components/StepChoose.vue、decision/ParticipateIn.vue、decision/common/StepChoose.vue、decision/DecisionDetail.vue
- 所属项目：太仓一网通办H5；来源会话：d3e91bdb-3f55-493c-b752-acb9e3a0a963；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_notice_bug",
  "source_extraction_id": "422ff77c57eb4bd69b30a82abb41573c",
  "version": 1,
  "memory_type": "entities"
}
-->