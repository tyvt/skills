# pwsh_git_gate
对 pwsh 调用的 git 命令分类为三种状态（write/not-git/unknown）以决定 plan-gate 放行或拒绝。

## 描述
- `classifyGitCommand` 对 pwsh git 命令返回 write / not-git / unknown。
- 任意未知片段拒绝整条命令，即使另一片段为 write。

## 角色
- 实现于 dsh/plan-gate/lib/index.js，在 tool === "pwsh" 时由 `decideInterception` 调用。
- 允许写操作前对 `.plan/_review.json` 做凭证检查（verified 标志、非空且在边界内的 paths、content_sha 匹配）。

## 关系
- 复用 orchestrator-gate 的 `splitSegments`/`tokenize`。
- `sha256Content(workdir, paths)` 复刻 Python `verify.py compute_content_sha` 以保证跨语言哈希一致。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "代码功能",
  "name": "pwsh_git_gate",
  "source_extraction_ids": [
    "0924dc862aaa409aa51cbab9170f1d9e",
    "1f9af026e7b54d939eb27b0664623a3e"
  ],
  "version": 1,
  "memory_type": "entities"
}
-->