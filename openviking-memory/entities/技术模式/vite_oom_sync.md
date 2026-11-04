# CI OOM: 仅同步 Vite 配置到子模块的多个分支

在项目 苏州市房地产监测V3 中，CI 中的 Vite 构建因 OOM（JS 堆内存不足）而失败。该修复已同步到子模块 `zhi2-web-admin` 的多个目标分支，仅更新了构建文件。

## 同步范围
- 已同步到子模块 `zhi2-web-admin` 的 8 个目标分支（例如：`2.6.2-portal-v3`）
- 每个分支仅更新 `scripts/vite-build.mjs` 和 `vite.config.js`（OOM 修复的关键点）

## 未更改项
- 未更改 `public/version.json`
- 根仓库配置和文档未受影响

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/127

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_oom_sync",
  "source_extraction_id": "9a72ed1246ed49b9a2c86e9dac3adbdd",
  "version": 2,
  "memory_type": "entities"
}
-->