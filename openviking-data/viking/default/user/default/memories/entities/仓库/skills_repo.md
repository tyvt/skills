# skills 仓库
本地技能库，位于 D:epository\skills，是一个 git 仓库（分支 main，远程 tyvt/skills）。

## 基本信息
- 带 SKILL.md 的「真技能」原有 8 个，2026-11-04 删除 3 个从未调用的技能后剩余 5 个
- 会话日志位于 ~/.dsh/sessions，2026-11-04 统计有 1602 个多帧 zstd 会话日志文件

## 剩余技能（2026-11-04）
- zentao-analyzer：真实调用 128 次，最常用
- decision-options：真实调用 22 次
- token-frugal：真实调用 7 次
- tool-call-hygiene：真实调用 4 次
- tdd：真实调用 1 次

## 已删除技能（2026-11-04）
- grill-me：深度拷问式访谈技能，SKILL.md 带 disable-model-invocation: true，故意不自动触发
- i-have-adhd：ADHD 友好输出风格，靠 /i-have-adhd 开关切换
- long-form-corpus-rewrite：针对几百到几千个分片笔记/译文/词条的批量改写中文技能

## 近期变更（2026-11-10）
- zentao-analyzer SKILL.md 开工前置补 git submodule status + 每个子模块 git -C worktree list（bug6369 空转 8 步根因修复），随提交 86279dd0（仅提交未推送）

## 关联关系
- ~/.dsh/skills、~/.cursor/skills、~/.claude/skills 中为指向仓库技能目录的符号链接，删除后悬空链接已清理

<!-- MEMORY_FIELDS
{
  "category": "仓库",
  "name": "skills_repo",
  "source_extraction_id": "4b1f3497c14d489baa4f340b256e6981",
  "version": 2,
  "memory_type": "entities"
}
-->