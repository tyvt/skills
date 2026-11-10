# Summary
用户于 2026-11-10 要求在 AGENTS.md（D:epository\skills\dsh\AGENTS.md）显式新增「重活不进主模型」规则：所有文件检索（grep、read）、构建与测试、账单查询必须通过 orchestrate 编排器执行或调用特定封装工具，宿主主模型只负责接收摘要结果；网关 127.0.0.1:3425 不可用时仍允许主模型自行处理并说明原因。助手确认已写入该规则。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 我们直接分析一下刚才的 JSONL 日志。日志显示，Grok 花费了大量步骤在满世界找账单（导致 35k 单步未命中），并且自己做了 grep、read 和 npm test。这些都是重体力活，不应该让宿主主模型来干。

请帮我改造一下架构：

在 AGENTS.md 里显式加上一条：“所有文件检索（grep、read）、构建与测试、账单查询，必须通过 orchestrate 编排器执行，或者调用特定的封装工具。宿主主模型只负责接收摘要结果。...
...
**assistant [peer=deepseek-harness-default-workspace]**: 规则已写入。正在用指定日志跑汇总脚本。
...
**assistant [peer=deepseek-harness-default-workspace]**: 规则和报表都落地了。这条日志里，贵的是宿主 Grok，不是编排器。

**规则**写在 `~/.dsh/AGENTS.md`（实际文件是 `D:\repository\skills\dsh\AGENTS.md`）新的「重活不进主模型」一节：

> 所有文件检索（`grep`、`read`）、构建与测试、账单查询，必须通过 `orchestrate` 编排器执行，或者调用特定的封装工具。宿主主模型只负责接收摘要结果。

原来「先 grep 再 read」和「核对后再由主会话构建、测试」已经拿掉，避免和这条打架。网关 `127.0.0.1:3425` 不可用时仍允许主模型自己做，并要说明原因。

**脚本**在 `scripts/session_model_usage.py`。宿主用量取 `assistant/message` 的 `usage`，模型取最近一次 `request/header`；编排器模型用 `model=` 从 `tool/result` 里匹配。...

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS架构规则新增",
  "goal": "记录规则落地",
  "summary": "用户于 2026-11-10 要求在 AGENTS.md（D:\repository\\skills\\dsh\\AGENTS.md）显式新增「重活不进主模型」规则：所有文件检索（grep、read）、构建与测试、账单查询必须通过 orchestrate 编排器执行或调用特定封装工具，宿主主模型只负责接收摘要结果；网关 127.0.0.1:3425 不可用时仍允许主模型自行处理并说明原因。助手确认已写入该规则。",
  "ranges": "0-1,39,41-44",
  "source_extraction_id": "12f21042b5f24c76a2245c639adc3272",
  "version": 1,
  "memory_type": "events"
}
-->