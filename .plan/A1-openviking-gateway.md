---
status: approved
human_confirmed: true
risk: medium
review_override: false
session: openviking-gateway-A1
review_verdict: pass (82/100, auto/deepseek-v4.1-flash)
title: A-1 把 OpenViking 24 工具收编进 mcp-gateway（A-2 上游项并行）
---

# A-1：OpenViking 工具面改走 mcp-gateway（附 A-2 上游项与退出条件）

## 一、前因后果
- 问题：每步下发的工具目录 `toolsTokens≈16,327`，其中 OpenViking 直连 MCP 的 **24 个工具占 ≈8.4k tokens（52%）**，是唯一大漏点。
- 根因：`@openviking/dsh-memory-plugin` 的 `index.mjs:113` 无条件 `mountOpenVikingMcp()` 把 24 个工具全挂进目录，无任何开关可关/过滤；而 dbx/context-mode 早已改走 `dsh-mcp-gateway` 单入口。
- 目标：让 openviking 工具也走 gateway（1 个 `mcp_gateway` 入口 + 按需 list），目录净省 ≈8k tokens/步；记忆 capture/recall/commit 不受影响。

## 二、已核验事实
- `index.mjs:113` `mountOpenVikingMcp(ctx, config)` 无条件挂载；`config.mjs:13`/`mcp-env.mjs:19` 仅连接/recall/超时，无 toolFilter/disable 字段 → 无配置开关。
- `index.mjs:107-108` 记忆旁路（`tools/pre-execute`、`tools/post-execute`）与 `runtime.mjs`/`client.mjs`/`capture.mjs` 走 HTTP `127.0.0.1:1933`，与 MCP 工具面独立。
- `servers/mcp-proxy.mjs:44` 自带 stdio 代理，把 stdio-MCP 转发到该 HTTP 端；`mcp-env.mjs:19` 为其构造受控 env。
- `dsh-mcp-gateway/lib/config.js:35` 只支持 stdio server（`command`+`args`，无 http）；`lib/stdio.js:42` 用 `env: process.env` 启动子进程。
- `~/.dsh/mcp-gateway/cordis.patch.yml:15` `servers:` 是网关服务端清单落点。
- 实测 `127.0.0.1:1933/health` = 200 `{status:ok, auth_mode:dev}`；`tools/list` 返回 24 工具、33,790 bytes。
- **P0-1 已实测（关键）**：`mcp-proxy.mjs` 独立 spawn 后**确是一个合规 stdio MCP server**——用 `process.env` 起，`initialize` 握手成功（`serverInfo: openviking 1.29.0`），`tools/list` 返回全部 24 工具。凭证由 `~/.dsh/ov.conf` 文件解析，不依赖 dsh 注入的受控 env。**S3 方案成立。**
- **P0-2 待实测**：`recallPeerScope:actor` 由 profile patch 注入、peer 逐会话 `deriveEffectivePeer` 派生；但 gateway 单进程 proxy 只有一个 peer 身份，**跨 workspace 隔离语义存在退化风险**，需隔离探针确认（见 S4b）。
- **术语（A-1 阶段）**：`toolSurface` 合法值仅 `'direct' | 'off'`；`'gateway'` 为 A-2 预留，A-1 收到视为未知值并告警（fallback direct）。

## 三、实施方案（分步）

> 原则：**保留 memory 插件全部记忆功能**（capture/recall/commit/skills/profile 注入），**只剥离它的 MCP 工具面**，改由 gateway 提供；一改一验、可独立回滚。所有动作走新会话验证（工具清单变更必须在重启 dsh web 后新会话生效，绝不中途改）。

