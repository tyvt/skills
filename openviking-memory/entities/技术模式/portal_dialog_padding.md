# Regra unificada de padding do corpo de diálogos do portal
O `portal.scss` do portal unifica o padding do corpo de `.portal-detail-dialog` e define exceções e regras de deduplicação.

## Regra unificada
- Corpo de `.portal-detail-dialog` unifica padding vertical 24px, horizontal 40px (igual ao form-box)
- Em tela estreita `max-width: 650px` o padding horizontal reduz para 16px
- Diálogos de empresa de locação/crédito já mudaram de 32px para a regra global 40px

## Exceções
- `portal-house-body` (detalhe de imóvel) mantém layout próprio
- `rental-person-body` (foto à direita) mantém layout próprio

## Restrições de deduplicação
- PropertyDetailDialog / RentalDetailDialog devem remover margin e padding vertical duplicados no corpo
- Evitar sobreposição com regra global criando duas camadas de padding

## Arquivos envolvidos
- zhi2-web-admin/src/views/home/publicPortal/portal.scss
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- zhi2-web-admin/src/views/home/components/UnifiedLoginMenuMoreDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PortalDetailHeader.vue
- zhi2-web-admin/package.json
- zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts

## Verificação
- Padding que estava espalhado pelos componentes foi convergido para portal.scss (PropertyDetailDialog, RentalDetailDialog, UnifiedLoginMenuMoreDialog)
- Montagem conferida via PortalDialogHost e assertivas de layout E2E; ESLint sem erros para os arquivos Vue citados
- Evidência: portal/038.md, portal/039.md; Sessões: a4628c5f-d778-4c31-8176-5b38c95b7139

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_padding",
  "source_extraction_id": "dd37fc1ce95e4bc7ac6e21d7160d2ee6",
  "version": 2,
  "memory_type": "entities"
}
-->