# Botão de alteração oculto por falha de permissão
O botão «alterar» na página de detalhe do administrador não aparece devido a falha na verificação de permissão no arquivo companyAdmin/detail.vue.

## Causa raiz
- `src/views/company/companyAdmin/detail.vue` possui `showChangeButton` que exige o identificador de permissão `company:companyAdminChange:change`
- Quando `bizState` e `organType` estão satisfeitos mas o botão não aparece, indica que a verificação de permissão falhou
- Necessário checar aviso de permissão insuficiente no Console

## Solução
- Garantir que a permissão `company:companyAdminChange:change` esteja concedida ou ajustar a lógica de verificação
- Verificar o aviso de permissão insuficiente no Console para confirmar a causa

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-leftover/118.md
- Arquivos: `src/views/company/companyAdmin/detail.vue`, `src/utils/permission.js`
- Projeto: 苏州市房地产监测V3
- Sessão de origem: 01a1630b-15cb-70c5-a400-76420e9f34c7
- Baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "admin_change_permission",
  "source_extraction_id": "d785eb449c3747999b3990855d973c1c",
  "version": 1,
  "memory_type": "entities"
}
-->