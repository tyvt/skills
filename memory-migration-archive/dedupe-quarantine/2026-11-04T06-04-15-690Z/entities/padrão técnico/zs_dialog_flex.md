# Flex horizontal do zs-dialog coloca dica e formulário lado a lado
O .dialog-box do zs-dialog é flex horizontal, então dica e zs-form ficam lado a lado em vez de empilhados.

## Causa raiz
- O .dialog-box do zs-dialog é flex horizontal
- Dica e zs-form ficam lado a lado quando paralelos

## Correção
- Usar form-box para envolver
- Definir padding do form-box como 0
- Dica acima e formulário abaixo em coluna vertical

## Arquivos envolvidos
- zhi2-web-admin/src/views/portal/application/components/CredentialDialog.vue
- zhi2-web-admin/src/styles/detail-form.scss
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/components/zs-form/zs-form.vue
- zhi2-web-admin/src/styles/element-ui.scss
- zhi2-web-admin/src/styles/ruoyi.scss
- zhi2-web-admin/src/views/portal/application/detail.vue
- zhi2-web-admin/src/styles/variables.css

## Verificação e origem
- Evidência: extração de sessão cursor
- Projeto: portal; sessão: 7e03542d-2de3-4bb7-9718-e8ece18a0a0d

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "zs_dialog_flex",
  "source_extraction_id": "f86567dce52645b8804500e484bf9fdb",
  "version": 1,
  "memory_type": "entities"
}
-->