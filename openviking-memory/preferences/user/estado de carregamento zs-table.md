- `zs-table` deve usar `:loading` cobrindo apenas `.el-table__body-wrapper`, mantendo o cabeçalho sempre visível.
- O antigo `v-loading` usava `MutationObserver` para sincronizar largura/altura com o corpo e realinhar em mudanças de layout; proibido misturar ambas as escritas na mesma tabela para evitar duplo spinner.
- Evidência: src=苏州市房地产监测V3/050.md

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Estado de carregamento zs-table",
  "source_extraction_id": "5a89d476ffe0486290347903c3f03503",
  "version": 1,
  "memory_type": "preferences"
}
-->