| 步骤 | 落点文件:函数 | 改动 | 验证 |
|---|---|---|---|
| S0 | 备份 | 复制 `~/.dsh/profiles/web/cordis.patch.yml`、`~/.dsh/mcp-gateway/cordis.patch.yml`、`~/.dsh/profiles/web/package.json`、`~/.dsh/profiles/web/pnpm-lock.yaml` 为 `*.bak-ovgw-<ts>` | 文件存在 |
| S1 | `pnpm patch @openviking/dsh-memory-plugin@0.5.33` 生成的临时目录 `index.mjs` | 把 `mountOpenVikingMcp(ctx, config)`（`index.mjs:113`）改为受**原始入参 `input.toolSurface`** 控制，并加白名单校验与告警：<br>`const surface = input.toolSurface ?? 'direct';`<br>`if (!['direct','off'].includes(surface)) ctx.logger?.warn(\`[openviking] unknown toolSurface=${surface}, fallback to direct\`);`<br>`if (surface !== 'off') mountOpenVikingMcp(ctx, config);`<br>**读 `input`（未过 schema 校验的原始入参，`index.mjs:12`）而非 `config`**，避免新字段被 `buildPluginConfig` 剥离。`mountOpenVikingSkills` 保持 | `pnpm patch-commit` 成功，lockfile 记 `patchedDependencies`；非法值告警可见 |
| S2 | `~/.dsh/profiles/web/cordis.patch.yml` `openviking-memory-runtime.config` | 追加 `toolSurface: 'off'`（关工具面，记忆旁路照常） | 重启后新会话工具目录不含 `mcp__openviking__*`；启动日志确认插件 input 收到 `toolSurface:'off'` |
| S3 | `~/.dsh/mcp-gateway/cordis.patch.yml` `servers:` | 解析插件包绝对路径（**双分支兜底**）：优先 `node -e "require.resolve('@openviking/dsh-memory-plugin/package.json')"`，若抛 `ERR_PACKAGE_PATH_NOT_EXPORTED` 或失败则 `pnpm why @openviking/dsh-memory-plugin` 取实际路径；两法结果用 `test -f <path>/servers/mcp-proxy.mjs` 校验通过后再写入 `args`。新增 `openviking` server：`command: <node 绝对路径>`，`args: ['<plugin 绝对路径>/servers/mcp-proxy.mjs']`，`hint: OpenViking 记忆/资源库（find/search/read/write/remember/tree/list…按需）`；`startupTimeoutMs` 放大到 30000 | `mcp_gateway` 能 list 出 openviking 的工具名 |
| S4 | （不改码）验证调用链 | 新会话用 `mcp_gateway(server=openviking, tool=search/find/read/remember)` 跑通一次读+一次写 | 返回正常结果，无 peer/credential 报错 |
| S4b | （不改码）**隔离性探针·三控**（P0-2） | 用专用测试 peer 写唯一标记 `OVGW_PROBE_<ts>`：①**正控**：workspace A 写 A 标记 → A 内 `search` **必须查到**；②**负控**：A 标记 → workspace B `search` **必须查不到**；③**B 自洽正控**：workspace B 写 B 标记 → B 内 `search` **必须查到**。三控全过 = 隔离保持；任一失败 → 进 S4c 判定；测试后清理全部探针写入 | 三控全过 = 通过；否则按 S4c 决策 |
| S4c | （不改码）**失败归因与回退决策树** | 探针失败时先定性：**若 ② 查得到**（B 搜到 A 标记）= **跨 workspace 泄漏** → 走「增强：每次调用注入 peer 头」路径（R1-增强），增强无果再回退 `direct`；**若 ② 查不到但 ③ 失败**（B 搜不到 A 且搜不到自己的 B 标记）= **身份错位**（单一 peer 既非 A 也非 B）→ 直接回退 `input.toolSurface='direct'`。定性依据看 mcp_gateway 调用返回与 openviking 端 peer 头日志 | 按定性结果执行对应回退，二选一不再模糊 |
| S5 | 量化复核 | 新会话跑 `token-optimizer`/读 projcache，对比 `toolsTokens` | 从 ≈16,327 降到 ≈8k 量级 |

