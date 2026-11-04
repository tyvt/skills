# 低内存 CI 构建中因 Vite 并行峰值导致的 OOM
在项目 zhi2-web-admin (Huishan Fase 2G) 中，CI 环境配备 4GB RAM 和 heap 限制 4096MB 仍出现 OOM；根本原因：并行文件和压缩操作增加了内存峰值。

## 问题根因
- CI 4GB RAM, heap max 4096MB 仍然 OOM
- 并行文件和压缩操作增加了内存峰值

## 解决方案
- `scripts/vite-build.mjs` 自动检测低内存并将 heap 限制为 3840MB
- `vite.config.js` 在低内存模式下定义 `maxParallelFileOps:1`，关闭压缩和 `manualChunks` 以减少峰值

## 文件
- package.json, vite.config.js, scripts/vite-build.mjs, eslint-rules/package.json, src/router/index.js, node_modules/vite/package.json

## 验证
- cursor 会话: b2d5de3f-5090-4bd2-97e9-fac732c844c4; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ci_low_memory_oom_vite",
  "source_extraction_id": "bd420326a12843babc324cc305cc151c",
  "version": 1,
  "memory_type": "entities"
}
-->