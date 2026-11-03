# CI 报 @rollup/rollup-linux-x64-gnu 缺失（glibc 过低）
苏房G 项目 CI 中 Vite 构建（Rollup 4）报 Cannot find module @rollup/rollup-linux-x64-gnu，真实根因是 Runner 的 glibc 版本过低，而非依赖损坏。

## 问题根因
- 报错文案把人带去「删 package-lock.json 重装依赖」的死路，实际是 Runner 系统 glibc 太低（Ubuntu 18.04 / CentOS 7 常见）
- Rollup 4.x 原生二进制要求 glibc ≥ 2.32，加载失败被原生命令层包装成「模块找不到」
- 另一诱因：把 Windows 上装的 node_modules 缓存/挂载进 Linux 构建环境，平台原生包不匹配

## 解决方案
- 判定阶段勿删 lock 文件，先 `ldd --version` 确认 Runner 镜像 glibc 版本
- 加 `@rollup/wasm-node` 依赖，在 `zhi2-web-admin/scripts/vite-build.mjs` 检测 `CI` 环境变量，CI 下替换原生 Rollup 为 WASM 版，本地仍用原生（更快）
- CI 必须在 Runner 容器内自己 `npm install`，勿复用宿主机 node_modules
- 根治：Runner 镜像升到 Ubuntu 22.04+（glibc 2.35）

## 验证与归属
- 多项目同源：报错指向 h5-g-unlimited 等独立项目时需同步改动才生效
- 与 #743（CI heap OOM 是构建脚本写死小堆上限）不同类：本条是原生二进制的 libc 依赖，那条是内存参数
- 验证：package.json 加 @rollup/wasm-node 并在 vite-build.mjs 于 CI 自动替换；本地 `CI=true npm run test` 构建通过
- 涉及文件：zhi2-web-admin/package.json、zhi2-web-admin/scripts/vite-build.mjs、package.json、package-lock.json、.gitignore
- 所属项目：苏住房G；来源会话：f6d6c62a-14d0-412a-9d68-6e36fe00948f；代码基线：d109b83

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rollup_glibc_wasm",
  "source_extraction_id": "38ebea9130674fadb31f6f1b20393453",
  "version": 1,
  "memory_type": "entities"
}
-->