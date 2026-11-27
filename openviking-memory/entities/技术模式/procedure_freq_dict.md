---
audit_status: valid
last_checked: 2026-11-27T14:49:12+08:00
verdict_note: 泰兴小程序 maintain-detail.vue 含 procedure_frequency/frequencyText/getDictLabel/procedureFrequency，字典转换逻辑属实。
---
# 工序频次字典转显示逻辑
泰兴小程序页面加载调用 `getDict('procedure_frequency')` 获取字典，`frequencyText` 计算属性转换频次显示。
## 实现逻辑
- 页面加载调用 `getDict('procedure_frequency')` 获取字典。
- `frequencyText` 计算属性经 `getDictLabel` 转换 `procedureFrequency`。
## 兼容与回退
- 兼容字段 `frequency`，未匹配时回退原始值。
- 无值显示 `--`。
## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 验证证据：src=泰兴小程序/018.md
- 涉及文件：src/pages_facility/maintain-detail.vue、src/pages_facility/record-detail.vue、src/pages_facility/detail.vue、src/styles/cell.scss、src/components/CardCell/CardCell.vue、src/components/CardCell/CellFulline.vue、src/pages_facility/maintain.vue、src/api/maintenance.js
- 来源会话ID：a8d2449b-d164-43b2-85d3-6742b02d3c70
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "procedure_freq_dict",
  "source_extraction_id": "7d61ff9cb043451387acea9d3a28c31a",
  "version": 1,
  "memory_type": "entities"
}
-->