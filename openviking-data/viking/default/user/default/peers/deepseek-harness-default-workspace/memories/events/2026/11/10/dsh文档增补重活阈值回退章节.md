# Summary
用户在 ~/.dsh/AGENTS.md（实际 D:\repository\skills\dsh\AGENTS.md）的「重活不进主模型」章节后追加「### 阈值与回退」小节（4条规则），助手于 2026-11-10 完成并提交 7b3a8023（仅提交未推送），写入位置 AGENTS.md:25-30。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 落点 1：~/.dsh/AGENTS.md —— 补「重活不进主模型」的阈值与回退条件
现有章节只写了「必须通过 orchestrate 执行，不可用才直接处理」，缺量化阈值和回退留痕。在该章节后追加：

md
### 阈值与回退
- 以下操作一律先走 orchestrate（op=full / op=tool）：全仓或跨目录 grep、单文件 >300 行整读、
  npm run lint 全量、npm run build、账单/大结果查询。
- 单文件 ≤300 行、单条窄命令（npx eslint <file>、git status）可直接执行。
- 编排器不可用时，直连前必须在回复中写明「网关 127.0.0.1:3425 不可用」及原因；
  不得静默降级为主模型亲自跑重活。
- 同一工具同一错误最多重试一次，第二次先换方案（换 SQL / 换工具 / 换路径），
  禁止连续 3 次以上同形态重试。
...
**assistant [peer=deepseek-harness-default-workspace]**: 已在 `D:\repository\skills\dsh\AGENTS.md`（即 `~/.dsh/AGENTS.md` 真实目标）的「重活不进主模型」章节后追加「### 阈值与回退」小节，4 条规则全部写入，且系统已重新加载确认生效。

改动落在 Git 仓库中：
...
**assistant [peer=deepseek-harness-default-workspace]**: **结论**：落点 1 完成。`AGENTS.md` 的「重活不进主模型」章节后已追加「### 阈值与回退」（6 行），并已提交 `7b3a8023`（仅提交，未推送）。

**证据**：
| 项 | 结果 |
|---|---|
| 写入位置 | D:\repository\skills\dsh\AGENTS.md:25-30 |
| 提交 | `7b3a8023`，1 file changed, 6 insertions(+), 仅含 AGENTS.md |
| 未提交的其他脏文件 | cost-meter/lib/index.js、cost-meter/selftest.mjs、tool-call-hygiene/SKILL.md、zentao-analyzer/SKILL.md（未纳入本次提交） |

**未验证项**：无后台任务需要清理。

<!-- MEMORY_FIELDS
{
  "event_name": "dsh文档增补重活阈值回退章节",
  "goal": "记录文档增补",
  "summary": "用户在 ~/.dsh/AGENTS.md（实际 D:\\repository\\skills\\dsh\\AGENTS.md）的「重活不进主模型」章节后追加「### 阈值与回退」小节（4条规则），助手于 2026-11-10 完成并提交 7b3a8023（仅提交未推送），写入位置 AGENTS.md:25-30。",
  "ranges": "8-10,17,21-23",
  "source_extraction_id": "0675c95c48fc408389b1b5bbc2fbe770",
  "version": 1,
  "memory_type": "events"
}
-->