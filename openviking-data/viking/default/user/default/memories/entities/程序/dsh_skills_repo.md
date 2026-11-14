# dsh_skills_repo
DSH 技能与插件仓库：位于 D:/repository/skills，运行时目录 C:\Users\Administrator\.dsh\skills 指向该仓库。

## 结构与插件
- 仓库 D:/repository/skills（运行时 C:\Users\Administrator\.dsh\skills 指向此）；dsh-token-guard、dsh-cost-meter、dsh-orchestrator、agent-guard 符号链接到 ~/.dsh/，均零依赖
- agent-guard、cost-meter 的规则/参数/升级细节见 agent_guard、cost_meter 实体卡（as of 2026-11-14）
- 2026-11-09 dsh-context v0.83.0、token-frugal 含 audit-tokens.mjs、新增 token-optimizer 技能；2026-11-11 新增 agent-cost-hygiene（大文件/grep 保护）、zentao-analyzer（先查数据阻塞 gate）、submodule-commit（commit→build→resolve 顺序）

## 脚本与规范
- submodule-commit/scripts/git-ab.mjs 封装 git rev-list --left-right --count 为 ahead=X behind=Y（实测 ahead=8 behind=0），SKILL.md 步骤 0/5 改用（as of 2026-11-11）
- AGENTS.md 为符号链接（as of 2026-11-10）；2026-11-11 加指针（开工走 worktree-snapshot、提交走 submodule-commit、出现 Option 1/2/3 就查一条命令）与「修改+验证+提交先 todo_write」规范，DBX.md/SKILL.md/tool-call-hygiene 同步
- ~/.dsh/AGENTS.md 规定：计划须先通过审查并经人工确认后才能修改文件（as of 2026-11-14）
- zentao-resolve.mjs 新增 --comment-file <path>、--comment-b64 <base64>，位置参数兼容，内部做 '→'' 转义并去末尾换行，消除 PowerShell 引号地狱（审计 P5-19）

## 提交、审计与待办
- 关键提交（均仅提交未推送）：86279dd0（bug6369，10 文件+245/−12）、832ae94a（reasoning 1.5k 刹车/DBX 手册/SKILL 瘦身/worktree 预检/cost-meter 10k 阈值）、0f3f30e5（bug6401 报告增量）、bcab4712（bug6402 P0，超前 origin/main 1）、db769807（cost-meter bareReasoningEscalate+agent-guard repairPwshAtBrace+agent-cost-hygiene）、da9a1757（agent-guard warnPwshBuffering+zentao-resolve 长文本走文件/base64）、6e78f365（session.v4 审计优化 13 文件+600/−48，含 git-ab.mjs 与 optimization-landing-2026-11-11.md）（as of 2026-11-10/11）
- 会话审计：82f91e66（64 次工具 86,349 字符）、9bbaca36（51 步 84 工具仅 3 步记账 199,012）、bug6401（43 步 ~167k）、门户 H5（23 步 ~150k）、session.v4.json（bug6452 成功但 ~158k 浪费于重复读取/整读大文件/无效 grep/自我辩论，turn1 留门户编译失败到 turn2）（as of 2026-11-10/11）
- 待观察：cost-meter 10k 阈值线上仍报 15k，需重启 Web 部署 cordis.patch；dsh/cost-meter/selftest.mjs +52 行遗留未提交但 2026-11-11 自测通过，安装副本仍须重启；worktree-snapshot/scripts/snapshot.ps1 跑通 `main | dirty=5 | 6e166ee91796`；submodule-commit/SKILL.md 只放 7 步清单（as of 2026-11-10/11）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_skills_repo",
  "source_extraction_id": "2389fa8cbc7e404f80af333df09282d2",
  "version": 3,
  "memory_type": "entities"
}
-->