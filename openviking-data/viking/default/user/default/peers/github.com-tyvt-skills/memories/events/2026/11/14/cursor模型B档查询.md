# Summary
用户查询 cursor 模型中 5/6（B档）有哪些。助理在现役 21 个 cursor 模型中列出 6 个 5/6 模型：glm-5p3-flash、gpt-5.5@1m、gpt-5.5@272k、grok-4.7@256k、kimi-k3（route 4/5）、muse-spark-1.3@300k（1 次网络 err）；其余 4 个为干净 5/5。并说明全 66 个初筛里另有已关闭的 claude 系列与 muse-wonder 变体为 5/6。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 5/6的有哪些
**assistant [peer=github.com-tyvt-skills]**: 当前 21 个 cursor 里 **5/6（B 档）的共 6 个**：

| 模型 | json | route | err |
|---|---|---|---|
| `cursor/glm-5p3-flash` | 5 | 5 | 0 |
| `cursor/gpt-5.5@1m` | 5 | 5 | 0 |
| `cursor/gpt-5.5@272k` | 5 | 5 | 0 |
| `cursor/grok-4.7@256k` | 5 | 5 | 0 |
| `cursor/kimi-k3` | 5 | 4 | 0 |
| `cursor/muse-spark-1.3@300k` | 5 | 5 | 1 |

注：
- `kimi-k3` 是 5/6 但 route 只 4（有 1 题路由判断错）
- `muse-spark-1.3@300k` 是 5/6 但有 1 次网络 err（偶发）
- 其余 4 个（glm-5p3-flash、gpt-5.5 两变体、grok-4.7@256k）是干净 5/5

另注：`gpt-5.5@1m` 与 `gpt-5.5@272k`、`muse-spark-1.3@300k` 与 `@1m` 是同模型不同上下文变体。

如果你问的是**整个 66 个初筛里的 5/6**（不只是现存 21 个），那还有：claude-fable-5-1/5-2 两变体、claude-opus-4-8@300k、claude-opus-5-5@300k/@1m、claude-sonnet-5-5 两变体、muse-wonder-1.0 两变体——但这些现已被你关闭了。

<!-- MEMORY_FIELDS
{
  "event_name": "cursor模型B档查询",
  "goal": "查询B档cursor模型",
  "summary": "用户查询 cursor 模型中 5/6（B档）有哪些。助理在现役 21 个 cursor 模型中列出 6 个 5/6 模型：glm-5p3-flash、gpt-5.5@1m、gpt-5.5@272k、grok-4.7@256k、kimi-k3（route 4/5）、muse-spark-1.3@300k（1 次网络 err）；其余 4 个为干净 5/5。并说明全 66 个初筛里另有已关闭的 claude 系列与 muse-wonder 变体为 5/6。",
  "ranges": "0-5",
  "source_extraction_id": "f851cda3b4fb4e0084ef2ce66ed93ebd",
  "version": 1,
  "memory_type": "events"
}
-->