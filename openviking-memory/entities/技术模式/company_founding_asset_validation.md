# Company Founding Asset Validation
Padrão técnico para validação de campos obrigatórios em páginas de empresas no projeto 苏住房G.

## Description
- `companyManagement/components/detail.vue` originalmente não tinha regras obrigatórias para `foundingDate` e `registeredAssets`.
- Após adicionar regras em `rules`, passou a exibir asterisco vermelho no modo de edição e validar.
- Módulos de registro, auditoria e histórico de alteração de instituição já possuíam validação.

## Verification and Attribution
- 验证证据: src=苏住房G/037.md
- 涉及文件: company/companyRegister/dialog.vue, table.vue, companyRegister/components/companyInfo.vue, companyRegister/detail.vue, toB/companyRecord/detail.vue, companyManagement/components/detail.vue, publicQuery/propertyCompany/detail.vue, register/components/accountInfo.vue
- 所属项目: 苏住房G; Sessão: b9d18492-03d8-4a9e-b3b7-9057c3686e1c; Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_founding_asset_validation",
  "source_extraction_id": "c6f4b8de214b47529df7b54c7e26ac75",
  "version": 1,
  "memory_type": "entities"
}
-->