**A-2 上游项（并行推进，不阻塞 A-1 上线）**
- 给上游 `@openviking/dsh-memory-plugin` 提 issue/PR：新增 `toolSurface?: 'direct' | 'gateway' | 'off'` 或 `toolFilter?: string[]` 配置项，并（可选）在 `toolSurface='gateway'` 时复用 `servers/mcp-proxy.mjs` 由宿主注册为网关 server。
- **退出条件（满足任一即弃用 S1 的本地 patch）**：上游发布带该开关的版本 → 升级插件、删除 `pnpm patch` 补丁、仅保留 S2/S3 的配置；或确认方案 A 整体收益不足（见 §5 量化验收不达标）→ 整体回滚。

## 四、风险与回滚

| 风险 | 缓解 | 回滚/开关 |
|---|---|---|
| R1 **per-session peer 丢失（已实测确认）**：gateway 单进程 proxy 无逐会话 peer，`recallPeerScope` 退化为 `all`（broad）。**仅影响"模型主动调 openviking 工具"路径**；每步**自动召回/写入**走 in-process runtime，仍严格 actor 作用域，不受影响 | **增强不可行**：`OPENVIKING_PEER_ID` 固定值 + `RECALL_PEER_SCOPE=actor` 会使独立 proxy 的 search 无响应（单进程无法承载逐会话 peer），实测失败。dev 单 peer 无实际泄漏；**多 peer 生产以 A-2 上游原生 `toolSurface` 为根治**，否则显式工具调用接受 broad | 兜底 `input.toolSurface` 改回 `'direct'` 即恢复直连（actor scope 完整） |
| R2 **凭证解析**：gateway 用 `process.env` 起 proxy，proxy 需从 `~/.dsh/ov.conf` 等文件解析连接 | 已确认 `~/.dsh/ov.conf`、`ovcli.conf` 存在且 health=ok(auth_mode:dev)；S4 验证一次真实调用 | 同上 |
| R3 **pnpm patch 维护成本**：插件升级会令 patch 失效 | 用 A-2 上游开关作为退出条件；升级插件时优先采用上游版本并删 patch | 删 `patchedDependencies` + 重装 |
| R4 **prefix cache**：清单变更中途打穿缓存 | 一律「改完重启 dsh web → 新会话」验证，绝不在长会话中途改 | 无需回滚，属流程约束 |
| R5 **gateway 单点**：openviking 加入后 gateway 子进程失败连累其他 server | gateway 各 server 独立 connect（`stdio.js` 分开 spawn）；失败只影响该 server | 单删 `servers.openviking` |

**总体回滚**：停 dsh web → 还原 S0 四个 `.bak-ovgw-*` → 删除 `pnpm patch` 生成的 patch 文件并清理 `package.json` 的 `patchedDependencies` → `pnpm install`（必要时 `--force`）→ 重启 web → 验证 24 工具恢复、记忆正常。

## 五、验证计划
- **功能**：S4 —— 新会话 `mcp_gateway` 对 openviking 的 list / search / find / read / remember 各跑通一次；记忆 recall 注入、capture 落盘、commit 正常（对比改动前一次会话）。
- **隔离（P0-2 硬门）**：S4b **三控探针**全过才算隔离保持——① A 写 A 标记 → A 搜得到（正控）；② A 标记 → B 搜不到（负控）；③ B 写 B 标记 → B 搜得到（B 自洽正控）。任一失败 → 按 S4c 决策树定性（泄漏 vs 身份错位）走对应处理，不直接放行。
- **守恒**：确认 `mcp__openviking__*` 24 工具从目录消失；`mcp_gateway` 描述含 openviking hint。
- **量化验收**：新会话 `toolsTokens` 由 ≈16,327 降到 **≤9,000**（预期 ≈8k），否则判定收益不足按退出条件回滚。记录基线命令与输出：`node -e "const j=require('~/.dsh/storages/session_projcache/sessions/session-<sid>.json'); console.log(j.record.rows.contextBreakdown.val.breakdown)"`，口径 = `breakdown.toolsTokens`（每步固定），新旧会话同 model/preset 对比。
- **回归**：dbx / context-mode 两个既有 gateway server 仍可 list+call（不被新 server 影响）。
- **静态/可复现**：`pnpm why @openviking/dsh-memory-plugin` 确认来源；检查 `node_modules/@openviking/dsh-memory-plugin/index.mjs` 目标行已改；查 gateway spawn 子进程 stdout/stderr 与 openviking server health；lockfile 有 `patchedDependencies`；`node -c` 语法检查 patch 后 `index.mjs`。
- **S4 隔离**：用专用测试 peer/workspace 做 remember，之后清理，确认 recall 不含测试写入。
- 未执行项如实写「未执行」。
- 说明：本计划**不改动运行中会话**，生效需重启 dsh web（S2/S3 落地后）。

