# Summary
用户要求重新拉取 cursor 模型清单确认是否都已变好。复核显示 2026-11-14 当前剩 14 个 cursor 模型，除 composer-2.5 外全部 6/6 满分（A档优秀）；composer-2.5 为 4/6（route 仅 3，JSON 顺从性差，C档唯一不优秀）。此前 5/6 的 6 个模型均已被用户关闭。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 再拉一下看看，是不是都是好的了
**assistant [peer=github.com-tyvt-skills]**: 重新拉当前 cursor 清单，对照初筛判断是否都好了。
**assistant [peer=github.com-tyvt-skills]**: `%s` 没被 PowerShell 替换（heredoc 传参问题）。改用把模型列表写进临时文件让 python 读。
**assistant [peer=github.com-tyvt-skills]**: 现在剩 **14 个** cursor 模型。我肉眼看清单就够判定了（这 14 个都在我之前初筛表里）。直接写检查脚本读文件。
**assistant [peer=github.com-tyvt-skills]**: ## 结论：现在剩 14 个，除 composer-2.5 外**全部优秀**

当前 cursor 清单 14 个，对照初筛结果：

| 模型 | json | route | err | 档位 |
|---|---|---|---|---|
| claude-opus-4-7@1m | 6 | 6 | 0 | ✅ A 满分 |
| claude-opus-4-7@300k | 6 | 6 | 0 | ✅ A |
| deepseek-v41-flash-1017 | 6 | 6 | 0 | ✅ A |
| gemini-4-hydrogen | 6 | 6 | 0 | ✅ A |
| gpt-5.3-codex | 6 | 6 | 0 | ✅ A |
| gpt-5.4-mini | 6 | 6 | 0 | ✅ A |
| gpt-5.4-nano | 6 | 6 | 0 | ✅ A |
| gpt-5.6-sol@1m | 6 | 6 | 0 | ✅ A |
| gpt-5.6-sol@272k | 6 | 6 | 0 | ✅ A |
| gpt-5.6-terra@1m | 6 | 6 | 0 | ✅ A |
| gpt-5.6-terra@272k | 6 | 6 | 0 | ✅ A |
| grok-4.7@500k | 6 | 6 | 0 | ✅ A |
| muse-spark-1.3@1m | 6 | 6 | 0 | ✅ A |
| **composer-2.5** | **4** | **3** | 0 | ❌ **C 4/6（唯一不优秀）** |

**13 个全部 6/6 满分**（你已把之前 5/6 的 glm-5p3-flash、gpt-5.5 两变体、grok-4.7@256k、kimi-k3、muse-spark@300k 都关了）。**唯一例外仍是 `cursor/composer-2.5`**（4/6，route 只 3）——与历史结论一致，它 JSON 顺从性差。

⚠️ 口径：这是 6 题初筛（工具选择/依赖/坏工具/直答/安全），"优秀"=初筛过关，非全量 35 题质量排名。这 13 个 A 档里有重复变体（claude-opus-4-7 两档、gpt-5.6-sol 两档、gpt-5.6-terra 两档），全量评测可去重。

要不要：①把 `composer-2.5` 关掉后对 13 个跑全量 35 题出排名；②或先按家族去重再全量？

<!-- MEMORY_FIELDS
{
  "event_name": "cursor模型质量复核",
  "goal": "复核cursor模型质量",
  "summary": "用户要求重新拉取 cursor 模型清单确认是否都已变好。复核显示 2026-11-14 当前剩 14 个 cursor 模型，除 composer-2.5 外全部 6/6 满分（A档优秀）；composer-2.5 为 4/6（route 仅 3，JSON 顺从性差，C档唯一不优秀）。此前 5/6 的 6 个模型均已被用户关闭。",
  "ranges": "6-22",
  "source_extraction_id": "f851cda3b4fb4e0084ef2ce66ed93ebd",
  "version": 1,
  "memory_type": "events"
}
-->