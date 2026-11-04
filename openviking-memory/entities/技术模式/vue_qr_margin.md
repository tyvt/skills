# vue-qr com margin padrão causa espaço excessivo
O zhi2-web-admin do projeto 苏州市房地产监测V3 tinha vue-qr com margin=20 padrão causando espaço em branco em código de 50px.

## 问题
- `vue-qr` usa margin=20 padrão em :size="50" deixando espaço em branco grande
- Container com padding:4px agrava o deslocamento visual
- Afeta WorkCardDialog.vue e InfoCardDialog.vue

## Correção
- Definir :margin="0" e :white-margin="false" no vue-qr
- Remover padding de .work-card__qr-wrap/.info-card__qr-wrap fixando 50×50px com overflow:hidden
- Em falha de scan, margin pode ser 1 para zona quieta

## Arquivos
- presale/cashsale/components/CashsaleDetail.vue, CashsaleInfoPanel.vue
- institution/agencyPersonnel/components/InfoCardDialog.vue, AgencyPersonnelDetail.vue, WorkCardDialog.vue
- institution/record/components/RecordCertificateDialog.vue

## Verificação
- 验证证据: src=苏州市房地产监测V3/142.md
- 所属项目: 苏州市房地产监测V3; sessão: 271fe773-92e0-4ead-a113-8889fcea1743; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_qr_margin",
  "source_extraction_id": "2f6669c1d0ad4e90a1d5ad451cb4d376",
  "version": 1,
  "memory_type": "entities"
}
-->