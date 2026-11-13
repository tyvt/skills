# Summary
2026-11-13 用户提出 Grok/Composer 分工骨架（Grok=脑、Composer=手），给出 T1-T7 七类测试题集与编排器分流规则草案，并指令助手在 D 盘 skills 目录创建测试集、实测 Cursor 提供的模型。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 你的方向和第0步归因结论其实是一条线：既然低命中主因在路由，而 Composer/Grok 又同属 Cursor Models 池，那“把对的任务放到对的模型上”比“禁用整个池”更精细。外部证据已经给了一个相当具体的分工骨架，下面先给分流原则，再给可直接跑的测试题集，最后落编排器规则和 Pro 计划的用量策略。

先给结论：Grok 和 Composer 的分工骨架
Cursor 生态里已经存在事实上的角色划分：Grok 当“脑”，Composer 当“手”。一个开源编排规则文档写得非常直白：设计/决策/验收/卡住时的评审交给 Grok，事实收集、实现、浏览器操作、切片执行默认给 Composer；并且明确“不要把完整设计 pass 给 Composer”，实现 worker 只有在一次重试后仍验收失败、或出现 Composer 修不了的 CRITICAL 问题时，才升级回 Grok。Composer 被描述为 “a do-work role”，强在持有上下文并把计划执行到底。

这个分工和两边的基准画像吻合：

Composer 2.5：Coding Agent Index 第 3（62 分），但成本只有顶级模型的 1/10–1/60——标准模式 $0.07/task、Fast 模式 $0.44/task；强在 Terminal-Bench v2、SWE-Bench Multilingual、SWE-Bench-Pro-Hard-AA（47%），定位是跨文件编辑、终端命令、工具使用、长编码会话。

Grok 4.7：CursorBench 4.0（长周期编程任务）性价比前沿，DeepSWE v1.1 高推理强度 71.0%，训练时加权“需要数小时完成的任务”，强在自我验证、长上下文管理、知识工作（文档/简报）；但 per-task 成本 $1.58–$6.01，是 Composer 的数倍到数十倍。

所以编排器的第一刀不是按“池”切，而是按认知负荷与失败代价切：Composer 做有界、可验证、失败可重试的执行；Grok 做设计、评审、长周期困难任务、以及 Composer 卡住后的升级。

测试题集：7 类任务，每类 1–2 题，直接可跑
公开基准（HumanEval / SWE-bench / LiveCodeBench / Terminal-Bench / Coding Agent Index）的维度可以作为选题参照——单函数补全、真实 GitHub issue 多文件修复、终端任务、端到端代理任务，各覆盖一种“能力面”。但你不必跑完整基准，用你自己工作流里的任务做 7 个小样本，信息量更大，也直接对应编排器的任务分类标签。

建议每类任务同一 prompt 分别跑 Composer 2.5（标准模式）和 Grok 4.7（256k），记录 5 个指标：完成质量（1–5）/ 是否一遍过 / 实际耗时 / token 消耗 / 缓存命中率。缓存命中率这一列很重要——第0步已经实锤 Composer 池缓存上报为 0、未命中全价计，如果测试中 Composer 的 token 优势被缓存问题吃掉，分流规则需要重新权衡。

任务类型	测试题示例（用你仓库里的真实小任务）	重点观察	预判
T1 单文件快速修改	“在这个文件里加一个参数校验，保持现有风格，不碰其他文件”	是否过度思考、diff 是否干净、耗时	Composer 明显占优
T2 多文件跨模块重构	“把 X 模块的接口从回调改成 async/await，涉及 3–5 个文件，跑现有测试”	跨文件一致性、是否漏改调用方、测试通过率	Composer 够用；Grok 更稳但贵
T3 终端/CLI 调试	“这个脚本在 CI 上报 Y 错，本地复现并修复”	命令选择、错误定位效率、是否反复试错	Composer（Terminal-Bench 强项）
T4 长上下文代码库理解	“读这个 200k 上下文里的 6 个文件，回答 Z 模块的数据流”	是否漏关键调用链、引用准确性	Grok（长上下文+自我验证）
T5 设计/评审类	“给这个改动出一页设计：边界条件、失败模式、回滚方式”	结构完整性、是否发现隐藏风险	Grok 明显占优，不建议 Composer 独做
T6 浏览器/工具操作	“用浏览器打开 staging，走一遍注册流程，记录 console error”	工具调用成功率、步骤数	Composer（默认 worker 的 browser 角色）
T7 知识工作/文档	“把这次故障排查写成给非技术同事的 1 页简报”	受众适配、信息取舍	Grok（GDPval / AA Briefcase 方向）
跑完这 7 题，你得到的不再是“Composer 便宜、Grok 强”这种泛化判断，而是一张任务类型 × 模型 × 成本/质量的矩阵。编排器的分流规则应该直接从这张矩阵里长出来，而不是从榜单分数里猜。

