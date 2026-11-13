# Summary
发现 planner 主选 openrouter/tencent/hy3-preview:free 在 magpie 网关注册不存在（仅暴露 auto/hy3、workbuddy/hy3、workbuddy-ai/hy3 三个变体），每次规划失败立即降级到最贵 cursor/grok-4.7@256k。2026-11-12 将其改为网关真实存在的 workbuddy/hy3，grok 保留兜底。真机验证轨迹显示 plan via workbuddy/hy3，规划不再烧 grok，成本立降。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 能看到了。这套编排器（orchestrator）的模型池配置**整体偏向“极致性价比与低延迟”**，使用了大量 Flash 模型和免费/降级链路，符合你之前对话中“成本敏感、用便宜模型干活”的基调。

但在实际落地时，这套配置有 **3 个明确的隐患**和 **1 个单点故障**，建议针对性调整：

### 1. 核心隐患与风险

*   **单点故障：`image_analyst`（看图）没有降级池**
    *   配置里只有 `cursor/deepseek-v41-flash-1017` 一个独苗。如果该节点限流、宕机或网络抖动，整个图片分析工具将直接瘫痪。建议至少配置一个 `auto/` 或 `workbuddy/` 的多模态模型作为兜底。
*   **能力错配：`code_editor`（写代码）用 Flash 模型打头阵**
    *   `workbuddy/deepseek-v4.1-flash` 响应极快、成本极低，但 Flash（轻量级）模型在生成复杂代码时，容易出现**“顺手牵羊”改无关代码**或**忽略边缘情况**。写代码是极容易产生连锁幻觉的环节。如果项目对代码质量要求高，建议主选非 Flash 的 DeepSeek-V4 甚至更强模型，让廉价 Flash 模型留在 `file_reader` 和 `pwsh`。
*   **一致性风险：`planner` 依赖免费模型**
    *   `hy3-preview:free` 极大概率有严格的限流（Rate Limit）。一旦限流，会瞬间回落到 `grok-4.7`。这两者的推理风格、指令遵循度完全不同，可能导致 Plan 的结构在两次会话间发生不可控的跳跃。规划环节极其依赖上下文的连贯性，频繁“接力”容易出错。

### 2. 做得好的地方（值得保留）
*   **职责隔离**：`security_guard` 用了 `grok-4.7@256k`。Grok 在安全审查、漏洞识别和长上下文（大 Diff）上表现出色，用来做守卫非常精准。
*   **快慢分离**：`security_guard_fast` 用 Flash 负责高频低风险的校验，避免了每次小改动都去惊动昂贵的旗舰模型，这个策略极佳。
*   **命令转换**：`pwsh` 用 Flash/DeepSeek，自然语言转命令不需要极致的推理，只要格式对即可，这也很合理。

### 3. 调整建议

```text
- image_analyst: cursor/deepseek-v41-flash-1017 → auto/deepseek-v4.1-flash (或加上兜底)
- code_editor: workbuddy/deepseek-v4.1-flash → 建议主选换成非 Flash 的强代码模型
```

**额外提醒**：你之前的审计发现 **`AsyncOpenAI/hy3` 命中率仅 12%**。如果这套编排器经常在 `file_reader` 的兜底链路里用到 `workbuddy-ai/hy3`，那这个极低的缓存命中率意味着**成本并没有你以为的那么低**。建议排查一下该模型的前缀缓存（Prompt Caching）是否生效，或者系统提示词是否每次都在变动导致缓存失效。
...
**assistant [peer=github.com-tyvt-skills]**: 事实核实完毕。你的三个判断里**两个准确、一个需要修正**，还有一个额外发现。逐条对账：

## 逐条核对

