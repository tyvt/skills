# 执行确定性与上下文预算治理方案
2026-11-13 针对苏住房防汛C端构建会话 P0 问题交付的优化方案，主题为执行确定性与上下文预算治理；当日已完成四批次代码落地、验证、提交并推送。

## 核心改动（第一批最优先）
- 执行器强制 workdir 为参数（非自然语言），校验目录存在后作子进程 cwd，禁子模型手写 Set-Location/cd，失败返 WORKDIR_NOT_FOUND
- 工具结果硬预算：构建/测试成功 ~200 token、失败 ~800 token（≤10 行关键错误）、计划审核 ~1000 token，完整日志按引用窄读不回传
- 已知命令确定性快路径：git add/commit/status/push、单文件 Get-Content、带 workdir 的 npm run build（失败再升级编排）

## 用户补充修订（落地前采纳）
- 修订 P0-1/P0-3 计数与归因精度：cwd 错误按 2 次计数，回灌覆盖直跑工具
- 预算表补「grep/glob/read 大文件」一行，logRef 窄读设配额防二次回灌
- 验收表区分「可归零项」（cwd、plan 重复）与「结构性下限」（初始上下文、正常对话增量）
- instructions 仅精简冲突路由条款，不追加治理长文；以任务清单+验收脚本（每条 owner、可跑验收命令）跟踪

## 计划与 gate 治理
- 计划首轮全文（≤4k 字符+planId/revision/哈希），复审只传变更段+证据+基准 revision；FS_EDIT_NOT_FOUND 固定「窄读→修正→重试一次」
- gate 首次拒绝返回机器字段（code/ruleId/reason/suggestedAction/retryable），替代命令须来自已知事实（未确认目录则建议列一层结构）
- 测试环境预检（happy-dom 跨源）、门禁识别当前请求动作意图（避免把「只方案」误判为「改+验+提交」）
- 目标文件改前保存副本和 SHA；快路径用结构化程序与参数白名单；日志落盘前脱敏并校验 logRef 和计划路径边界

## 验收目标（基线纯工作 454s）
- 纯工作耗时降 25–35%；宿主未命中 40.6k→20k–25k；编排器子调用 57→减 ≥40%
- cwd 无效执行 2→0；计划 edit 匹配失败 1→0；完整日志进宿主 多次→0
- 用户估「省 30–40% 耗时、50%+ 未命中」列为进阶目标未证实（路径重试/日志/编排耗时重叠不可简单相加）

## 实施批次与落地结果（2026-11-13）
- 第一批：强制有效 workdir、阻止命令自行切目录、真实退出码、结构化命令快路径、流式脱敏日志与结果硬预算
- 第二批：计划 delta 服务端重建、SHA/版本/session/人工确认绑定、同版 pass 直接复用不再调模型或加轮次
- 第三批：共享预算策略、grep/glob/read/pwsh 直跑结果裁剪、带配额日志窄读、结构化拒绝建议、保留对象退出码和 metadata
- 第四批：区分当前行动请求与引用历史、执行前环境预检、带 owner 与分批验收命令的任务清单
- 分支 feat/p0-execution-budget-20261113，提交 11c9ae67；四批 runner 10 组检查全部成功，Python 全量 87 passed
- 独立复核修复直跑工具超预算时对象 metadata 丢失问题；GUI 插件尚未启用该批代码

<!-- MEMORY_FIELDS
{
  "category": "优化方案",
  "name": "execution_budget_plan",
  "source_extraction_id": "2a6098afb58a49e49e723b6a25ecc284",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->