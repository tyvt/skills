# zs-textarea com tipo richtext incorreto
Mesmo arquivo com zs-textarea e label '备注' configurado como type 'richtext' deve usar textarea, mantendo zs-editor para richtext real.

## Problema
- zs-textarea com label '备注' recebeu type 'richtext' por engano
- Correspondência incorreta afeta componentes de formulário Vue

## 解决方案
- Alterar type para 'textarea' quando zs-textarea tiver label '备注' e type 'richtext'
- Manter zs-editor para richtext genuíno
- Correção em lote de 75 arquivos limpou o erro de correspondência

## 验证与归属
- Arquivo maintenance/accountQuery/detail.vue não pertence à classe por não ter zs-textarea
- 验证证据: src=bugfix/001.md
- Sessão: c26b5af2-98bb-45f3-8246-0a1d95b9d310
- 所属项目: zhi2-web-admin; baseline none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_textarea_mismatch",
  "source_extraction_id": "abc711535aaf4dbeace7d2af079c5c75",
  "version": 1,
  "memory_type": "entities"
}
-->