# Filtro de apêndice de procurador por tipo de admin oculta área
No 苏州市房地产监测V3, `companyAdmin/detail.vue` passa `admin-type` a `AppendixPackageSection`; quando `adminType !== '1'`, `appendixHandleConfig` filtra itens de apêndice e pode esvaziar `fileList`.

## Causa raiz
- `companyAdmin/detail.vue` transmite `admin-type` para `AppendixPackageSection`
- Quando `adminType !== '1'`, `appendixHandleConfig` chama `isTrusteeOnlyAppendixConfig` de `src/utils/registerAppendixAdminType.js`
- O filtro casa nomes com `授权委托书|授权书|受托人*身份证`
- Se a API retorna só «授权委托书», após filtro `fileList` fica vazio: é lógica de filtro (em `registerAppendixAdminType.js:16-19`), não anomalia de renderização; a área de anexos não aparece

## Solução
- Garantir que a área de anexos seja exibida mesmo quando o filtro reduz a um item de procurador

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3/252.md
- Arquivos: companyAdmin/detail.vue, AppendixPackageSection/index.vue, AnnexUpload/index.vue, DeveloperEntryNetworkAdminDetail.vue, src/utils/appendix.js, src/utils/registerAppendixAdminType.js, src/api/company/companyRegister.js
- Projeto: 苏州市房地产监测V3; Sessão: 5be31fea-c6b7-4f9d-b928-c2eb49a504a0; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "trustee_appendix_hide",
  "source_extraction_id": "bc24b503fbae49f6a34aceca79c91074",
  "version": 2,
  "memory_type": "entities"
}
-->