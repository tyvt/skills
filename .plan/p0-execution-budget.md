---
status: approved
human_confirmed: true
review_verdict: pass
review_score: 79
reviewer: workbuddy/deepseek-v4.1-flash
---
# 四批次执行确定性与上下文预算

## 前因、证据与归因
用户采纳四批次方案，确认实施并授权提交推送。原会话cwd错误为2次；日志回灌同时来自编排器与直跑工具。重复执行、编排与日志回灌时间有重叠，收益不可相加。本次初始full核验出现120秒stall，熔断后改窄工具。原工作区325脏项不纳入提交，实施位于独立分支feat/p0-execution-budget-20261113。

## 实施与验收
代码任务、owner、命令与结果见下表；不追加常驻治理长文。

| 批次 | owner | 交付范围 | 验收命令（仓库根） | 状态 |
|---|---|---|---|---|
| B1 | execution-impl / lead | execution.py、graph、桥接：workdir、真实exit、结构化快路径、流式脱敏日志 | node dsh/scripts/verify-p0.mjs --batch 1 | 通过（exit=0） |
| B2 | plan-audit / lead | plan_versions/API/plan-gate：delta重建、版本与人工确认SHA绑定 | node dsh/scripts/verify-p0.mjs --batch 2 | 通过（exit=0） |
| B3 | gate-impl | shared策略、直跑预算、p0_log_read、gate拒绝建议 | node dsh/scripts/verify-p0.mjs --batch 3 | 通过（exit=0） |
| B4 | lead | 意图判断、环境预检、离线验收runner | node dsh/scripts/verify-p0.mjs --batch 4 | 通过（exit=0） |

## 调用契约与启用
已知命令：`orchestrate {op:"full",workdir:"D:\\repository\\项目",execution:{program:"npm",args:["run","build"]}}`。未知请求使用full+request+workdir；省略workdir明确拒绝，不再回退默认目录。快路径当前仅包管理build/test/lint、pytest、Git只读、node版本探针；不支持任意脚本或Git写入。已授权提交推送由常规Git工具完成。

复审：`op:"plan_review"`携workdir/plan_path/base_sha/base_version/delta:[{old,new}]，不再携plan全文。人工确认元数据需status/human_confirmed/approved_sha256/approved_version；修改正文后旧确认失效。

本轮仅分支落地与推送，不重启当前GUI，也不把独立worktree路径改成运行配置。现有主目录有并发脏改动，启用前需将本分支代码与它们合并，经测试后部署plugins及shared，再开启新会话；不能声称当前GUI已经生效。

## 预算
执行成功800字符，失败3200字符且最多10关键行；审核4000字符；grep/glob/read/直跑pwsh为3200字符。字符帽是token代理。logRef窄读每次2000字符/40行，每日志每会话3次、累计6000字符。完整执行日志固定根、脱敏保存；直跑工具仅缓存脱敏受限片段。两种引用分别由orchestrate/log_ref与p0_log_read读取，不混用。

## 实测验收证据
2026-11-13：四批runner 10组全部exit=0；Python全量87 passed，1条上游LangChain弃用警告；plan-gate 21项、agent-guard 90项及其integration16项通过；插件、shared、意图与环境预检均通过。独立review发现的对象metadata丢失已修复并窄读复核无阻断。详细结果在.task-state/p0-verification.json，日志默认不进Git。

完整构建未执行：本仓交付为Python源码与零依赖Node插件，无统一应用build；已执行Python全量、插件自测、JS语法/Python编译检查和临时项目真实npm build（无网络）。cost-meter既有日志fixture缺失项仍skip，未伪称覆盖。未部署当前GUI；实际同类会话降本比例尚未测量。

## 风险、回滚与验证
改前字节副本及SHA保存在.task-state，各批隔离测试不用真实模型。计划差量基准冲突、内容变更、旧pass、异session均拒绝。旧审批需要重新审核，人工确认写approved_sha256和approved_version。结构化快路径白名单禁shell与inline eval，提交推送仍走已授权Git操作。回滚仅撤本分支提交，不restore主工作区。

instructions精简属于前置范围，仅精简dsh/AGENTS.md直接冲突的路由条款；用户目录常驻规则未擅改。部署需同带shared兄弟目录；本会话schema不热重载，不中断当前GUI，新会话启用后再做真实任务验证。

可归零项：cwd静默回退、错误exit被记成功、同版复审重复全文、无界日志返回。结构性下限：初始system/tools、正常对话增量。耗时25%-35%、未命中20k-25k只是后续5-10同类任务的待验证目标，不算本轮已实现收益。
