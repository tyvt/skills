# Portal Label No Fullwidth Colon
Padrão do portal para remover dois pontos de largura total após rótulos de campos em pop-ups de segundo nível.

## Escopo
- Aplica-se a PropertyPages.vue, InformationPages.vue, BrokerPages.vue, RentalPages.vue, PropertyDetailDialog.vue, RentalDetailDialog.vue, UnifiedLogin.vue, PortalSearch.vue.
- Remove os dois pontos de largura total (全角冒号) após rótulos de campos nesses componentes.

## Exceções
- Mantém dois pontos em formato de documento oficial e textos de consulta; formulário de consulta originalmente não possui dois pontos.

## Verificação
- 验证证据: src=门户/019.md; sessão: 2fd56787-bd18-4625-bb06-d6a35e3562b5
- Arquivos envolvidos: UnifiedLogin.vue, InformationPages.vue, PropertyPages.vue, RentalPages.vue, PortalSearch.vue, RentalDetailDialog.vue, BrokerPages.vue, PropertyDetailDialog.vue.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_label_no_fullwidth_colon",
  "source_extraction_id": "4105b84f13b244b08703cc2876fb44ae",
  "version": 1,
  "memory_type": "entities"
}
-->