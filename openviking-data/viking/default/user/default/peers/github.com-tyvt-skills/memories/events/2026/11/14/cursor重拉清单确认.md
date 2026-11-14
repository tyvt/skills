# Summary
2026-11-14 用户要求重新拉取 cursor 清单确认剩余模型是否优秀（除 composer 外）。重拉后剩 21 个 cursor 模型（用户已关停部分），对照初筛结果：13个A档(6/6)、6个B档(5/6)、2个C档（composer-2.5 4/6、gemini-4-carbon 4/6+1err）。除 composer-2.5 与 gemini-4-carbon 外，其余 19 个均初筛优秀（A/B档）。初筛仅验 JSON 顺从+关键路由，不等于全量质量排名。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 再拉一下清单，现在cursor剩下的是不是都是优秀的，除了composer之外
**assistant [peer=github.com-tyvt-skills]**: 先重新拉网关当前 cursor 清单，看现在（你可能已关闭部分）还剩哪些，再逐一对照我刚才的初筛结果判断"是否都优秀"。
**assistant [peer=github.com-tyvt-skills]**: 现在剩 **21 个** cursor 模型。逐一对照我刚才的初筛结果，看是否"都优秀"。
**assistant [peer=github.com-tyvt-skills]**: 对照完成。直接回答你的问题：

## 现在剩的 21 个 cursor，是不是都优秀（除 composer）？

**答案：基本是，但不全是**——21 个里 **20 个是 A/B 档（6/6 或 5/6）**，只有 3 个例外需注意：

| 档位 | 数量 | 模型 |
|---|---|---|
| **A 档 · 6/6 满分（12 个）** | ✅ 优 | claude-opus-4-7@1m、claude-opus-4-7@300k、deepseek-v41-flash-1017、gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-mini、gpt-5.4-nano、gpt-5.6-sol@1m、gpt-5.6-sol@272k、gpt-5.6-terra@1m、gpt-5.6-terra@272k、grok-4.7@500k、muse-spark-1.3@1m |
| **B 档 · 5/6（6 个）** | ✅ 良好 | glm-5p3-flash、gpt-5.5@1m、gpt-5.5@272k、grok-4.7@256k、kimi-k3、muse-spark-1.3@300k |
| **C 档 · 4/6（3 个）** | ⚠️ 不优秀 | **composer-2.5（4/6 route3）**、**gemini-4-carbon（4/6 +1err）**、还有… |

等等，我要精确核对——上表 C 档列了 composer-2.5 和 gemini-4-carbon 两个，但 gl… 让我确认 21 个里 C 档到底几个。上表只有 **composer-2.5** 和 **gemini-4-carbon** 是 C 档（4/6）。其余 19 个都是 A/B。

## 结论

**21 个里除 `composer-2.5` 外，还有 `gemini-4-carbon` 也不是满分档**（4/6 + 1 次网络 err），其余 **19 个都优秀**（A/B 档，6/6 或 5/6）。

- **明确不优秀**：`composer-2.5`（4/6，route 只 3——印证它 JSON 不稳，与前一致）、`gemini-4-carbon`（4/6，有 1 次 err，比同门 gemini-4-hydrogen 6/6 差一档）。
- **其余 19 个（除这俩）都是 A/B 档，初筛优秀**。

⚠️ 口径：这是 **6 题初筛**（工具选择/依赖/坏工具/直答/安全），只验 JSON 顺从 + 关键路由，**"优秀"=初筛过关，不等于全量 35 题质量排名**。B 档里有几个带 1 次网络 err（muse-spark-1.3@300k、kimi-k3 route4）属偶发，可全量复核。

要不要我对这 19 个（或去掉重复变体后）跑全量 35 题，给真实质量排名？还是先把 gemini-4-carbon / composer-2.5 也关掉？

<!-- MEMORY_FIELDS
{
  "event_name": "cursor重拉清单确认",
  "goal": "确认剩余cursor模型",
  "summary": "2026-11-14 用户要求重新拉取 cursor 清单确认剩余模型是否优秀（除 composer 外）。重拉后剩 21 个 cursor 模型（用户已关停部分），对照初筛结果：13个A档(6/6)、6个B档(5/6)、2个C档（composer-2.5 4/6、gemini-4-carbon 4/6+1err）。除 composer-2.5 与 gemini-4-carbon 外，其余 19 个均初筛优秀（A/B档）。初筛仅验 JSON 顺从+关键路由，不等于全量质量排名。",
  "ranges": "83-95",
  "source_extraction_id": "d6af3b8809a949fe968962f4e16109aa",
  "version": 1,
  "memory_type": "events"
}
-->