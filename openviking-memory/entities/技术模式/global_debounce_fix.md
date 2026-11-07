# 全局 debounce 问题与详情页刷新修复
苏州市房地产监测V3 项目批量修复 334 处 debounce 问题，并统一列表新增跳转逻辑，解决从列表点新增打开详情页面直接刷新。

## 核心改动
- `vite.config.js` 增加 `define: { debounce: "window.debounce" }`
- `permission.js` 动态路由注册时写入 `meta.filePath`
- `listMixins.js` 的 `handleAdd` 统一通过 `getRouterPathByFilePath` 跳转（含 `pathHint`，支持 account 开户/销户）
- `cbyh/index.vue` 移除重复的局部 `handleAdd`

## 批量修复范围
- supervision 模块 33 个 `detail.vue` 批量改造
- 新增脚本 `scripts/fix-detail-chunk-load.mjs` 辅助修复

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 批量修复已完成，`npm run build` 通过
- 所属项目：苏州市房地产监测V3；来源会话ID：d05a4bd7-de6f-4b41-9315-000271ae8a10；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "global_debounce_fix",
  "source_extraction_id": "fd6dce0e4752429b8b3fdac526a80eeb",
  "version": 1,
  "memory_type": "entities"
}
-->