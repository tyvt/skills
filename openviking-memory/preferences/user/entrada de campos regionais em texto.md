- Nas páginas que já usavam `region` (ex.: `pubBankAccountBalance`), mantém `region`; `subdistrict`/`community` permanecem entrada de texto, não alterar para dropdown de código.
- Páginas sem região (ex.: `pubRegAccountChange`) removam o novo `regionCode`; lógica de escrita de `regionCode` na página de detalhe é mantida.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Entrada de campos regionais em texto",
  "source_extraction_id": "dddbe66f1d9f49389bae575d92bc71c9",
  "version": 1,
  "memory_type": "preferences"
}
-->