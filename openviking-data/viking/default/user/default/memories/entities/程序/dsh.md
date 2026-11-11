# dsh
DeepSeek Harness (DSH)：用户 AI 会话工作台；历史会话规划导入 OpenViking 作长期记忆。

## 基本统计
- 总会话 1602（as of 2026-11-04）；2026-11-09 审计见 1,753 个会话日志（10-26 批量导入 1,232 后共 1,755；仅 463 个有 token 计量）
- source.kind === "user" 为真实人类输入需保留，其余注入上下文过滤
- 2026-11-02 distill：memories-final.json（"Taixing mini-program" 162 项）+ distilled-projects/（831 项）；结构化总计 4431（bug 1712/pattern 941/preference 923/fact 571/workflow 284）

## 集成
- 官方 @openviking/dsh-memory-plugin 实时镜像会话到 OpenViking；导入顺序 DSH 先，再 cursor/workbuddy/opencode
- 2026-11-05 会话 dsh-session-fe39d020 调 OpenViking MCP 写 29 条记忆；09:58 extracted=40、commits=48 仍在更新

## 技能与插件
- 技能仓库 D:/repository/skills（运行时 C:\Users\Administrator\.dsh\skills 指向此）
- 本地插件 dsh-token-guard、dsh-cost-meter、dsh-orchestrator、agent-guard 符号链接到 ~/.dsh/，零依赖
- agent-guard lib/scope.js（as of 2026-11-10）：仓库根/受保护容器/工作区根 grep、glob 直接拒绝；git 仓库根探测；openviking search 别名 queries→query
- agent-guard 2026-11-11 新增 repairPwshAtBrace（pwsh 命令未加引号 @{} 自动补单引号，修复 git rev-parse @{u} 类错误）与 warnPwshBuffering（命令含 Out-String/Format-Table/ConvertTo-Json/ConvertTo-Csv 时返回纯告警提示后台任务改用 2>&1 或 *> 流式重定向，不改命令）；P1-5 pwsh POSIX 预检、P1-6 glob 路径规范化、P1-7 重复整读拦截在 lib/rules.js + lib/index.js
- cost-meter（as of 2026-11-11）：perStepOutputBudget=3000、bareReasoningBudget=1500；规则 A/B/C；closing-check 文案；fired 改按 turn 计数且仅对上一步生效；规则 A 升级 bareReasoningEscalate（连续2个纯推理步升格硬中断要求下一步调工具，对应审计 P0#1）；P0-4 白名单文案、P3-11 意图→todo、P3-12 改前 build 基线、P3-13 证据门禁在 lib/index.js
- dsh-token-guard（as of 2026-11-11）：capGrep 命中 >20 或 >10 文件即截断只返回文件列表+行号（P0-1）；read 无 offset/limit 且 >300 行直接拦回不返内容（P0-2），带 range 且 >500 行兜底截断；skill >2500 字截断
- 2026-11-09：dsh-context 插件 v0.83.0；token-frugal 含 audit-tokens.mjs；新增 token-optimizer 技能
- 2026-11-11 降本优化新增 agent-cost-hygiene（大文件/grep 保护）、zentao-analyzer（先查数据阻塞 gate）、submodule-commit（commit→build→resolve 顺序）技能更新
- git-ab.mjs（as of 2026-11-11）：submodule-commit/scripts/git-ab.mjs 封装 git rev-list --left-right --count 为 ahead=X behind=Y（实测 ahead=8 behind=0），SKILL.md 步骤 0/5 改用
- AGENTS.md 为符号链接（as of 2026-11-10）；2026-11-11 加指针（开工走 worktree-snapshot、提交走 submodule-commit、出现 Option 1/2/3 就查一条命令）与「修改+验证+提交先 todo_write」规范
- DBX.md / SKILL.md / tool-call-hygiene 前述各项更新（as of 2026-11-10）
- zentao-resolve.mjs（as of 2026-11-11）：新增 --comment-file <path> 与 --comment-b64 <base64> 传参，位置参数保留兼容；脚本内部做 '→'' 转义并去末尾换行，消除 PowerShell 引号地狱（对应审计 P5-19，--comment-b64 早已支持）

## 配置变更
- web profile：spill-policy.maxInlineTokens 3000→1500、retainTokens 20000→12000，repeat-tool-reminder 2/4/6（as of 2026-11-10）
- cordis.patch.yml：语义召回 recallLimit 3、recallMaxTokens 700，Profile 预算 800；mcp 收为单一 mcp_gateway（as of 2026-11-10）
- profile-inject.mjs 清空 preferences/entities 目录清单（as of 2026-11-10）
- MCP 代理 tools/list 过滤 OPENVIKING_MCP_TOOL_ALLOW=search,find,read,remember,write（as of 2026-11-10）

## 关键提交
- 86279dd0（as of 2026-11-10）：bug6369 优化机制落地，10 文件 +245/−12
- 832ae94a（as of 2026-11-10）：补丁覆盖 reasoning 1.5k 刹车、DBX 手册、SKILL 瘦身、worktree 预检脚本、cost-meter 10k 阈值
- 0f3f30e5（as of 2026-11-10）：仅提交未推送，落地 bug6401 报告增量
- bcab4712（as of 2026-11-10）：bug6402 P0 改进落地，本地提交未推送，超前 origin/main 1 提交
- db769807（as of 2026-11-11）：审计 P0/P1 落地——cost-meter bareReasoningEscalate + agent-guard repairPwshAtBrace + agent-cost-hygiene 规则，仅提交未推送
- da9a1757（as of 2026-11-11）：补全审计剩余可行项——agent-guard warnPwshBuffering + zentao-resolve 长文本走文件/base64，仅提交未推送
- 6e78f365（as of 2026-11-11）：落地 session.v4 审计优化（19条→13条落地+6条平台限制标注），13文件 +600/−48，含 git-ab.mjs 与 dsh/reports/optimization-landing-2026-11-11.md，仅提交未推送

## 会话审计
- 82f91e66（as of 2026-11-10）：64 次工具返回 86,349 字符
- 9bbaca36（as of 2026-11-10）：51 步 84 次工具；仅 3 步真实记账 totalTokens 199,012；48 步 usage=0 不可审计
- bug6401（as of 2026-11-10）：43 步完成修复推送回写闭环，等效 ~167k
- 门户H5（as of 2026-11-10）：23 步完成对接闭环，等效 ~150k
- session.v4.json（bug 6452，as of 2026-11-11）：成功修复（定位准/修复对/已回写+已推送）但等效 158k，浪费在重复读取/整读大文件/无效 grep/自我辩论；turn1 把门户编译失败留到 turn2

## 待观察
- cost-meter 10k 阈值线上仍报 15k（需重启 Web 部署 cordis.patch 后新会话生效）（as of 2026-11-10）
- dsh/cost-meter/selftest.mjs +52 行上会话遗留未提交（as of 2026-11-10）；2026-11-11 自测通过但安装副本仍旧需重启
- worktree-snapshot/scripts/snapshot.ps1 本仓跑通：`main | dirty=5 | 6e166ee91796`（as of 2026-11-11）
- submodule-commit/SKILL.md 只放 7 步清单（as of 2026-11-11）


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh",
  "source_extraction_id": "c9b2869e096e448fbf6f2d739d1add2d",
  "version": 30,
  "memory_type": "entities"
}
-->