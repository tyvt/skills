# 主包z-paging依赖保留修复
修复 main-v2.1 分支构建后微信开发者工具报 z-paging/uni-datetime-picker 文件找不到（ENOENT）及 __route__ is not defined 的问题。

## 问题原因
- 构建后 common/vendor.js 仍引用主包里的 z-paging 与 uni-datetime-picker 路径
- 旧 relocate 脚本会删掉主包里的这两份依赖（只留在各分包），导致 WXSS/WXML 编译时报找不到文件

## 修复方案
- relocate-z-paging / relocate-datetime-picker 脚本不再删除主包里的这两份依赖，分包仍保留副本并做路径修正
- 新增 scripts/restore-main-vendor-deps.mjs：若主包缺失则从 pages_main 恢复（已在当前 dist 跑过一次，z-paging.wxss 已存在）
- vite.config.ts closeBundle 与 npm run build 链路已串接

## 涉及文件与归属
- 涉及 dist/node-modules/z-paging/.../z-paging.wxss、common/vendor.js、relocate 脚本、scripts/restore-main-vendor-deps.mjs、vite.config.ts
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话 87fe1c13-6937-4a04-8752-5102a7dffe63；代码基线 none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "z_paging_relocate_fix",
  "source_extraction_id": "0a3c17d20fbd48f7804787d4f6d0736e",
  "version": 1,
  "memory_type": "entities"
}
-->
