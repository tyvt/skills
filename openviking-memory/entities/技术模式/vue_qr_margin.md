# vue-qr 默认 margin 导致过多空白
项目 苏州市房地产监测V3 的 zhi2-web-admin 中的 vue-qr 使用默认 margin=20，导致 50px 的二维码出现空白。

## 问题
- `vue-qr` 在 :size="50" 时使用默认 margin=20，留下很大的空白
- 带有 padding:4px 的容器加剧了视觉偏移
- 影响 WorkCardDialog.vue 和 InfoCardDialog.vue

## 修正
- 在 vue-qr 中设置 :margin="0" 和 :white-margin="false"
- 移除 .work-card__qr-wrap/.info-card__qr-wrap 的 padding，固定为 50×50px 并设置 overflow:hidden
- 如果扫描失败，margin 可以设为 1 作为静区

## 文件
- presale/cashsale/components/CashsaleDetail.vue, CashsaleInfoPanel.vue
- institution/agencyPersonnel/components/InfoCardDialog.vue, AgencyPersonnelDetail.vue, WorkCardDialog.vue
- institution/record/components/RecordCertificateDialog.vue

## 验证
- 验证证据: src=苏州市房地产监测V3/142.md
- 所属项目: 苏州市房地产监测V3; 会话: 271fe773-92e0-4ead-a113-8889fcea1743; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_qr_margin",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 1,
  "memory_type": "entities"
}
-->