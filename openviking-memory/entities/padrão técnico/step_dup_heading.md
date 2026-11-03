
# Componente de etapa não deve repetir título de bloco
No projeto 苏州市房地产监测V3, `institutionRegister/index.vue` removeu o `<h2>管理员信息</h2>` redundante na etapa 2 e renderiza direto o `Step2AdminInfo`, evitando duplicação com o título da barra de etapas.

## Implementação
- `institutionRegister/index.vue` etapa 2 removeu o `<h2>管理员信息</h2>` redundante
- Renderiza diretamente o componente `Step2AdminInfo`
- Evita repetir o título já presente na barra de etapas

## Verificação e afiliação
- Evidência: extracted source=cursor session=e6a70106-1904-4b9e-9ff5-cc44b3452aa4
- Arquivos: institutionRegister/index.vue, institutionRegister/components/Step2AdminInfo.vue, register/companyRegister.vue
- Projeto: 苏州市房地产监测V3; Sessão: e6a70106-1904-4b9e-9ff5-cc44b3452aa4; Baseline: none


<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "step_dup_heading",
  "source_extraction_id": "6433a7001a3e48e3b87e2ed8833cfa99",
  "version": 1,
  "memory_type": "entities"
}
-->