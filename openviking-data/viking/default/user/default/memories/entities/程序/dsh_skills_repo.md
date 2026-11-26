# dsh_skills_repo
DSH 技能与插件仓库，本体 D:/repository/skills，运行时目录 C:\Users\Administrator\.dsh\skills 指向它。

## 结构与插件
- dsh-token-guard、dsh-cost-meter、dsh-orchestrator、agent-guard 均符号链接到 ~/.dsh/，全部零依赖；规则/参数/升级细节见 agent_guard、cost_meter 实体卡（as of 2026-11-14）
- 2026-11-09 有 dsh-context v0.83.0、token-frugal（含 audit-tokens.mjs）、新增 token-optimizer 技能；2026-11-11 新增 agent-cost-hygiene（大文件/grep 保护）、zentao-analyzer（先查数据阻塞 gate）、submodule-commit（commit→build→resolve 顺序）
- 2026-11-26 新增 deploy-dashboard-audit 独立 skill（audit_dashboard.py 只读审计 C1–C4 + SKILL.md）软链入 catalog，README.md:25 补引用；agent-guard 增 decideDashboardAudit 规则与 dashboardAudit=warn 配置

## 脚本与规范
- submodule-commit/scripts/git-ab.mjs 封装 git rev-list --left-right --count 为 ahead=X behind=Y（实测 ahead=8 behind=0），SKILL.md 步骤 0/5 改用（as of 2026-11-11）
- AGENTS.md 为符号链接（as of 2026-11-10），2026-11-11 加指针（开工走 worktree-snapshot、提交走 submodule-commit、出现 Option 1/2/3 就查一条命令）与「修改+验证+提交先 todo_write」规范，DBX.md/SKILL.md/tool-call-hygiene 同步；~/.dsh/AGENTS.md 规定计划须先审查并经人工确认才能改文件（as of 2026-11-14）
- zentao-resolve.mjs 新增 --comment-file <path>、--comment-b64 <base64>，位置参数兼容，内部做 '→'' 转义并去末尾换行，消除 PowerShell 引号地狱（审计 P5-19）
- 2026-11-03 tool-call-hygiene/audit.mjs 第27行 dayLabel 用 UTC toISOString 把 +08:00 午夜回拨显示成前一天，已用 shanghaiYMD 按 Asia/Shanghai 取日期修复（显式日期过滤正确、morning-report.mjs 原本正确）；提交 cfac153 到本地 main 快进合并、删 worktree，未推送（as of 2026-11-03）

## 提交与审计
- 关键提交（除注明外均仅提交未推送）：86279dd0（bug6369，10 文件+245/−12）、832ae94a（reasoning 1.5k 刹车/DBX 手册/SKILL 瘦身/worktree 预检/cost-meter 10k 阈值）、0f3f30e5（bug6401 报告增量）、bcab4712（bug6402 P0，超前 origin/main 1）、db769807（cost-meter bareReasoningEscalate+agent-guard repairPwshAtBrace+agent-cost-hygiene）、da9a1757（agent-guard warnPwshBuffering+zentao-resolve 长文本走文件/base64）、6e78f365（session.v4 审计优化 13 文件+600/−48，含 git-ab.mjs 与 optimization-landing-2026-11-11.md）（as of 2026-11-10/11）
- 2026-11-26 commit dfabac27（8 文件：README.md + deploy-dashboard-audit 两文件 + agent-guard 5 文件）已 push 至 origin/main，推送后 ahead/behind=0/0（区别于此前仅提交未推送的提交）
- 第二轮审计落地（2026-11-11，bug6470 类，区别于 bug6452）：14 改+2 新文件（含新增 mcp-gateway/lib/precheck.js），报告 optimization-landing-2026-11-11-v2.md，token-guard/cost-meter/agent-guard/mcp-gateway 四插件自测全绿，未提交未推送待用户定（仅提交/提交并推送/暂不处理）；细节见会话事件「会话审计优化项落地」（as of 2026-11-11）
- 会话审计：82f91e66（64 次工具 86,349 字符）、9bbaca36（51 步 84 工具仅 3 步记账 199,012）、bug6401（43 步 ~167k）、门户 H5（23 步 ~150k）、session.v4.json（bug6452 成功但 ~158k 浪费于重复读取/整读大文件/无效 grep/自我辩论，turn1 留门户编译失败到 turn2）（as of 2026-11-10/11）

## 待观察
- cost-meter 10k 阈值线上仍报 15k，需重启 Web 部署 cordis.patch；dsh/cost-meter/selftest.mjs +52 行遗留未提交但 2026-11-11 自测通过，安装副本仍须重启
- worktree-snapshot/scripts/snapshot.ps1 跑通 `main | dirty=5 | 6e166ee91796`；submodule-commit/SKILL.md 只放 7 步清单（as of 2026-11-10/11）
- 2026-11-26 agent-guard 门禁需重启 dsh web 才在运行时生效，当前 warn 灰度、稳定后 promote block；违规登记清理（C3=32/C4=7）本轮未做，须另立计划（dry-run→apply + 凭据补录）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_skills_repo",
  "source_extraction_id": "cf7b94cf08404ce9a511be4ef677638d",
  "version": 7,
  "memory_type": "entities"
}
-->