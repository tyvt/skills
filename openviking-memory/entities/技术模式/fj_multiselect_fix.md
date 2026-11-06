# 附件类型可见授权回显异常修复
苏州市房地产监测V3 修复 `FjDialog.vue` 中「附件类型可见授权」多选回显只显示小圆点的问题。

## 问题原因
- `FjDialog.vue` 该字段用 `zs-select` 多选，`rolesOptions` 的 `dictValue` 是数字类型 `roleId`
- 选中后组件转成逗号分隔字符串（如 `"5"`），回显 `split` 得字符串数组 `["5"]`，但 `el-option` 的 `value` 仍是数字 `5`，严格相等失败，标签不显示
- `SingleSelect` 已有宽松比较，但 `MultiSelect` 之前没有

## 修复方案
- 在 `MultiSelect.vue` 增加与 `SingleSelect` 一致的值归一化逻辑：`normalizeValue`/`normalizeValues` 用 `==` 对齐类型，`updateLabel` 匹配改宽松比较

## 验证与归属
- 刷新后重新打开「附件配置」弹窗，选择「主管部门(区县)」等选项应正常显示完整标签文字
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`FjDialog.vue`、`MultiSelect.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：1d07b68a-e698-45f6-9e9f-254270fb8c4c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fj_multiselect_fix",
  "source_extraction_id": "79f8ae00a108477b8779e22490c3122c",
  "version": 1,
  "memory_type": "entities"
}
-->