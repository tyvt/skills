- `InfoCardDialog.vue` deve usar container flex centralizado, rótulos com largura fixa de `5.5em` alinhados à direita, cartão centrado horizontalmente com `max-width:100%`
- `WorkCardDialog.vue` deve ter cabeçalho centralizado, campos em layout de linha alinhado, container de QR code com fundo branco, nomes longos com quebra de linha
- Causa: `vue-qr` inline padrão invalida `margin:0 auto`, rótulos com larguras inconsistentes e cartão sem restrição de largura
- Verificação: src=苏州市房地产监测V3/238.md; sessão 3bb79189-7e5a-4f02-909b-f9bdf9a2ecb3

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Estilo de popup de cartão de trabalho",
  "source_extraction_id": "5a368dde30334afa99f7154d2f5147cf",
  "version": 1,
  "memory_type": "preferences"
}
-->