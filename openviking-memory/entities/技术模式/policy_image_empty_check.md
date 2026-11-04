# Conteúdo puramente imagem de anúncio do condomínio falha ao salvar
O js policy_SmPolicyCommunityRecordAdd.js julgava conteúdo vazio após remover tags HTML, falhando em salvar imagens puras.

## Problema
- Regex remove todas tags HTML e espaços; conteúdo <p><img></p> virava vazio causando erro falso de falta de conteúdo.

## 解决方案
- Unificar .html() || '' e, sem texto, usar div temporário para detectar tag img confirmando conteúdo válido.
- Aplicado também em policy_SmPolicyCommunityRecordEdit.js.

## Arquivos e Origem
- 涉及文件: policy_SmPolicyCommunityRecordAdd.shtml, policy_SmPolicyCommunityRecordEdit.shtml, js/policy_SmPolicyCommunityRecordAdd.js, js/policy_SmPolicyCommunityRecordEdit.js.
- Sessão de origem: c95e7ecd-3f26-4fcc-b024-33db02cc9535.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "policy_image_empty_check",
  "source_extraction_id": "946821cb168e4998b6ec501f63eecd13",
  "version": 1,
  "memory_type": "entities"
}
-->