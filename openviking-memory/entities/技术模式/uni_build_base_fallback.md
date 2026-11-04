# Não-npm script chama uni build causando fallback de base
Ao executar `npx uni build` ou CI chamando direto `uni build`, `npm_lifecycle_event` fica vazio e é tratado como `development`, fazendo `loadEnv` ler `.env.development` e gerando base Vite incorreto.

## Problema
- `npm_lifecycle_event` vazio é interpretado como `development`
- `loadEnv` lê `.env.development`, deixando `VITE_APP_H5_PUBLIC_BASE` vazio
- Vite `base` volta para `/`, recursos empacotados perdem prefixo `/h5/`

## 解决方案
- `vite.config.ts` passa a usar `mode` recebido do Vite chamando `loadEnv(mode)`
- Para `UNI_PLATFORM` iniciando com `mp-`, base fixado em `/`
- Para H5, `base` definido via variável de ambiente

## Verificação e Arquivos
- 验证证据: src=i淮安公版/001.md
- 涉及文件: src/api/index.js, README.md, vite.config.ts, src/manifest.json, src/pages.json, src/utils/index.js, package.json, src/pages/components/HonorList.vue
- 所属项目: i淮安公版/zhi2-mobile-admin-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uni_build_base_fallback",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 1,
  "memory_type": "entities"
}
-->