编排器规则草案（可直接改写进 AGENTS.md / skill）
基于现有证据，可以先落一版保守可回滚的规则，测试后再收紧：

text
任务分类器（轻量，不用额外模型调用）：
  有界修改/终端/浏览器/切片执行 → Composer 2.5（标准模式，不开 Fast）
  设计/评审/长上下文理解/知识工作 → Grok 4.7（256k）
  默认 worker → Composer 2.5
  Composer 一次重试仍验收失败，或出现 CRITICAL → 升级 Grok
  父会话在 Grok 时，review/stuck 可 inherit；否则按 Grok → 4.5 high → Composer 的顺序兜底
硬性禁止：Composer Fast / 任何 *-fast 变体用于默认工作（6 倍成本换 30% 速度，不划算）
这个草案直接对齐了开源路由文档的 “Design → parent Grok；Implement/browser → composer-2.5；Review/stuck → non-fast Grok” 结构，同时保留了你第2步规则里的 kill switch：AGENTS.md 删掉这几行即撤。和之前 plan 的衔接点是：这不是替代路由纪律，而是给路由纪律加一层“任务类型例外清单”——Composer 不是整体禁用，而是在它被验证擅长的有界任务上保留；Grok 也不是默认，只吃设计/评审/长周期困难任务。

Pro 计划的用量策略：让“手”留在池内，把“脑”用在刀刃上
Cursor 的 Pro / Pro+ / Ultra 是 legacy 计划，付费池覆盖 Grok 4.7 / 4.6 / 4.5 和 Composer 2.5，池子按周重置、按各请求成本计价，没有固定的“每模型 N token”数字。Pro 是 $20/月含 $20 API usage；Pro+（$60/月含 $70）和 Ultra（$200/月）直接增加 Cursor Models 池的容量。

在这个结构下，“尽可能利用 Pro 计划”的核心不是多用，而是把 routine 流量压进低成本模型，把池额度留给高杠杆任务：

日常 routine（T1/T3/T6 类）全部走 Composer 标准模式。$0.07/task 的量级意味着 Pro 的 $20 池能扛很多有界任务；Fast 模式 6 倍成本只换 30% 速度，除非交互式等待是瓶颈，否则不开。

Grok 只在 T4/T5/T7 和“Composer 卡住”时触发。Grok 的 per-task 成本是 Composer 的 10–60 倍，把它当默认 worker 会迅速耗尽池子；但当设计错误或评审遗漏的代价远高于 $1–6 时，Grok 是值得的。

测试期优先在 Pro 池内跑，7 类题各 2 次调用，总成本可控；如果某类任务 Composer 的缓存问题导致等效成本优势消失，把该类标记为“Grok 优先”并记录证据，而不是一刀切。

周重置节奏：把重设计/重评审任务安排在每周前半段，避免周末池子见底时被迫用全价第三方模型或降级到 fast 变体。

和之前 plan 的衔接
这份任务类型分流可以直接作为第2步路由纪律规则的细化层：之前写的是“cursor/grok/trae 仅限短会话或其专属能力”，现在把“专属能力”替换成上面 T1–T7 的可判定任务类型标签，规则就从模糊的“短/长”变成“有界执行 → Composer；设计/评审/长上下文/知识工作 → Grok；卡住才升级”。第1步 A/B 仍然要做，但 A/B 的对照组可以按任务类型拆开跑——这样你测出的系数是任务类型 × 路由的交互项，而不是一个混在一起的均值。
做一下这个测试集，放在D盘skills目录，然后测试一下cursor提供的模型

<!-- MEMORY_FIELDS
{
  "event_name": "Cursor模型测试集下达",
  "goal": "下达测试与实测任务",
  "summary": "2026-11-13 用户提出 Grok/Composer 分工骨架（Grok=脑、Composer=手），给出 T1-T7 七类测试题集与编排器分流规则草案，并指令助手在 D 盘 skills 目录创建测试集、实测 Cursor 提供的模型。",
  "ranges": "0-25",
  "source_extraction_id": "5d63e0b1e05b4ffcb1e31a6efaa8607f",
  "version": 1,
  "memory_type": "events"
}
-->