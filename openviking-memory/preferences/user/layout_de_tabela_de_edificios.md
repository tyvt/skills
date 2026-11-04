- Em `buildingTable/index.vue`, evita `.status` com posição absoluta e `padding-top: 40px` fixo que cobre o cabeçalho ao quebrar linha da legenda; ajusta o layout
- Restringe seletor global `.detail-container:has(> .building-detail)` para `.building-container` a fim de não afetar outras páginas de detalhe
- Executa lint por arquivo único (`npx eslint src/views/projectManagement/buildingTable/index.vue`) para evitar interrupção de varredura total

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de tabela de edifícios",
  "source_extraction_id": "804f3591fe264d2e93c18d6c856df3ec",
  "version": 1,
  "memory_type": "preferences"
}
-->