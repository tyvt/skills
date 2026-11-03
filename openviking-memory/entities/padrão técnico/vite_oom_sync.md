# CI OOM: Sync Apenas Config Vite em Múltiplos Ramos do Submódulo
No projeto 苏州市房地产监测V3, o build Vite em CI falha por OOM (memória de heap JS insuficiente). A correção foi sincronizada ao submódulo `zhi2-web-admin` em múltiplos ramos de destino, atualizando apenas arquivos de build.

## Escopo de Sincronização
- Sincronizado para 8 ramos de destino do submódulo `zhi2-web-admin` (ex.: `2.6.2-portal-v3`)
- Cada ramo atualiza apenas `scripts/vite-build.mjs` e `vite.config.js` (pontos-chave da correção OOM)

## Itens Não Alterados
- Não foi alterado `public/version.json`
- Configuração do repositório raiz e documentos não afetados

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3/127.md e src=苏州市房地产监测V3-rest/104.md
- Arquivos: zhi2-web-admin/vite.config.js, zhi2-web-admin/package.json, package.json raiz, zhi2-web-admin/scripts/vite-build.mjs, zhi2-web-admin/scripts/fix-detail-chunk-load.mjs
- Projeto: 苏州市房地产监测V3; Sessão: c2c6e916-2a2e-4117-ac80-b5e180e3180f; Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão Técnico",
  "name": "vite_oom_sync",
  "source_extraction_id": "9a72ed1246ed49b9a2c86e9dac3adbdd",
  "version": 2,
  "memory_type": "entities"
}
-->