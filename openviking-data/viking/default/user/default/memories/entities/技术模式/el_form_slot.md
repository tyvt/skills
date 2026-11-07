# 表单项固定留白容纳校验错误防高度跳动
原 `.el-form-item` 使用 `position: static` 且无预留，校验报错致行高撑高，需在 `variables.css` 定义错误槽位并由 `element-ui.scss` 恢复绝对定位。

## 问题根因
- 原 `.el-form-item` 使用 `position: static` 且无预留，校验报错致行高撑高

## 解决方案
- `variables.css` 定义 `--form-item-error-slot: 20px`
- `element-ui.scss` 中 `.el-form-item` 设 `padding-bottom` 并恢复错误绝对定位
- 搜索区保持 `padding-bottom: 0`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/002.md
- 涉及文件：src/styles/index.scss、src/styles/detail-form.scss、src/styles/element-ui.scss、src/views/presale/cashsale/components/CashsaleDetail.vue、src/styles/variables.css、src/views/presale/cashsale/components/CashsaleInfoPanel.vue、src/views/stock/contract/detail.vue、package.json
- 来源会话ID：b34cefdf-bb09-4582-a539-6c0a8a4fcc9e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_form_slot",
  "source_extraction_id": "f69f45146b4e40659a242782010bccec",
  "version": 1,
  "memory_type": "entities"
}
-->