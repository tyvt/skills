# CI OOM 同步仅改子模块多分支 Vite 配置
苏州市房地产监测V3 将 Vite 构建 OOM 规避改动同步至 `zhi2-web-admin` 子模块多个目标分支，仅更新构建配置。

## 同步范围
- 同步至 `zhi2-web-admin` 子模块 8 个目标分支（如 `2.6.2-portal-v3`）
- 各分支仅更新 `scripts/vite-build.mjs` 与 `vite.config.js`

## 未改动项
- 未改动 `public/version.json`
- 根仓库配置与文档不受影响

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/104.md
- 涉及文件：zhi2-web-admin/vite.config.js、zhi2-web-admin/package.json、根仓库 package.json、zhi2-web-admin/scripts/vite-build.mjs、zhi2-web-admin/scripts/fix-detail-chunk-load.mjs
- 所属项目：苏州市房地产监测V3；来源会话：c2c6e916-2a2e-4117-ac80-b5e180e3180f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_oom_sync",
  "source_extraction_id": "6b21eb3133284f8db9bc26155421bece",
  "version": 1,
  "memory_type": "entities"
}
-->