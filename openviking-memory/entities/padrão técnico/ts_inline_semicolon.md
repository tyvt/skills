# Erro de parse Vite por tipo inline sem ponto-e-vírgula
No projeto 苏州市服务监管平台, o Vite/oxc falhava ao compilar src/App.tsx com PARSE_ERROR por tipos de objeto inline sem separadores entre membros.

## Causa raiz
- O parser oxc (TypeScript) exigia `;` entre membros de tipo numa única linha; membros em linhas separadas são válidos
- Em src/App.tsx os tipos inline `{ name: string className?: string }` omitiam o separador, gerando "Expected a semicolon or an implicit semicolon after a statement, but found none"
- O grep inicial só encontrou membros com tipo primitivo, não os tipados como função, exigindo busca ampliada para achar a linha 271

## Solução
- Corrigir 5 tipos de objeto inline em src/App.tsx inserindo `;` entre membros: linhas 16, 20, 45, 271, 403
- Exemplos: linha 16 `{ name: string; className?: string }`, linha 45 `{ id: IconName; label: string; screen?: Screen }`, linha 271 `{ enter: () => void; back: () => void }`

## Verificação e origem
- `npx tsc --noEmit` sem erros e `npm run build` gerou `dist` com 16 módulos convertidos com sucesso
- Aviso `configLoader: 'native'` no stderr é apenas depreciação do vite.config.ts e não afeta o build
- Arquivo: C:/Users/Administrator/Downloads/苏州市服务监管平台/src/App.tsx
- Projeto: 苏州市服务监管平台; sessão de 2026-11-04

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "ts_inline_semicolon",
  "source_extraction_id": "6020bd6b2cf44168a974f33a89e23ef5",
  "version": 1,
  "memory_type": "entities"
}
-->