# Propriedade action obrigatória no el-upload
O el-upload do Element UI exige a propriedade action, mesmo com http-request customizado.

## Problema
- Em certificatesDialog.vue, uso de :http-request="handleUpload" sem action causava aviso "Missing required prop".
- Em LicenseAppendix.vue e RegisterUploadItem.vue, uso de :http-request sem action também disparava o mesmo aviso.

## Solução
- Adicionado action="#" no el-upload, seguindo padrão de userAvatar.vue; o envio real é tratado por handleUpload.
- certificatesDialog.vue, LicenseAppendix.vue e RegisterUploadItem.vue seguem o mesmo princípio.

## Arquivos e origem
- Arquivos: certificatesDialog.vue; userAvatar.vue; LicenseAppendix.vue; RegisterUploadItem.vue.
- Evidência: src=产品2.0/085.md; sessão: a3245b72-8923-4386-a8ad-ff00068ae739.
- Evidência adicional: sessão cursor 09f02af4-1f3e-476b-a0d6-764f5d1f361d (LicenseAppendix.vue, RegisterUploadItem.vue, certificatesDialog.vue).

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "el_upload_action_required",
  "source_extraction_id": "9e5325997abb4bf8bfb4d64dabe6b2a1",
  "version": 2,
  "memory_type": "entities"
}
-->