**1. `image_analyst` 单点故障 —— ✅ 你说得对，但要注意这是「用户有意为之」**
[config.yaml:74](D:\repository\skills\dsh\langgraph-orchestrator\config.yaml#L74) 明文注释：*"用户指定(2026-11-10)：image_analyst 强制全部使用 cursor/deepseek-v41-flash-1017，**不留备用**"*。所以这不是疏漏，是之前明确要求的。风险客观存在（单点），但改它等于推翻你过去的决定——需你确认。

**2. `code_editor` Flash 打头 —— ⚠️ 方向对，但你的替代建议有个陷阱**
主选确实是 `workbuddy/deepseek-v4.1-flash`（[:55](D:\repository\skills\dsh\langgraph-orchestrator\config.yaml#L55)）。但注意：**整个池 3 个模型全是 Flash/light 级**（deepseek-v4.1-flash ×2 + glm-5.3-flash），**没有一个是非 Flash 的强模型**。所以你说的"换成非 Flash 的强代码模型"——**当前 settings.yaml 里根本没有这类模型可选**（列出的全是 flash/light 或 grok）。要这么做，得先往 magpie 网关/`settings.yaml` 里接入一个真正的强模型（如完整版 DeepSeek-V4 或 cursor/composer-2.5 这类）。

**3. `planner` 依赖免费 hy3 —— ✅ 完全准确**
[:29](D:\repository\skills\dsh\langgraph-orchestrator\config.yaml#L29) `planner_use_free_hy3: true`，主选 `hy3-preview:free`，兜底 `grok-4.7`。限流回落导致 Plan 风格跳变的风险确实存在。

**4. 额外发现（你没提，但更值得注意）：`code_editor` 峰时策略与你担心的相反**
[:30](D:\repository\skills\dsh\langgraph-orchestrator\config.yaml#L30) `peak_use_glm_as_fallback: true`——**峰时 file_reader/code_editor 会跳过 deepseek-v4.1-flash 改用 glm-5.3-flash**。也就是说写代码用哪个 Flash，还取决于你调用时的时段，进一步增加不一致性。

## 关于 hy3 命中率 12%
这条我需要**先查证据**再下结论——它来自你之前的审计。让我确认 `workbuddy-ai/hy3` 在 file_reader 兜底链里到底有没有被真实调用、以及它的缓存命中数据从哪来。
**assistant [peer=github.com-tyvt-skills]**: PowerShell hashtable literal got clobbered (the gate may have rewritten `@{}`). Let me use a simpler approach with `Group-Object`.
**assistant [peer=github.com-tyvt-skills]**: 关键事实：**`workbuddy-ai/hy3` 在全部 56 条真实调用里出现 0 次。** `openrouter/tencent/hy3-preview:free` 也是 0 次。也就是说：

- **hy3 命中率 12% 那条警告，针对的是「file_reader 兜底链里的 hy3」——但兜底链从未被触发到那一档**（file_reader 主选 `auto/deepseek-v4.1-flash` 一直成功，没降级到 hy3）。所以这个 12% 在本套编排器的真实流量里**几乎不产生成本**——它是"配了但没用上"的模型，不是"成本黑洞"。
- 真正花钱的是 `grok-4.7@256k`（17 次，41283 tokens，最贵）和 `workbuddy/deepseek-v4.1-flash`（17 次）。

这说明：**你担心的"hy3 低命中让成本没那么低"在本套编排器里不成立**——那个 hy3 命中率数据来自别处（可能是宿主会话或另一次审计），不是编排器 file_reader 兜底的实际消耗。真正占比最高的是 grok 规划。

## 结论与可执行建议

| 隐患 | 核对结论 | 建议 |
|---|---|---|
| image_analyst 无兜底 | ✅ 属实，但**注释写明是你 2026-11-10 特意要求的"不留备用"** | 风险真实。要加兜底需你推翻旧决定——建议至少加 `auto/deepseek-v4.1-flash` 作第二档 |
| code_editor Flash 打头 | ⚠️ 属实，但**整池无强模型可选**，且峰时会切 glm | 想换强模型得先接入一个（composer-2.5/完整 V4）；否则仅调顺序意义有限 |
| planner 依赖免费 hy3 | ✅ 属实，但**实测 free hy3 调用 0 次**（`planner_use_free_hy3=true` 但没走它？） | 需查为何没用上免费档，可能 magic 网关没该模型或直接落到 grok |
| hy3 12% 命中 | ❌ **在编排器里不成立**，hy3 调用 0 次 | 该告警来自别处，编排器不受影响；真正成本大户是 grok 规划 |

有个反常点值得再查：`planner_use_free_hy3: true` 但 free hy3 调用 0 次、全部落到 grok——**说明免费规划模型可能根本没生效**（网关没这个 model id，或立刻失败降级）。让我确认。
**assistant [peer=github.com-tyvt-skills]**: 证实了：**magpie 网关只暴露 3 个 hy3 变体（auto/hy3、workbuddy/hy3、workbuddy-ai/hy3），没有 `openrouter/tencent/hy3-preview:free`。**

所以 planner 主选 `openrouter/tencent/hy3-preview:free` **在网关上不存在 → 每次规划瞬间失败 → 立刻降级到 `cursor/grok-4.7@256k`**。这就解释了：
- free hy3 调用 0 次
- 17 次 grok 里大部分是 planner 规划
- `planner_use_free_hy3: true` 形同虚设

**这是一个真实的配置 bug：planner 的"免费主力"根本连不上，一直在用最贵的 grok。** 这也反过来印证你第 3 条的担忧——只是方向相反：不是"免费模型限流跳变"，而是"免费模型压根不存在，永远 grok"。

同理 file_reader 池里的 `workbuddy-ai/hy3` 有没有问题？它存在于网关，但调用 0 次（因为主选一直成功，没轮到）。这没问题。

## 现在有明确、安全、可落地的修复项

1. **planner**：把不存在的 `openrouter/tencent/hy3-preview:free` 换成网关真实存在的免费/廉价档（如 `workbuddy/hy3` 或 `auto/hy3`）作为主力，grok 兜底 —— 这能立刻省下 grok 的规划成本。
2. **image_analyst**：加 `auto/deepseek-v4.1-flash` 作兜底（需你确认推翻"不留备用"的旧设定）。
3. **code_editor**：调顺序/换强模型需要先有强模型可用（当前网关只有 flash/light + grok），可选把 grok 或 composer 加入。

这些是配置改动，可逆、低风险。你想让我改哪几项？
...
**assistant [peer=github.com-tyvt-skills]**: 你选了三项全做。`code_editor` 需要先有强模型——先确认网关/settings 里到底有哪些非 flash 强模型可选，再决定加哪个。
...
**assistant [peer=github.com-tyvt-skills]**: 网关里**唯一真正的非 Flash 强模型是 `cursor/composer-2.5`**（Composer 2.5，Cursor 的编码专用强模型，200k 上下文），`cursor/grok-4.7@256k` 也是强模型但偏通用推理。composer-2.5 是**专为代码设计**的，最适合 code_editor。

现在开始改配置。我按你的三项选择落地：

**1. planner**：`openrouter/tencent/hy3-preview:free` → `workbuddy/hy3`（网关真实存在），grok 保留兜底。
**2. image_analyst**：加 `auto/deepseek-v4.1-flash` 兜底。
**3. code_editor**：主选换成 `cursor/composer-2.5`（强代码模型），保留 flash 作廉价兜底。

先备份 config.yaml 再改。
...
**assistant [peer=github.com-tyvt-skills]**: **编排器已实时读到新配置**（无需重启——Python 子进程每次读 config.yaml）：
- planner: `workbuddy/hy3 → cursor/grok-4.7@256k` ✅
- code_editor: `cursor/composer-2.5 → ...` ✅
- image_analyst: `cursor/deepseek-v41-flash-1017 → auto/deepseek-v4.1-flash` ✅

现在做一次**真实验证**：跑一个 planner 任务，确认它真的走 `workbuddy/hy3` 而不是 grok（证明免费档 bug 已修）。
...
**assistant [peer=github.com-tyvt-skills]**: **planner 修复验证成功：** 轨迹显示 `plan via workbuddy/hy3` —— **规划真的走了廉价 hy3，不再是最贵的 grok 了**。这一项直接省钱且生效。

（file_reader 读本地文件失败是另一个既有问题——编排器 Python 子进程无法访问本地文件，之前也遇到过。这是独立待办，不影响本次模型池修复。）

现在更新记忆并汇总。先确认 config 改动是否需要同步到别处（编排器 config 只此一份）。让我记录这次改动到 OpenViking，然后给你最终汇报 + 提交询问。

<!-- MEMORY_FIELDS
{
  "event_name": "planner免费模型修复",
  "goal": "修复规划模型配置",
  "summary": "发现 planner 主选 openrouter/tencent/hy3-preview:free 在 magpie 网关注册不存在（仅暴露 auto/hy3、workbuddy/hy3、workbuddy-ai/hy3 三个变体），每次规划失败立即降级到最贵 cursor/grok-4.7@256k。2026-11-12 将其改为网关真实存在的 workbuddy/hy3，grok 保留兜底。真机验证轨迹显示 plan via workbuddy/hy3，规划不再烧 grok，成本立降。",
  "ranges": "0-10,13-19,21,23,37,39",
  "source_extraction_id": "039129965bd2450d84b764f7f5f3efd1",
  "version": 1,
  "memory_type": "events"
}
-->