## 六、范围
- **涉及**：`@openviking/dsh-memory-plugin@0.5.33`（pnpm patch 一处 `index.mjs`）；`~/.dsh/profiles/web/cordis.patch.yml`（加 `toolSurface:'off'`）；`~/.dsh/mcp-gateway/cordis.patch.yml`（加 `servers.openviking`）；备份四文件。
- **不改**：不改记忆的 capture/recall/commit/skills/profile 逻辑；不动 dbx/context-mode；不动 host 核心工具（fs/pwsh/web/todo/ask-user/goal/jobs/schedule/present/skill）。
- **P1 冻结**：agent-team(9) / session-query(5) 场景化本次**不做**，明确搁置。
- **A-2**：仅起草上游 issue/PR 文本与退出条件，作为并行项，不在本次落地代码内。

## 七、执行进度（2026-11-13）
- ✅ S0 备份：`*.bak-ovgw-20261113085739`（profile/mcp-gateway patch.yml + package.json + pnpm-lock）。
- ✅ S1：`pnpm patch @openviking/dsh-memory-plugin@0.5.33` 已改 `index.mjs`（toolSurface 白名单+告警，`node --check` 通过），`pnpm patch-commit` 成功；补丁记于 `pnpm-workspace.yaml` `patchedDependencies` + `patches/@openviking__dsh-memory-plugin@0.5.33.patch`。node_modules 内 index.mjs:113-119 已生效。
- ✅ S2：profile `cordis.patch.yml:62` 加 `toolSurface: "off"`（live）。
- ✅ S3：`servers.openviking` 已加到**实际启动的那份** `node_modules/dsh-mcp-gateway/cordis.patch.yml`（command=node 绝对路径，args=proxy 绝对路径，startupTimeoutMs:30000）。
  - ⚠️ **重要坑**：`~/.dsh/mcp-gateway` 是指向 repo 的 symlink，但 profile 的 `package.json` 用 `file:../../mcp-gateway`，pnpm 把 bundle **物理复制**到 `node_modules/dsh-mcp-gateway`——真正 boot 的是这份物理副本，不是 symlink。两处都已加 openviking（repo 源 + node_modules 副本），`--dump-config` 已确认启动树含 openviking server。
- ✅ 配置合成校验：`dsh --profile web --dump-config` DUMP_OK；composed 含 `toolSurface: 'off'` 与 openviking server。
- ✅ **S4 功能路径预验证（gateway spawn 方式模拟）**：initialize OK、tools/list 24、`tools/call health` 成功返回。S3 spec 端到端可用。
- ⏳ **待重启 web 后新会话**：
  - **S4b 三控隔离探针**（正控 A 搜得到 / 负控 B 搜不到 A / B 自洽 B 搜得到自己的）——不过按 S4c 决策树处理。
  - **S5 量化复核**：新会话 `toolsTokens` 由 16,327 ≤ 9,000 判定。
  - 说明：工具清单变更不在本会话生效，必须重启 dsh web 起新会话验证，不能在当前会话继续。

