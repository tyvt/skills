# Pop-up de seleção de cancelamento de instituição deve usar SelectDialog
Na lista de cancelamento de empresa, o uso de `SelectCompanyDialog` causava pop-up em branco; substituiu-se por `SelectDialog.open`.

## Problema
- A página lista «新增» usava `SelectCompanyDialog` resultando em pop-up vazio
- O componente `SelectCompanyDialog` original foi removido

## 解决方案
- Passou a chamar o `SelectDialog.open` genérico, abrindo pop-up de seleção com altura adaptável ao número de linhas de dados

## Arquivos e Verificação
- 涉及文件: `company/companyCancel/index.vue`, `company/companyCancel/components/SelectCompanyDialog.vue`, `components/README.md`, `institution/record/components/RecordCertificateDialog.vue`, `package.json`, `vite.config.js`, `index.html`
- 验证证据: src=苏州市房地产监测V3/082.md
- Sessão: dbc2df17-64c5-4d5a-b8ed-a9c2aaee2dce; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_select_dialog",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 1,
  "memory_type": "entities"
}
-->