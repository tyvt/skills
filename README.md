# skills

本地技能库与 DSH 插件集合（DeepSeek Harness / WorkBuddy）。

## 技能（skills，每个含 `SKILL.md`）

### 通用 / 工作流
- `decision-options` — 需用户决定的事项一律转成可点击选项框
- `tdd` — 测试驱动开发红绿重构纪律
- `dsh-explore` — 把定位探索外包给只读子代理，主会话只收 ≤30 行结论
- `worktree-snapshot` — 开工前一次性拉全 worktree/子模块快照
- `repo-safety` — Git 提交/推送/worktree 隔离安全底线
- `submodule-commit` — 子模块改动固定提交顺序

### Token / 成本治理
- `dsh-token-policy` — DSH 会话 token 与编排器路由阈值细则
- `agent-cost-hygiene` — 会话 token/成本卫生（读文件、反空转、构建止损）
- `token-frugal` — 会话 token 用量审计（按未命中/工作流根因）
- `token-optimizer` — token/成本降本清单
- `vite-build-profiler` — 打包慢/包大时先出可视化报告定位真凶

### 前端交付 / 工具
- `web-deploy` — 前端本地交付：禁 dev server，构建后用 nginx UI 部署
- `captcha-recognizer` — 图片验证码 OCR（算术/文本型）用于自动化登录
- `tool-call-hygiene` — 工具调用失败自愈手册 + 失败率审计

### 禅道 / 协作
- `zentao-analyzer` — 禅道 Bug/任务分析与回写、批量查询、周报

### OpenViking 记忆
- `openviking-memory` — OpenViking 记忆库文件级快照备份（git 内，换机可恢复）
- `openviking-autostart` — OpenViking 服务不可用时检测并拉起本机服务

## 其它目录

- `dsh/` — DSH harness 的 cordis 插件集合（agent-guard、cost-meter、dcwhc、mcp-gateway、orchestrator、orchestrator-gate、plan-gate、token-guard、token-models 等）。详见各插件 `README.md` / `DESIGN.md`。
- `controller-bench/` — controller 评测基准（非 skill，含运行/打分脚本）。
- `cursor-model-routing/` — Cursor 模型分流测试集与实测矩阵。
- `scripts/` — OpenViking 记忆快照同步等仓库级脚本。
- `openviking-memory/` — 记忆快照（随 git 同步，换机拉取即可用）。
- `openviking-data/` — OpenViking data 全量异地备份（含 memories/peers/sessions/skills/resources + vectordb；`scripts/snapshot-openviking-data.mjs` 每日同步 `--commit --push`）。恢复时复制回 `~/.openviking/data/` 并重启服务。
- `memory-migration-archive/` — 历史迁移归档。
- `data/` — 本地数据。
