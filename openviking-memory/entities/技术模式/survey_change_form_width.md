# 测绘变更详情页表单项宽度修复
修复了苏州市房地产监测V3中测绘变更详情页表单项过窄的问题。

## Description
- 现象：测绘变更详情页「基本信息」区域表单项输入框过窄，长标签进一步挤压输入框。
- 根因：「基本信息」在 `basic-appendix-row` 左侧仅占约2/3宽度却用三列布局(`lg=8`)；表单未设 `label-width`，`auto` 下长标签挤压输入框。

## Solution
- 为 `zs-form` 设置 `label-width="180px"`（与预售许可详情页一致）。
- 各字段列宽从 `lg=8`（三列）改为 `lg=12`（两列），参考 `PermitInfoPanel`。
- 同步更新查看模式 `DetailTemplate` 的 `layout` 配置。
- 若仍偏挤可将 `basic-appendix-row` 左右比例从 `2fr/1fr` 调为 `3fr/1fr`。

## Verification
- 验证方式：刷新页面后输入框应正常铺满列宽。
- 涉及文件：zhi2-web-admin/src/views/presale/surveyChange/detail.vue、zhi2-web-admin/src/views/presale/permitCancel/detail.vue。
- 所属项目：苏州市房地产监测V3；来源会话ID：616ab62b-abce-41e4-adb6-2fc6f69616d5。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "survey_change_form_width",
  "source_extraction_id": "23d2035267364d4a8767fdb7aec62216",
  "version": 1,
  "memory_type": "entities"
}
-->