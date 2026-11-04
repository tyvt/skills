# Botão de alteração oculto por falha de permissão
O botão «alterar» na página de detalhe do administrador não aparece devido a falha na verificação de permissão no arquivo companyAdmin/detail.vue.

## 问题根因
- `src/views/company/companyAdmin/detail.vue` possui `showChangeButton` que exige o identificador de permissão `company:companyAdminChange:change`
- Quando `bizState` e `organType` estão satisfeitos mas o botão não aparece, indica que a verificação de permissão falhou
- Necessário checar aviso de permissão insuficiente no Console

## 解决方案
- Garantir que a permissão `company:companyAdminChange:change` esteja concedida ou ajustar a lógica de verificação
- Verificar o aviso de permissão insuficiente no Console para confirmar a causa

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/118.md
- 涉及文件: `src/views/company/companyAdmin/detail.vue`, `src/utils/permission.js`
- 所属项目: 苏州市房地产监测V3
- Sessão de origem: 01a1630b-15cb-70c5-a400-76420e9f34c7
- Baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_change_permission",
  "source_extraction_id": "d785eb449c3747999b3990855d973c1c",
  "version": 1,
  "memory_type": "entities"
}
-->