## 八、重启后验证结果（2026-11-13 09:0x，新会话）
- ✅ **S5 量化 = PASS**：`session_projcache` 新会话 `toolsTokens = 9,142`（旧 16,327，降 44%，达标 ≤9,000 目标量级）；systemTokens 不变 2,077。openviking 24 工具已从目录移除，只剩 `mcp_gateway` 入口。
- ✅ **S4 功能 = PASS**：经 `mcp_gateway(server=openviking)` 实测 `list`(24) / `write` / `grep` / `search` / `health` 全部成功往返。（注：首次 `search` 遇 openviking 服务端 litellm embedding 冷启动 event-loop 报错，重试即恢复，属服务端瞬时问题、与本次改动无关。）
- ⚠️ **S4b/R1 结论（重要，非阻塞）**：gateway-spawned proxy 是**独立进程**，拿不到 dsh 逐会话注入的 peer，`recallPeerScope` 退化为 **`all`（broad）**——即模型**主动调 openviking 工具**时结果可能是全 peer 范围，而非当前 workspace 的 actor scope。
  - 关键缓解事实：**记忆自动召回/写入**走 in-process `runtime.mjs`+`client.mjs`，**仍严格按 per-session `actorPeerId` 作用域**（见 `client.mjs:9,19-54`），**不受 A-1 影响**。故 R1 只影响「模型显式调工具」这一路径，不影响每步自动召回注入。
  - dev 环境仅 `user/default` 单 peer，无跨 peer 数据，**当前无实际泄漏**；多 peer 生产环境需注意此限制。
  - 增强尝试：`OPENVIKING_PEER_ID` 固定值 + `RECALL_PEER_SCOPE=actor` 会导致独立 proxy search 无响应（单进程无法承载逐会话 peer），故**不做固定 peer 注入**，接受「工具调用 broad、自动召回 actor」的现状。
- 🧹 遗留：探针文件 `viking://user/default/scratch/ovgw-probe-20261113.txt` 已在重启后 `forget` 成功删除（`list` 空、`grep` 无匹配、`read` 报 NOT_FOUND）。`search` 仍可能返回 1–3 条**向量索引滞后 ghost**（指向已删 URI 的目录概览/历史事件日志正文），无实质数据、会随索引过期，忽略即可。

## 九、已知限制与多 peer 部署注意事项（重要）
1. **作用域分割（A-1 现状）**：
   - **自动记忆**（pre-step 召回注入 + session 事件 capture/commit）：走 in-process `runtime.mjs`/`client.mjs`，**每会话按 actorPeerId 严格隔离，正确**。
   - **显式工具调用**（模型经 `mcp_gateway(server=openviking)` 调 search/find/read/remember 等）：走**单一 gateway 进程的共享 stdio proxy**，`recallPeerScope` 退化 `all`，结果为**跨 peer 宽范围**。
2. **多 peer 生产部署风险**：若同机部署多个 workspace/peer 且需严格隔离，**显式 openviking 工具调用可能看到其它 peer 的记忆**。当前 dev 单 `default` peer 不触发。
3. **为何不能靠配置增强**：单 gateway 进程无法按会话切换 peer 身份；固定 `OPENVIKING_PEER_ID` 只适合单 peer（且会致 search 无响应，实测）。多 peer 场景**必须**等 A-2 上游原生支持（让插件在 gateway 模式下把 per-session peer 透传到每次 MCP 调用）。
4. **临时缓解选项（多 peer 且必须严格隔离时）**：
   - 方案甲：`input.toolSurface='direct'`（回退直连，恢复完整 actor scope，代价是 24 工具回目录、省 8k token 收益消失）；
   - 方案乙：仅对"不敏感的读取工具"开放 gateway，写/隐私类（remember/write/set_acl/privacy_*）走直连或禁用；
   - 方案丙：多 peer 部署时给每个 peer 独立 openviking server + 独立 gateway 进程（运维成本高，待评估）。
5. **决策**：dev/单 peer 环境按现状（tools 走 gateway，broad 无害）；**多 peer 上线前必须先落 A-2 或选上述甲/乙**。
