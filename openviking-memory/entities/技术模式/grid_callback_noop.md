# Callback padrão null vinculado a Card dispara aviso de checagem de tipo
No projeto Suzhou Real Estate Monitoring V3 (zhi2-web-admin), em caminho somente-leitura o `AppendixPackageSection` usa `AppendixRequirementGrid.vue` sem passar callbacks, e o padrão null vinculado a `AppendixRequirementCard` dispara aviso "Expected Function got Null".

## 问题根因
- `AppendixPackageSection` usa `AppendixRequirementGrid.vue` sem passar callbacks em modo somente-leitura
- O valor padrão null era vinculado a `AppendixRequirementCard`, disparando aviso de tipo

## 解决方案
- Adicionados `appendixUploadNoop` e `appendixBeforeUploadNoop` (retorna true) em `AppendixRequirementGrid.vue`
- Valores padrão de `onBeforeUpload`/`onUploadError`/`onExceed`/`onUploadSuccess` alterados para noop
- Em estado de edição o `AnnexUpload` continua passando handlers reais

## Verificação e arquivos
- 验证证据: src=苏州市房地产监测V3-leftover/085.md
- 涉及文件: AppendixRequirementCard.vue, DeveloperBasicInfoDetail.vue, AppendixRequirementGrid.vue, AppendixPackageSection/index.vue, AnnexUpload/index.vue
- 所属项目: Suzhou Real Estate Monitoring V3; sessão: fe17d399-463d-45e5-9c19-4d7ebc506fcd; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "grid_callback_noop",
  "source_extraction_id": "0ec9de86592745d2954137491ac6674b",
  "version": 1,
  "memory_type": "entities"
}
-->