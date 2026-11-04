# Remoção de interface generateQrCode e UI de upload por scan
O `AnnexUpload/index.vue` removeu o popup de upload por scan e métodos `showQrCode()`, com mock de `/file/appendixConfig/generateQrCode` excluído.

## Problema
- `AnnexUpload/index.vue` tinha popup de upload por scan e método `showQrCode()`
- Mock em `agency-branch-flow.spec.js` interceptava `/file/appendixConfig/generateQrCode`

## 解决方案
- Remover popup de upload por scan e métodos `showQrCode()` de `AnnexUpload/index.vue`
- Excluir interceptação Mock de `/file/appendixConfig/generateQrCode` em `agency-branch-flow.spec.js`
- Componente local `qrCode.vue` não foi afetado

## Arquivos
- `zhi2-web-admin/src/components/AnnexUpload/index.vue`
- `zhi2-web-admin/e2e/institution/agency-branch-flow.spec.js`
- `zhi2-web-admin/e2e/institution/agency-branch-real-api-flow.spec.js`
- `zhi2-web-admin/docs/agencyBranch-menu.md`
- `zhi2-web-admin/package.json`
- `qrCode.vue`

## Verificação
- 验证证据: src=苏州市房地产监测V3/236.md
- Sessão: bee3c0ee-1c52-49fd-aba5-14405edf6707
- 所属项目: 苏州市房地产监测V3; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "generate_qrcode_removed",
  "source_extraction_id": "5a368dde30334afa99f7154d2f5147cf",
  "version": 2,
  "memory_type": "entities"
}
-->