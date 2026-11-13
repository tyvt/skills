# pnpm file: 依赖复制需强制重装
pnpm 的 file: 依赖在安装时会复制源码到 node_modules 而非符号链接，改源码后必须强制重装并重启进程才生效。

## 问题根因
- package.json 中 file:../../xxx 这类 file: 依赖，pnpm install 会复制（copy）而非链接（link）到 node_modules
- Node 进程启动时就把模块加载进内存，改文件不会热更新，必须重启进程才加载新代码
- pnpm 按 file: 依赖的版本号判断是否需更新；版本号不变时判定无需更新，普通 install 是空操作

## 解决方案
- 改本地插件源码后，必须用 pnpm install --force 才会重新拷贝；普通 install 或 pnpm install --filter <pkg> 若版本号未变则为空操作（输出 Scope: 0 of 1 workspace projects，几十毫秒结束）
- 重装后验证 node_modules 拷贝的字节数/哈希与源码一致（如含 project_cwd 等新字段）
- 重装后必须重启 Web（如 Stop-Process -Id <pid> -Force 后 dsh web），否则仍加载旧快照
- 重启后做真实调用验证（如不带 workdir 的 orchestrate 应返回 workdir_source 字段且非 WORKDIR_REQUIRED）
- 2026-11-13 起采用 A+C 组合维持单一副本：方案 A 在 node_modules 下建目录 junction 指向源码（改源码重启 Web 即生效，免重装）；方案 C 用 post-install 钩子脚本 link-plugins.ps1 在每次 pnpm install 后重建 junction。pnpm install --force 降为回退路径（删 junction 后重装恢复实体目录）。

## 适用场景
- 适用于 dsh 技能仓下所有 file: 本地插件（orchestrator、orchestrator-gate 等），改任何本地插件都会遇到此坑

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pnpm_file_dep_refresh",
  "source_extraction_id": "df58c1ba978f4b36a24dd84f7cd4ecaf",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->