
# Passo de registro usa ícone de conclusão
`RegisterStepper/index.vue` carrega ícone de estado concluído na ordem `completeIcon` → `currentIcon` → `pendingIcon`, removendo `el-icon-check` de fundo azul.

## Comportamento
- Estado concluído usa `completeIcon`, com fallback para `currentIcon` e então `pendingIcon`.
- Fundo azul com `el-icon-check` foi removido.

## Manutenção de estilo
- Se houver anomalia de estilo, substituir PNG em `public/assets/images/register-step/`, não modificar a lógica do componente.

## Arquivos relacionados
- `components/RegisterStepper/index.vue`
- `views/register/companyRegister.vue`
- `views/institutionRegister/index.vue`


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_stepper_icon",
  "source_extraction_id": "adc3e1ae8ecc450c8f127414246b355e",
  "version": 1,
  "memory_type": "entities"
}
-->