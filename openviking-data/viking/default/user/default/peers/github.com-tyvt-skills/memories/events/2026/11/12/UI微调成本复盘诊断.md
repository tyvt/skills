# Summary
2026-11-12 用户发布对一次 9 条 UI 微调任务的成本复盘：实际仅约 60 行纯 CSS 单值 + 1 个静态页改动，却消耗 1M 等效 token、经历 4 次 plan_review 打回、50 次编排器调用、耗时 21 分钟。根因为证据后补、plan 全文重写、逐条命令执行三者的叠加；并量化了四大浪费点（plan 全文重写、大文件重复整读、逐类 grep、逐张图 vision）与主要时间块（plan_review 往返、ask_user_question 分散、编排器三层 guard）。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 复盘：9 条 UI 微调 → 1M token / 4 轮审 / 21 分钟
一句话诊断：实际改动仅约 60 行、纯 CSS 单值 + 1 个静态页，却烧掉 1M 等效 token、4 次 plan_review 打回、50 次编排器调用。根因是三个动作叠加：证据后补（每轮 reject 才补 grep/接口证据）、全量重写（plan 文件整篇 write 4 次）、逐条命令（一个类一次 pwsh、一张图一次 vision）。

一、成本：最大浪费在"重写"和"重复读"
浪费点	量化	改法
Plan 全文重写 4 次（rev1→rev4，每次 3-4k output + 全量送审）	~12k output + 8k input 未命中	① 先查全证据再写 plan；② 被打回只 edit 增量，不 write 全量；③ 送审只发"变更段落+证据"，不发整篇
大文件全量 read：records/index.vue(243行) 读 3 遍、theme.css 读 3 遍、触发 spill 回读	每次 2-4k token，且随上下文增长重算	首次就 read offset/limit 分段；改前用 grep 定位行号，只读目标段
逐类 grep：pc-stat-label/pc-kv/... 循环 7 次 pwsh	7 次调用 + 7 份路径/行文本回灌	一条 Select-String -Pattern 'a|b|c' 或 grep -E 一次出全量
7 张图逐张"详细描述布局"	每张 1-2k token 的泛描述	一次多图 + 只问"红框圈住什么、标注什么数值"，不要"整体布局"
关键认知：10.43M 输入里 99% 是缓存命中，真实未命中只有 84.5k。成本大头是每次 write/重写导致的上下文失效重算和输出 token（plan 重写 4 次就占 12k）。降本优先级：减少 write 全量 > 减少 read 重复 > 减少输出长度。

二、时间：plan_review 往返 + 用户问答 = 主要等待
plan_review 4 轮（reject×3 → pass）是最大时间块，每轮 reviewer 生成 4k-8k token，约 1-2 分钟，合计 6-8 分钟纯等待。

根因：reviewer 的 8 条意见里，6 条是"证据未给全"（类引用面、--c-brand 值、接口 401、路由守卫、文件映射），这些在写 plan 前一次性查完就能消掉 80%。

改法：plan 固定章节「已核验事实 + 证据命令 + 结果」，一次写全；对纯样式单值批次，plan 用表格化短版（这次 rev4 就比 rev1 短且一次过），review 聚焦"证据齐不齐"而非"方案完不完美"。

ask_user_question 4 次（Bug1 方案 / 协议文本 / 计划确认 / Plan 确认），每次等用户几十秒到几分钟。

改法：能推断的合并成一次问。Bug1 方案可默认"参考苏住房C端 + 静态占位"直接写进计划，最终用一次确认框收口（这次后两次其实可合并为一次）。

编排器 50 次调用 × 每步 guard 链（escalate→defer→final 三层），每次 7 秒左右，约 6 分钟。

三、Agent 执行问题（这次真实踩到的）
问题	表现	改法
基线假阳性	第一次 vue-tsc 编排器 summarize 报 "exit=0 / 0 error"，实际 26 个预存在错误	基线只认 exit code + error TS 计数，不信 summarize 的"成功"措辞；用 git stash 前后对比坐实"预存在"（这次第二次做对了）
视觉验证事后跳过	计划写了方案 A/B，实际直接写"未执行"	计划阶段就定"无 H5 时谁验、时限、回传物"，不要让验证变成收尾的软项
重复工具调用	同一 edit 调用两次；old_string 不匹配重试	edit 前先 read 确认当前内容；被 repeat-reminder 警告立即换参数
cost-meter 告警未响应	150k、1.01M 两次告警后仍做全量 plan 重写/全量 read	告警即切"窄命令 + 增量 edit"模式，停止任何全量 write
编排器 summarize 二次开销	每个 execute 后再 summarize 一次	窄只读命令直接回 stdout，不需要 summarize 层
四、编排器配置建议（省 30-40% 子进程开销）
只读命令白名单：Get-Content / Select-String / Test-Path / Get-ChildItem（非递归）/ git status|log|diff 直接放行，跳过 flash→defer→final 三层 guard。...

<!-- MEMORY_FIELDS
{
  "event_name": "UI微调成本复盘诊断",
  "goal": "记录复盘结论",
  "summary": "2026-11-12 用户发布对一次 9 条 UI 微调任务的成本复盘：实际仅约 60 行纯 CSS 单值 + 1 个静态页改动，却消耗 1M 等效 token、经历 4 次 plan_review 打回、50 次编排器调用、耗时 21 分钟。根因为证据后补、plan 全文重写、逐条命令执行三者的叠加；并量化了四大浪费点（plan 全文重写、大文件重复整读、逐类 grep、逐张图 vision）与主要时间块（plan_review 往返、ask_user_question 分散、编排器三层 guard）。",
  "ranges": "0-15",
  "source_extraction_id": "af8a0d2457fd46729286607bdb7e8299",
  "version": 1,
  "memory_type": "events"
}
-->