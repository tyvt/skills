# OpenViking 优化实施计划（v2）

status: approved
human_confirmed: true

## 一、前因后果

11-12 报告（openviking-analysis-2026-11-12.md）定位检索链路延迟与 VLM token 双高。本次 11-13 复查补齐：决定性证据、成本数字、验收指标；落地顺序改为 **可观测性 → 成本 → 行为**。

## 二、现状与证据

### 2.1 VLM 空转的决定性证据
- **凌晨无人在场仍持续检索**：11-12 UTC 03:00（本地 11:00 前的深夜时段）有 **22 次 search:success**；00:00–06:00 每小时 9–26 次检索。人不在场却在跑 search → 调用方是 **DSH 插件每 turn 自动的记忆召回**，不是用户主动检索。
- **无检索也有 VLM 消耗**：11-12 UTC 13 时检索为 0，仍有 hy3 37,965 in + 9,564 out → 存在**后台记忆抽取**第二来源。
- 峰值：UTC 03 时 hy3 199,729 in + 200,627 out / 22 次 search ≈ **9k in + 9k out 每次 search**。

### 2.2 成本数字（11-12 00:00 → 11-13 02:00 UTC，约 27h）
| 模型 | input | output | 说明 |
|---|---|---|---|
| auto/hy3（openai，远程） | 1,838,146 | 1,670,448 | 折合 ≈ 130k tok/h 持续烧；按 3 元/M in、15 元/M out 估算 **≈ ¥31/天**（单价按实际账单校正） |
| ollama/bge-m3-ov（本地） | 598,456 | — | 本地，成本≈0 |

### 2.3 其他实测
- search 延迟已改善：avg 1062ms / max 5679ms（11-12 报告为 7325ms）。
- 确定性错误仍在：content/read 404×7（固定拉取 `peers/github.com-tyvt-skills/memories/profile.md` 不存在）；POST /sessions 409×4（重复建会话）；find/search 错误只进聚合表不落 request_audit。

## 三、分布实施方案（顺序：可观测性 → 成本 → 行为）

### 阶段 A：可观测性（先补，为 B/C 提供度量基线）
- A0 **调用来源埋点（新增，进入 B 的 gate）**：search/find 与 VLM 调用记录 caller/trigger 字段（user / plugin-turn / cron-extract），跑 1 天数据验证"插件每 turn 召回"与"后台抽取"两条来源占比，据占比定 B1/B2 削减比例。验证：usage_audit 中 caller 字段非空率 100%，两条来源可区分。
- A1 find/search 错误落 request_audit（带 error_code/message）。验证：find 与 search 各人为触发一次失败，明细行与聚合表计数一致。
- A2 修 `profile.md` 固定 404：注入前判存在，缺失即跳过注入并记 warn（不生成空文件）。验证：连续 5 个 turn 404 零新增。
- A3 DSH 插件建会话改 get-or-create。验证：反复开关 5 个会话，409 零新增。
- 验收指标：连续 3 天 request_audit 中「聚合表有错但明细缺失」条数 = 0；404/409 新增 = 0。

### 阶段 B：成本（砍 VLM 空转；进入条件：A0 埋点数据齐且来源占比明确）
- B1 关闭/降频每 turn 自动召回的 query_planner VLM 改写：**缓存 key = 归一化 query 文本精确匹配**（可选加向量近似 cosine ≥0.95 二级），TTL 24h，召回索引变更即失效；记录命中率并对 top-k 做抽检。默认改用纯 bge-m3 向量召回。改动点：ov.conf vlm 段 + 插件召回开关；ov.conf 改前备份，改后重启生效，保留 30 分钟内回滚命令。
- B2 后台记忆抽取改为按会话活动触发：**保留原定时路径为 feature flag**，可一键回退；抽取失败重试 ≤3 次，漏抽检测 = 按会话比对消息数与抽取条数。
- 灰度判据：固定 30 条排障类 query 作对照集，比对有无改写的 top-5 命中；命中率下降 >10% 即回滚 B1。
- 验收指标（token 口径，价格确认后回写金额）：按 24h 窗口实测日均 hy3 token 降 ≥70%（3.51M/27h ≈ 3.1M/天 → ≤1M/天）；无人在场时段（本地 00:00–08:00）hy3 ≈ 0；search p50 不高于 A0 同口径基线 ×1.1。

