# Summary
用户于2026-11-10提供日志，显示某会话token从事故时约50万降至57,332，规则层生效但机制层未落地；列举指标对照、生效规则、未生效浪费源（skill全文注入22k、reasoning约1.3-1.5万、DBX手册缺两条导致4次无效往返、cost-meter阈值未下调、截图落仓库根、明文密码进上下文），并给出按性价比排序的补丁建议。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 这份日志是规则层生效、机制层未落地的典型样本。token 从事故时的 ~50 万降到 5.7 万（目标 ≤8 万），但降本主力是“不整读 + 窄 lint + 一次成稿”，不是方案里的脚本和 cost-meter。

指标对照
指标	目标	本次实测	判定
单会话总 token	≤8 万	57,332	✅
compaction	≤1	0（无 compaction 事件）	✅
同文件重复读	≤2	1 次/文件，无重复	✅
DBX 无效往返	≤2	~4 次（2×CONNECTION_NOT_FOUND + 1×list tools + 1×steps 重查）	❌
全量 lint 回灌	0	只跑单文件 npx eslint，输出 2 行	✅
整读 >300 行文件	应走 orchestrate	2 次违反：WorkCardDialog.vue 306 行、InfoCardDialog.vue 335 行	❌
生效的规则（可复用）
先定落地位置：git worktree list + 父/子模块 status 一次做完，没有进错 worktree（事故 6023 的防线起作用了）。

窄验证：改一个文件只跑 npx eslint <file>，提交时 lint-staged 自动补了 --fix，没有 57KB 回灌。

收尾用卡片问：ask_user_question 给三选项，没有在正文末尾问“要吗”。

子模块先行：只 add 了 WorkCardDialog.vue，env/.env 和一堆历史临时文件没被夹带。

DBX 事务化回写：open→begin→update→insert→commit→verify→close 全链路，落库复核到位。

没生效 / 新发现的浪费源
1. skill 全文注入是最大单点浪费（22k 未命中）
skill 工具一次调用就把 17KB 的 zentao-analyzer 全文注入，还 spill 了 8486 字节。方案落点 3 说“细节按需加载”，但工具层没有按需能力——这是结构性缺口，不是 agent 自觉能解决的。

2. reasoning 是第二大可控项（约 1.3–1.5 万 output）
单步 reasoning 最高 3945 tokens（seq 114，反复自我辩论 flex 收缩、宽度估算、要不要改 dialog width）。这些辩论本该用一次 grep 或一次截图解决，却在脑内演算。

3. DBX 手册仍缺两条（直接导致 4 次无效往返）

首次 dbx_execute_query 必须带 connection_id 或 connection_name，手册只写了“传 session_id 时仍要 connection_id”，没写“首次也要”。

steps 字段被 MCP 按 cell 200 字截断，SUBSTRING 分段仍拿不全；应改成 UNION ALL 每段一行，或直接 dbx_execute_and_show。

4. cost-meter 阈值没下调
seq 28 仍报“>15k”，说明方案 3.2 的 15k→10k 没执行。这条没落地，cost-meter 就只是噪音。

5. 截图落在仓库根
bug6420_screenshot.png 直接写进工作区根目录，和已有的 .tmp-bug6424/、bug6417_*.png 同类。应统一落 .tmp-bug6420/。

6. 明文密码进上下文
读了 credentials.py，Field123456 进了会话历史。脚本内部读取即可，不必让模型看见。

建议补丁（按性价比排序）
zentao-analyzer/SKILL.md 顶部压到 20 行决策树，DBX 细节拆到 DBX.md，按需 read —— 直接砍掉那 22k。...

<!-- MEMORY_FIELDS
{
  "event_name": "token优化日志复盘",
  "goal": "复盘token优化样本",
  "summary": "用户于2026-11-10提供日志，显示某会话token从事故时约50万降至57,332，规则层生效但机制层未落地；列举指标对照、生效规则、未生效浪费源（skill全文注入22k、reasoning约1.3-1.5万、DBX手册缺两条导致4次无效往返、cost-meter阈值未下调、截图落仓库根、明文密码进上下文），并给出按性价比排序的补丁建议。",
  "ranges": "0-12",
  "source_extraction_id": "1bfc4615eb964ae588e4bd9412e5f83e",
  "version": 1,
  "memory_type": "events"
}
-->