---
name: agent-cost-hygiene
description: 会话 token/成本卫生规范。读文件策略（grep 定位 + 窄读）、会话配置稳定性（不中途换模型）、收口时机与收尾格式。当会话 token 消耗过高、上下文接近窗口压力、需要整读大文件或反复读同一段落时使用。
---

# agent-cost-hygiene

## 读文件
- 先 `grep -n` 拿行号表，再 `read offset/limit`，单次 ≤120 行；禁止整读 >300 行的文件。
- 同一文件同一段落不重复读；需要多处时一次读「行号表 + 3 段窄读」。
- skill/文档用 grep 定位章节后只读该区间，不从 offset 39 试到 142。

## 会话稳定性
- 同一会话不中途改模型、不改 reasoningEffort（改则整段缓存失效）。
- 上下文接近窗口 60% 即收口；根因判定用「1 次评论 + 1 次目录 SQL + 1 次 grep + 1 次窄读」封顶，不做长链反复推演。

## 收尾
- git 检查开工一次（worktree list + status -sb + fetch）、收尾一次即可；中间只跑单条 `status -sb`。
- 最终报告 = 结论 + 证据表 + 未验证项，不复述改动细节。
