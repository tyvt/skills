# 表单项未预留错误槽位致校验撑高
苏州市房地产监测V3 中全局 `.el-form-item` 未预留错误槽位，校验绝对定位导致行高跳动，已通过预留 padding-bottom 修复。

## 问题根因
- 全局 `.el-form-item` 未预留错误槽位
- 校验信息绝对定位使行高跳动、布局抖动

## 修复方案
- `variables.css` 定义 `--form-item-error-slot: 20px`
- `element-ui.scss` 设 `padding-bottom` 预留并去 `position: static`
- 搜索区与 `detail-form.scss` 局部覆写保持兼容

## 涉及文件
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/styles/detail-form.scss
- zhi2-web-admin/src/styles/element-ui.scss
- zhi2-web-admin/src/styles/variables.css
- zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue
- zhi2-web-admin/src/views/presale/cashsale/components/CashsaleInfoPanel.vue
- zhi2-web-admin/src/views/stock/contract/detail.vue
- zhi2-web-admin/package.json

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/197.md
- 来源会话：b34cefdf-bb09-4582-a539-6c0a8a4fcc9e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_item_error_slot",
  "source_extraction_id": "84a47ab3c126474bb760ae62e5ed52d2",
  "version": 1,
  "memory_type": "entities"
}
-->