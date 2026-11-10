# dsh
DeepSeek Harness (DSH)：用户 AI 会话工作台；历史会话规划导入 OpenViking 作长期记忆。

## 基本统计
- 总会话 1602（as of 2026-11-04）；2026-11-09 审计见 1,753 个会话日志（10-26 批量导入 1,232 后共 1,755；仅 463 个有 token 计量）
- source.kind === "user" 为真实人类输入需保留，其余注入上下文过滤
- 2026-11-02 distill：memories-final.json（"Taixing mini-program" 162 项）+ distilled-projects/（831 项）；结构化总计 4431（bug 1712/pattern 941/preference 923/fact 571/workflow 284）

## 集成
- 官方 @openviking/dsh-memory-plugin 实时镜像会话到 OpenViking；导入顺序 DSH 先，再 cursor/workbuddy/opencode
- 2026-11-05 会话 dsh-session-fe39d020 调 OpenViking MCP（search ~45、read ~35、remember ~9）写 29 条记忆（write 11/edit 17）；09:58 extracted=40、commits=48 仍在更新

## 技能与插件
- 技能仓库 D:/repository/skills（运行时 C:\Users\Administrator\.dsh\skills 指向此）；dsh/agent-guard 别名 schedule_update→schedule_edit；tool-call-hygiene 含 morning-report.mjs（24h 窗口统计）
- agent-guard lib/scope.js（as of 2026-11-10）：仓库根/受保护容器/工作区根 grep、glob 直接拒绝并回缩范围；git 仓库根探测；openviking search 别名 queries→query（数组解包）
- cost-meter perStepOutputBudget=3000（as of 2026-11-10）：超阈值注入「停，立刻调工具拿事实」；perStep 未命中提醒改三种成因排序（grep 缩范围/先查真实值/read offset）；2026-11-10 工单 B 增 reasoning-watchdog（无工具调用且 output>1500）与 closing-check（turn 有 git commit 无 token-optimizer）
- 2026-11-09：dsh-context 插件 v0.83.0（Context Insights 面板、/context）；token-frugal 含 audit-tokens.mjs；新增 token-optimizer 技能
- 本地插件 dsh-token-guard、dsh-cost-meter、dsh-orchestrator 符号链接到 ~/.dsh/，零依赖
- AGENTS.md 为指向 D:\repository\skills\dsh\AGENTS.md 的符号链接（mode 120000），仓内副本即同一文件（as of 2026-11-10）
- DBX.md（as of 2026-11-10）：取详情要点第 5 条定死「先查数据再推理」；禁忌第 1 条 ALL_TABLES + LIKE 找表（点名 dbx_list_tables pattern 坑）；禁忌 1 与 INSERT 14 列两条标「连续两届踩坑 bug6369/bug6401」高亮
- SKILL.md（as of 2026-11-10）：决策树第 7 条 + 开工前置第 1 条补 git submodule status + 每子模块 git -C <仓> worktree list；决策树第 3 条 + 取截图节默认 analyze_image 替代 read_image；标准流程第 2 步列宽类 3 步不读截图；第 4 步 gitlink 先 git submodule status 判 + 再 add
- AGENTS.md（as of 2026-11-10）：收尾第 9 条 + zentao-analyzer 标准流程第 6 步交付前跑 token-optimizer 自查；1.5k reasoning 刹车已写入
- tool-call-hygiene/SKILL.md（as of 2026-11-10）：自愈表新增 '@{u}' 单引号、worktree 相对路径先 Test-Path

## 配置变更
- web profile：spill-policy.maxInlineTokens 3000→1500、retainTokens 20000→12000，repeat-tool-reminder 3/5/8→2/4/6（as of 2026-11-10）
- cordis.patch.yml：语义召回 recallLimit 3、recallMaxTokens 700，Profile 预算 800；mcp-dbx(25 工具/20,357 字符) 与 mcp-context-mode(11 工具/27,899 字符) 收为单一 mcp_gateway(约 826 字符)（as of 2026-11-10）
- profile-inject.mjs 清空 preferences/entities 目录清单，新会话 Profile 仅含身份与 5 条核心规范（as of 2026-11-10）
- MCP 代理 tools/list 过滤，OPENVIKING_MCP_TOOL_ALLOW=search,find,read,remember,write；add_resource、privacy_tree 等不进工具表（as of 2026-11-10）

## 关键提交
- 86279dd0（as of 2026-11-10）：bug6369 优化机制落地（agent-guard scope.js 拦截、cost-meter 熔断、DBX/SKILL/AGENTS 文本规则更新），10 文件 +245/−12
- 832ae94a（as of 2026-11-10）：今早补丁，已覆盖 reasoning 1.5k 刹车、DBX 手册、SKILL 瘦身、worktree 预检脚本、cost-meter 10k 阈值（文件已改，线上未生效）
- 0f3f30e5（as of 2026-11-10）：仅提交未推送，4 文件 +14/−6，落地 bug6401 报告增量 5 条（SKILL.md/DBX.md/tool-call-hygiene/SKILL.md/CASES.md）；CASES.md 写 bug6401 反样本，已提交 OpenViking 抽取 task 882185fc
- bcab4712（as of 2026-11-10）：bug6402 P0 改进落地（agent-cost-hygiene 本机构建与止损 + tool-call-hygiene 两行），本地提交未推送；git push 两次 Connection was reset，本地 main 超前 origin/main 1 个提交

## 会话审计
- 82f91e66（as of 2026-11-10）：64 次工具返回 86,349 字符（read 41%+grep 34%）；上下文 tools 占用 8,971 token 为宿主内置 schema 非 MCP
- 9bbaca36（as of 2026-11-10）：51 步 84 次工具；仅 3 步真实记账 totalTokens 199,012（input 45,645+output 535+cacheRead 152,832）；48 步 usage=0 不可审计（harness 记 usage=0 无标记）；无效调用 9 次 seq 31/36/148/171/214/219/303/307/348；grep17/read20/mcp_gateway28/edit5/图片2；交付 session-9bbaca36-cost-plan.md
- bug6401（as of 2026-11-10）：43 步完成修复→推送→回写禅道→更新台账全闭环，等效成本 ~167k，触发 1 次 compaction；浪费：读图 43k、全文读 20k、reasoning 内耗 15k+、7 次本可避免工具失败；本次分析会话(0f3f30e5 对话)等效 ~152k，超支主因开场两轮大范围检索
- 门户H5文档对接（as of 2026-11-10）：23 步完成 5 接口+2 页面+store+样式对接闭环，等效 ~150k，零工具失败、零 reasoning 内耗、零 compaction；浪费在探索散读 6 次与读无用文件（aes.ts/home/index.vue/README）；审计 P0-P3 改进已增量写入 agent-cost-hygiene 技能并提交推送

## 待观察
- cost-meter 10k 阈值线上仍报 15k（部署链路问题，需重启 Web 部署 cordis.patch 后新会话生效）（as of 2026-11-10）
- dsh/cost-meter/selftest.mjs +52 行上会话遗留未提交，bcab4712 未含此文件，工作区现仅此一处遗留改动（as of 2026-11-10）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh",
  "source_extraction_id": "05a10352d56d4bffae9e7b14f7dcfb13",
  "version": 25,
  "memory_type": "entities"
}
-->