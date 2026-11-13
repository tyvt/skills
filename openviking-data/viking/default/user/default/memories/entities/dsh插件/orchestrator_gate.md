# orchestrator-gate
DSH Web 的网关插件（编排器门禁），用于在命令执行前根据路径深度与 moduleRoots 进行放行或拦截，强制重活走编排器。代码位于 D:\repository\skills\dsh\orchestrator-gate。

## 功能与规则
- 通过 ctx.tools.guard() 在每次工具执行前拦截重活工具，返回以 `[orchestrator-gate]` 开头的拒绝理由引导改用 orchestrate，不自动转发
- 路径深度 >=2 或命中 moduleRoots 的 grep 天然放行；仓库根（如 `.` 或 `D:\repository\skills`）的 grep 硬拦截
- 配置项 blockBuildLint:false、blockWholeRead:false 关闭构建/整读拦截；首启仅 blockRootGrep=true
- 规则开关硬编码在 lib/index.js 的 RULES，config 同名字段无效；按 DESIGN.md v9 实现，node selftest.mjs 通过 80 项自测
- 默认配置：repoRoots 仅含 D:\repository\skills；moduleRoots 为 src/views/ 与 dsh/，grepMinDepth 为 2

## 部署与加载
- 通过符号链接（~/.dsh/orchestrator-gate）与 web profile 的 package.json 依赖（file:../../orchestrator-gate）及 dsh.profile.bundles 挂载，重启 Web 生效
- pnpm install 时该包为 node_modules 实体拷贝（非符号链接）；改源码后必须 pnpm install --force 重装刷新拷贝再重启，否则 Web 加载旧快照

## 根因与修复（2026-11-12）
- 早期根因：lib/index.js 的 export const inject = [] 为空导致 cordis 抛错、插件不激活；已修复为 inject = ["tools"]（line 17）
- 真正根因：cordis.patch.yml 上存在非继承的、主体为 DESKTOP-0AKGC7K\Administrator 的 Write DENY ACL，pnpm 硬链接拷贝该文件时拒绝访问（os error 5），整个包安装中止，node_modules 里的 gate 永远停在旧拷贝（10:30 版，18937 字节）；源码新版（11:13，21561 字节，含 rulesFingerprint 启动凭证日志）从未装入。其余 6 个 file: 插件 11:44 重装成功，唯独 gate 漏刷
- 修复：Set-Acl 移除 Write DENY；pnpm install --force --no-lockfile 成功，node_modules 与源码哈希一致（21561 字节）
- 用户重启 Web（新进程 11:52:37 启动）后，根级 grep 被 `[orchestrator-gate]` 拦截，证实新版 gate 已加载生效
- 二次刷新：用户重启后助手验证 node_modules 物理拷贝仍是 12:33 旧快照，于 profiles\web 执行 pnpm install --force --no-lockfile 重刷，lib/index.js 哈希 183C0EF1…、selftest.mjs 哈希 266EEE9B… 与源码一致；请用户再次重启，重启后以日志指纹 7d4a5962 验证新版 gate 已加载并做真实拦截探针

## 验证与提交
- 真实 grep 调用 D:\repository\skills（仓库根，深度不足）被 `[orchestrator-gate]` 拦截；orchestrate op=full 实测 plan→cursor/grok-4.7@256k、execute(file_reader)→workbuddy/glm-5.3-flash、summarize→workbuddy/glm-5.3-flash，逐模型成本落盘
- 早期提交：dsh/orchestrator-gate/ 5 文件 commit 9acaf317（未推送）


<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "orchestrator_gate",
  "source_extraction_id": "b60129e53e214b45abe5b188850b3b57",
  "version": 7,
  "memory_type": "entities"
}
-->