# Sobreposição de gap e padding no formulário de detalhe
No projeto Suzhou Real Estate Monitoring V3, o espaçamento vertical do formulário de detalhe era irregular pela sobreposição de padding-bottom e row-gap.

## 问题根因
- O espaçamento vertical original vinha de padding-bottom em .el-form-item somado a row-gap, gerando inconsistência.

## 解决方案
- Em variables.css, --detail-block-gap passou a ser 24px.
- Em detail-form.scss, padding-bottom dos itens de formulário foi 0, cabendo ao gap o espaçamento.
- Apenas .el-dialog__body sem el-row empilhado usa padding-bottom para evitar sobreposição com row-gap de zs-form.

## Arquivos e verificação
- 涉及文件: variables.css, detail-form.scss, vite.config.js, index.scss, element-ui.scss, detail.vue, zs-dialog.vue.
- 验证证据: src=苏州市房地产监测V3-rest/056.md; sessão 14ac23b1-f562-46c6-80d9-d8e3b7a96870.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_gap_padding",
  "source_extraction_id": "ab08f4474f3d4570b5cc83bd74d094a3",
  "version": 1,
  "memory_type": "entities"
}
-->