# suspect 记忆消费约束试点（governance-20261118）
这是防止 Agent 把未验时效、缺 frontmatter 或近重复的历史记忆当成当前事实的记忆治理灰度试点。

## 目标与机制
- 核心痛点：旧 bug、旧架构、两条相似登录说明等历史记忆召回后易被当「真理」写进方案或改代码；要求 valid 优先、suspect 先校验、不可逆操作不得单靠 suspect，并标【来源记忆待复核】。
- 试点用 10 条 suspect 样本标出「只能当线索不能当铁证」，10 条是批量打标上限，不再扩标以免放大噪声。
- OpenViking 不在 search/find 结果返回 status/confidence/rank，无法按 status 过滤或自动数「命中 suspect」，只能管 Agent 读进上下文后的行为（软排序 + 提示词灰度）。
- 规则落点 dsh/AGENTS.md:103-112「suspect 记忆消费约束」节，阶段 C 要求会话末记三字段（suspect_hits、direct_adopt_cases、双登录架构同召）。

## 关键文件与验证状态
- 文件：D:\plan\skills\governance-20261118\audit.md（11-18 批次 10 条 suspect/审计）、consumption-log.md、gray-review-7d-20261125.md。
- 截至 2026-11-25 已做：定时任务 schedule-7d-graycheck-20261126 已投递、suspect 规则条文已落盘、复查报告与消费日志模板已新建并读回。
- 未做：阶段 C 三字段在 2026-11-18～2026-11-25 从未自动采集；无 DSH 插件在 auto-recall 时自动写 consumption-log，AGENTS.md 未写死日志路径；无「两登录架构同召回」实时探针；缺日志行时阶段 D 只能标「数据不足」，不能判稳定。

## 触发与扩测
- 复查靠 schedule（schedule_create 用 DTSTART 未来 + RRULE:FREQ=DAILY;COUNT=1 或 at）；灰度规则仅当带 status:suspect 的记忆被读进上下文才生效；指标靠手工往 consumption-log 记数，目前半手动。
- 2026-11-25 发现：suspect 样本多集中在「技术模式」，日常会话大量召回 entities/bug/，约束几乎碰不到；1-2 天见效靠「高频实体进上下文→消费日志有行数」而非日历。
- 用户要求把最近高频对话工作区的真实记忆大量加入测试集加速验证；下一步需确认批量上限与准入条件、近期高频 peer/工作区，并核对 bug 实体中缺 frontmatter 的数量。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "记忆治理",
  "name": "suspect记忆消费约束试点",
  "source_extraction_id": "72bdd78b33b94a1facbe27ad964e69af",
  "version": 1,
  "memory_type": "entities"
}
-->