# CI OOM: 仅同步 Vite 配置到子模块的多个分支

在项目 苏州市房地产监测V3 中，CI 中的 Vite 构建因 OOM（JS 堆内存不足）而失败。该修复已同步到子模块 `zhi2-web-admin` 的多个目标分支，仅更新了构建文件。

## 同步范围
- 已同步到子模块 `zhi2-web-admin` 的全部 8 个目标分支并 push 到 origin
- 每个分支仅更新 `scripts/vite-build.mjs` 和 `vite.config.js`（OOM 修复的关键点），未动 `public/version.json`
- 同步分支与新提交：
  - `2.6.2-portal-v3` → `e01dac3a5`
  - `develop/v2.6.2` → `c7a0d516d`
  - `develop/v2.6.2-huishan` → `ea85465ba`
  - `develop/v2.6.2-portal` → `5ab4ced9e`
  - `develop/v2.6.2-suzhufang` → `bf3953fac`
  - `develop/v2.6.2-yulin` → `951a6b543`
  - `hotfix/qrcode-20260826` → `a87c24b76`
  - `suzhufang-bankAuth` → `415b08b54`
- 含 `develop/v3.0.0` 在内共 9 个分支远程状态已确认

## 未更改项
- 未更改 `public/version.json`
- 根仓库配置和文档未受影响

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/127；extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：c2c6e916-2a2e-4117-ac80-b5e180e3180f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_oom_sync",
  "source_extraction_id": "a49f22e6571844eeb473d75963a3686e",
  "version": 3,
  "memory_type": "entities"
}
-->