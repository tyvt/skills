- Evitar definir 'businessName' como prop e simultaneamente como propriedade computada em OperationBtnGroup, pois dispara aviso do Vue; usar nova propriedade computada 'effectivePermissionPrefix' fornecida ao botão :permission para evitar conflito.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Nomenclatura de prop e computed Vue",
  "source_extraction_id": "19524133521643418bfe9ac26320305a",
  "version": 1,
  "memory_type": "preferences"
}
-->