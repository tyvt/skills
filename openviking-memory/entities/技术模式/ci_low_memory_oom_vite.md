
# OOM em build CI de baixa memória por pico paralelo Vite
No projeto zhi2-web-admin (Huishan Fase 2G), ambiente CI com 4GB RAM e limite de heap 4096MB ainda apresentava OOM; causa raiz: operações paralelas de arquivo e compressão aumentavam pico de memória.

## 问题根因
- CI 4GB RAM, heap max 4096MB ainda OOM
- Operações paralelas de arquivos e compressão elevam pico de memória

## 解决方案
- `scripts/vite-build.mjs` detecta automaticamente baixa memória e limita heap a 3840MB
- `vite.config.js` em modo baixa memória define `maxParallelFileOps:1`, desliga compressão e `manualChunks` para reduzir pico

## Arquivos
- package.json, vite.config.js, scripts/vite-build.mjs, eslint-rules/package.json, src/router/index.js, node_modules/vite/package.json

## Verificação
- Sessão cursor: b2d5de3f-5090-4bd2-97e9-fac732c844c4; base de código: none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ci_low_memory_oom_vite",
  "source_extraction_id": "bd420326a12843babc324cc305cc151c",
  "version": 1,
  "memory_type": "entities"
}
-->