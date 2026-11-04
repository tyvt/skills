- Ao submeter `/benefit/pubHouse`, faltava `regionCode` e `subdistrict`/`community` eram convertidos para nomes; o backend precisa do código.
- Em `index.vue` e `detail.vue` adicionou-se `regionCode`; ao selecionar a área de gestão de propriedade atribui-se diretamente o código.
- No lado B (B-end), preenche-se `regionCode` por padrão com `project.region`.
- Arquivos: benefit/pubHouse/index.vue, benefit/pubHouse/components/pubHouseDialog.vue, benefit/pubHouse/detail.vue, benefit/pubVenue/detail.vue, benefit/pubParkingSpace/detail.vue
- Sessão de origem: b86fe772-d48c-4f14-83ed-0fae40ff6861 (extracted source=cursor)

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Preenchimento de regionCode em pubHouse",
  "source_extraction_id": "e2f9b184d03c46b897d5805a40ca2bc8",
  "version": 1,
  "memory_type": "preferences"
}
-->