# Summary
用户审计指出助手将 typecheck/tsc/vue-tsc 纳入 FULL_SCRIPTS 后，bun run typecheck 走全量构建拦截路径，而 orchestrate 的 pwsh 无本地 FS 跑不了全量 typecheck，导致便宜模型唯一静态自检安全网被禁。助手于 2026-11-12 接受并回退：将 typecheck/type-check/tsc/vue-tsc 从 FULL_SCRIPTS 移出，build/lint 仍拦；仅 npm/pnpm/yarn/bun run typecheck 等脚本名不再被全量拦截，bare tsc/vue-tsc 仍按原有 tsc 子规则拦。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...省一轮，且这个任务本身就不值得让旗舰出骨架。

否则"所有任务都过旗舰审阅"会在简单任务上产生大量低质量 REJECT 轮次，成本反超"旗舰直接干"。

---

## P2（严重）`bun run typecheck` 被拦，砍掉了便宜模型的唯一验证安全网

这是你这次改动的副作用。逻辑链：
1. 项目里**没有 eslint**（package.json 无 eslint 依赖），`typecheck` 是唯一的静态自检手段。
2. 你把 `typecheck`/`tsc`/`vue-tsc` 纳入 `FULL_SCRIPTS` 后，`bun run typecheck` 走全量构建拦截路径。
3. 而 `orchestrate` 的 `pwsh` **没有本地 FS**（你日志里已验证），全量 typecheck 在 orchestrate 侧根本跑不了。
4. 结果：宿主直跑被 gate 拦，orchestrate 又跑不了 → **便宜模型只能放弃验证，报"未执行"**。

这比原来的"漏拦"更糟：原来至少还能自检，现在自检被禁，模型更容易在"未验证"的状态下声称完成。

**建议把 `typecheck` 和 `build/lint` 分开对待：**
- `build` / `lint`：成本大户、产物可缓存 → 拦，走 orchestrate。合理。
- `typecheck`：**验证安全网、单文件可窄跑** → 至少给「单文件/单模块 typecheck」豁免（`vue-tsc --noEmit <file>` 是窄命令）；全量 typecheck 允许后台 + 超时，不强制走 orchestrate。
- 退一步：若坚持全量 typecheck 也要拦，那必须提供「orchestrate 侧能跑 typecheck」的路径，否则就是死路。

本案例里那个 20+ 既有错误的 typecheck，本来就是个"能跑出基线"的动作，不该被当成成本敌人。...
...
**assistant [peer=github.com-tyvt-skills]**: 你说得对。核心是 P2：我把 `typecheck` 塞进 `FULL_SCRIPTS`，等于把便宜模型唯一的静态自检安全网也拦死了，而 orchestrate 的 pwsh 无本地 FS 又跑不了全量 typecheck——死路一条。这比原来的漏拦更糟。

在动手前，我需要你对 P2 的落地方式做一个决定，因为它涉及"验证安全网 vs 成本"的取舍，属于计划类判断，不该我替你拍：
...
**assistant [peer=github.com-tyvt-skills]**: 明确了。落地清单：

1. **P2**：`typecheck`/`type-check`/`tsc`/`vue-tsc` 从 `FULL_SCRIPTS` 移出，`build`/`lint` 仍拦。
2. **启动日志三件套（一套做）**：`rulesVersion` = 派生指纹（由规则开关状态派生，而非手写版本号）+ 启动时打印全量开关状态 + 文档教怎么读这个指纹。
3. **C：汇报审阅 Prompt**。
4. **plan-contract 三处**：`acceptance.expected`、`commit.verify_with` 集合比对、`open_contracts` 回填责任人。
5. **Prompt A/B 修订**：R2 措辞、R6 改 DAG、不补方案边界、折叠≠失败、循环/增量规则。
6. **P1 风险分级 + 灰度提醒**。

先做 P2 + gate 代码（指纹日志），因为要改同一个文件。先精确看 `apply` 结构和 RULES。
...
**assistant [peer=github.com-tyvt-skills]**: Now make the edits. First P2 — revert `typecheck` family out of `FULL_SCRIPTS`:
...
**assistant [peer=github.com-tyvt-skills]**: 全部落地，仅提交、未推送。你的审核我逐条兑现了。

## 一、P2 我的副作用（最严重，已回退）

`typecheck`/`type-check`/`tsc`/`vue-tsc` 已从 `FULL_SCRIPTS` 移出，`build`/`lint` 仍拦。理由写进了代码注释和 DESIGN §10.4：项目无 eslint 时 typecheck 是唯一静态自检网，而 orchestrate 的 pwsh 无本地 FS 跑不了全量 typecheck——拦它 = 宿主被拦 + orchestrate 跑不了 = 死路。typecheck 改交宿主窄跑（单文件/单模块，必要时后台+超时）。

> 边界澄清：**直接二进制** `bare tsc`/`bare vue-tsc` 仍按原有 tsc 子规则拦（那是另一套规则，非 `FULL_SCRIPTS`），我没动它；只有 `npm/pnpm/yarn/bun run typecheck` 这类**脚本名**不再被全量拦截。selftest 里 `bun run typecheck`/`npm run typecheck`/`pnpm typecheck`/`bun tsc` 已从"拦"移到"放行"，`vue-tsc --noEmit`(bare) 仍在拦——符合两套规则的区隔。...

<!-- MEMORY_FIELDS
{
  "event_name": "typecheck移出全量脚本清单",
  "goal": "回退P2副作用",
  "summary": "用户审计指出助手将 typecheck/tsc/vue-tsc 纳入 FULL_SCRIPTS 后，bun run typecheck 走全量构建拦截路径，而 orchestrate 的 pwsh 无本地 FS 跑不了全量 typecheck，导致便宜模型唯一静态自检安全网被禁。助手于 2026-11-12 接受并回退：将 typecheck/type-check/tsc/vue-tsc 从 FULL_SCRIPTS 移出，build/lint 仍拦；仅 npm/pnpm/yarn/bun run typecheck 等脚本名不再被全量拦截，bare tsc/vue-tsc 仍按原有 tsc 子规则拦。",
  "ranges": "6-11,34,36,38,84-87",
  "source_extraction_id": "0008b8cf52614969b739dfa8987c44cb",
  "version": 1,
  "memory_type": "events"
}
-->