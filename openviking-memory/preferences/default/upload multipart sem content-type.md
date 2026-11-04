- Não definir manualmente o cabeçalho `Content-Type: multipart/form-data` pois isso omite o boundary gerado automaticamente pelo navegador, causando falha no upload.
- Em gateway.js: remover `blobToBase64` e usar `formData.append` para envio binário direto; `biz_content` deve conter apenas parâmetros de negócio; adicionar `buildUploadGatewayHeader` mantendo cabeçalhos necessários (ex.: `zs-authorization`) e removendo cabeçalhos redundantes.
- Em httpInstance.js: parar de repassar cabeçalhos extras e priorizar autenticação via `formData.token`.

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "Upload multipart sem Content-Type",
  "source_extraction_id": "0e29cc68446e451f8607eb6f35513056",
  "version": 1,
  "memory_type": "preferences"
}
-->