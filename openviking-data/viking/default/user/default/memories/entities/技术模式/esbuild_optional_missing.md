# CI 构建报 esbuild 平台二进制缺失
CI 上 vite build 失败报 The package "@esbuild/linux-x64" could not be found，根因是安装时禁用了 optional dependencies 导致平台二进制没装上。

## 问题根因
- esbuild 把各平台二进制放在 optionalDependencies（@esbuild/linux-x64、@esbuild/win32-x64 等）
- 安装时用 --no-optional 或 --omit=optional（或 .npmrc 里 omit=optional）时平台包不会装上
- esbuild 运行时找不到对应平台二进制就抛错，错误发生在加载 vite.config.js 这一步，与代码语法或 vite 配置无关

## 解决方案
- 判定：看 node_modules/@esbuild/ 下有无当前平台包，以及安装命令/.npmrc 里有无 omit=optional / --no-optional（npm 配置优先级高于命令行）
- 修复：安装保留 optional dependencies（去掉 --no-optional / --omit=optional，或用 npm ci --include=optional），固化进 scripts/install.mjs
- CI 前置校验：构建前检查 node_modules/@esbuild/<platform>-x64 存在，缺失明确报「平台二进制未安装」
- 环境受限下载不到平台包时退路是换 wasm 版本，但先排除 omit=optional 这个最常见根因

## 验证与归属
- 验证：会话 63992035（基线 358fa9e）用户贴出 runner 完整报错并确认「直接改」，改动落到仓库内 install.mjs、.npmrc、package.json、vite.config.js
- 涉及文件：zhi2-web-admin/scripts/install.mjs、.npmrc、package.json、vite.config.js
- 来源会话：session-63992035-0418-48dc-9ade-0a6f2d163f36；代码基线：358fa9e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "esbuild_optional_missing",
  "source_extraction_id": "51146e819e2648e6a9106f0127108af7",
  "version": 1,
  "memory_type": "entities"
}
-->