### 阶段 C：行为（让检索被真正使用；进入条件：B 验收通过）
- C1 AGENTS.md「禁止」节加一条：找不到文件/查历史结论先 `mcp__openviking__search`（mode=context, detail=abstract），再考虑 grep。
- 前后对照验收：C1 前先统计 10 个排障会话的平均主动 search 次数作基线（配合 A0 caller=user 计数），C1 后同样本量对比，目标平均 ≥1 次/会话且较基线上升。

## 四、风险与回滚
- B1 关闭 VLM 改写可能降召回精度 → 保留开关 + 灰度判据（命中率降 >10% 即回滚），可随时还原 ov.conf（改前备份）。
- B2 抽取按需化可能漏抽 → feature flag 保留原定时路径；失败重试 ≤3 次；漏抽检测查询兜底。
- A1/A3 改插件代码 → 单独分支 + worktree，目标版本 0.5.32；回归接口清单：sessions、search、content/read；回滚即还原 0.5.31。

## 五、验证计划与阶段互锁
- 每阶段完成跑一次 usage_audit 对比 SQL（脚本留存 .task-state）；阶段 B 后连续观测 48h token 曲线；通过后回写结论到记忆。
- 互锁：A0 埋点是 B 的进入 gate；B 验收是 C 的进入 gate。责任人：lead 单线实施，用户确认单价与确认实施。

## 六、待确认
- hy3 实际单价（用户提供或从账单读）以把 ¥31/天 估算修正为精确值。

## 七、执行进度（2026-11-13，阶段 A）
- 落点探查（teammate ov-audit-explorer）：request_audit 由 `http_observability_middleware.apply_http_metrics_finalize` → `http.py record_request` → usage_audit subscriber → `projection._project_http_request` → `sqlite_store._write_audit_rows`；find/search 错误不落明细的根因是 `_trim_audit_rows` 按 `audit_retention_per_account` 只留最新 N 行（错误行被挤出，聚合表不受 trim）。
- ✅ A0（服务端）：`X-OpenViking-Caller` 头贯穿 middleware → http.request payload → projection → request_audit 新列 `caller`；schema v5→v6 增量迁移（不删数据），实测 meta version=6、列存在。
- ✅ A1：`_trim_audit_rows` 对 `status_code>=400` 豁免按条数清除；实测人为触发 400（INVALID_ARGUMENT）后明细行落库（route=/api/v1/search/find, api_type=search.find, caller=probe-test）。
- ✅ A3：`server/routers/sessions.py create_session` 捕获 `AlreadyExistsError` 幂等返回既有会话（`existed: true`）；实测同 session_id 连发两次均 200、existed=True、409 零新增。
- ✅ A0（插件）+ A2：pnpm patch `@openviking/dsh-memory-plugin@0.5.33`——`ov-http.mjs` 支持 `caller` 选项发 `X-OpenViking-Caller`（auto-recall / profile-inject / capture / background-extract / session-create）；`profile-inject.mjs readProfile` 读前 ls 判存在，缺失 warn 一次并跳过（消除每 turn 404）。node --check 全过，patch-commit 成功，toolSurface 补丁保留。
- ⏳ 插件改动生效需重启 dsh web（新会话验证：连续 5 turn content/read 404 零新增；request_audit caller 非空率 100%）。
- 📁 备份与验证脚本：`~/.dsh/patches/openviking-audit-phaseA/`（6 个 .py/.mjs 的 .bak-20261113A + check_schema.py + verify_a1_a0.py）；回滚 = 还原 .bak 并重启 openviking-server。
- ⏳ B1 ov.conf（低峰执行，暂缓）。
- ⏳ 上游 clone（github.com/volcengine/OpenViking → D:\repository\OpenViking，blobless）进行中，用于 worktree+分支存档服务端改动。
