# Falha de mock de locação ao validar só locador
O mock `matchRentalContract` em rental.js só compara o locador, fazendo a consulta do locatário falhar.

## Descrição
- Em `src/views/home/publicPortal/mock/rental.js`, `matchRentalContract` casa apenas com igualdade total do locador do fixture
- Não compara campos do locatário, então locatário com número de registro correto não encontra o contrato

## Correção necessária
- Estender lógica de correspondência para suportar também consulta por credencial do locatário

## Arquivos envolvidos
- zhi2-web-admin/src/views/home/publicPortal/mock/rental.js (arquivo principal)
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PortalTable.vue

## Relações
- Sessão de origem: a64b0300-ecc7-4dc4-8634-47c21fd95aed

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "rental_mock_lessee_match",
  "source_extraction_id": "b6999fcd9db6402c903ccb96bee9d95d",
  "version": 1,
  "memory_type": "entities"
}
-->