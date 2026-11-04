# El-upload exige atributo action obrigatório
O componente el-upload do Element UI obriga o atributo action mesmo com upload customizado via http-request.

## Problema
- Em certificatesDialog.vue, o el-upload usava `:http-request="handleUpload"` sem action, gerando aviso "Missing required prop".
- O Element UI impõe action mesmo quando http-request assume o upload.

## Solução
- Adicionado `action="#"` no el-upload de certificatesDialog.vue, seguindo o padrão de userAvatar.vue.
- O http-request customizado assume o upload real sem requisitar a URL #.

## Arquivos e origem
- Arquivos: certificatesDialog.vue; userAvatar.vue.
- Evidência: src=产品2.0/085.md; sessão: a3245b72-8923-4386-a8ad-ff00068ae739.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "el_upload_action",
  "source_extraction_id": "569b09638b2b4de39d502b43e3f6f15e",
  "version": 1,
  "memory_type": "entities"
}
-->