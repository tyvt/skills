# Rótulos de campos de diálogos básicos com largura fixa 162px e valor alinhado à esquerda
Nos diálogos de informações básicas do portal, os rótulos de campo têm largura fixa de 162px e os valores ficam alinhados à esquerda, mantendo o padrão dos diálogos da home.

## Pontos de norma
- Rótulo de campo com largura fixa de 162px
- Valor de campo alinhado à esquerda, cobrindo diálogos da home de informações de pessoas, crédito e detalhes de imóveis
- Ao mudar UI em lote, percorrer os DetailDialogs sob PortalDialogHost (pessoas, crédito, imóveis etc.), evitando consertar só um; diálogos de detalhe de empresa/licença usam spec própria (rótulo alinhado à direita 168px/150px via zs-dialog), não este padrão
- Os demais diálogos da home já estavam alinhados à esquerda, sem necessidade de repetir

## Arquivos e origem
- 涉及文件: PortalDialogHost.vue, PropertyDetailDialog.vue, RentalDetailDialog.vue (em zhi2-web-admin/src/views/home/publicPortal)
- 验证证据: src=门户/052.md
- Sessão de origem: 4bae8daf-b9b1-4788-9e4b-f12564292ebb; base de código: e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_label_162",
  "source_extraction_id": "ad9fab4e29e04bf990aabad89cc7012f",
  "version": 3,
  "memory_type": "entities"
}
-->