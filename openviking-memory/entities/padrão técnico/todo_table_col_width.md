# Largura da coluna de assunto não definida causa medição por conteúdo
O zs-table-column do HomeTodoTable.vue não declara width/min-width, disparando medição por canvas do texto completo de subject com COLUMN_PADDING=48, limitado a 80~500px.

## Causa raiz
- O zs-table-column do HomeTodoTable.vue não declara width/min-width
- Dispara medição por canvas do texto completo de subject no zs-table-column.vue

## Correção
- Adiciona COLUMN_PADDING=48 na medição
- Largura da coluna limitada a 80~500px
- Largura vem do cálculo automático do componente, não do estilo da página

## Arquivos envolvidos
- zhi2-web-admin/src/views/home/components/HomeTodoTable.vue
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue

## Verificação e origem
- Evidência: extração de sessão cursor
- Projeto: portal; sessão: 01edc950-1251-43f8-9d66-1720c46869de

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "todo_table_col_width",
  "source_extraction_id": "f86567dce52645b8804500e484bf9fdb",
  "version": 1,
  "memory_type": "entities"
}
-->