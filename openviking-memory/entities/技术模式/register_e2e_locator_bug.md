# Falha de localização e2e de registro por inconsistência com formulário Step1
Nos testes e2e de registro do sistema de monitoramento imobiliário de Suzhou V3, o `register-helpers.js` tinha localização do Step1 inconsistente com o formulário, causando não encontro de elementos.

## Causa raiz
- `fillStep1` em `register-helpers.js` originalmente localizava o segundo «请输入企业名称» em vez de «请输入联系人», falhando o caso de teste de fluxo completo
- O formulário de qualificação aninhava erroneamente localização por testid causando não encontro de elemento

## Solução
- Alterou-se para localizar por placeholder do contato
- Dentro do scope usou-se diretamente `input[placeholder]` locator para evitar aninhamento
- Adicionou-se `company-register-reset.spec.js` para validar exibição de campos e aviso «联系人不能为空»
- Garantiu-se a aprovação de `company-register-fields.spec.js` (sessão 417eac43 com verificação 082.md)

## Verificação e atribuição
- Arquivos: Step1CompanyInfo.vue, companyRegister.vue, QualificationFormSection.vue, Step1BasicInfo.vue, Step2LegalPerson.vue, Step3Appendix.vue, Step4Shareholders.vue, registerValidate.js, company-register-reset.spec.js, mapQxtEntInfo.js, package.json
- Evidência: src=苏州市房地产监测V3-rest/065.md; src=苏州市房地产监测V3/082.md
- Sessão: 417eac43-30d4-48c7-97e2-73f5e4d9cdd0, 0c678471-cf7f-47eb-a5c0-ed61ba99b0f8; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_e2e_locator_bug",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 3,
  "memory_type": "entities"
}
-->