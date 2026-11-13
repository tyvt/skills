---
name: cursor-model-routing
description: Cursor 模型分流测试集与实测工具（T1–T7 任务分类 × Cursor 全模型）。用于按任务类型把「有界执行」分配给 Composer、把「设计/评审/长上下文/知识工作」分配给 Grok，并实测各 Cursor 模型的耗时/token/缓存命中/质量，产出 任务×模型×成本/质量 矩阵。当需要决定「某类任务该用哪个 cursor 模型」「验证 cursor 池路由分工」「测 cursor 模型能力/缓存行为」时使用。
---

# cursor-model-routing — Cursor 模型分流测试集

**一句话原则：按认知负荷与失败代价切，不按「池」切——有界可重试的执行给 Composer，设计/评审/长上下文/知识工作给 Grok，卡住才升级。**

## 0. 为什么有这个 skill
第0步归因（`.plan/token-routing-reorder-20261113.md`）实锤：低缓存主因是上游路由缓存不可用（composer/grok 池），非本地 bug。既然 Composer/Grok 同属 Cursor Models 池，「把对的任务放到对的模型」比「禁用整池」更精细。本 skill 提供 T1–T7 分类测试集 + 直连网关的实测脚本，让分流规则从实测矩阵里长出来。

## 1. 模型清单与配额策略（2026-11-13 实测）
| 档位 | 模型 | 说明 |
|---|---|---|
| 主池（大余量） | grok-4.7@256k / grok-4.7@500k / grok-4.6 / grok-4.5 / composer-2.5 | grok 计费但属主池；composer 走池额度 cost=0 |
| $20 赠额（省测） | deepseek-v41-flash-1017 / kimi-k3 / kimi-k2.7-code / glm-5p3 / glm-5p3-flash / glm-5.2 | 只打 2 题，累计硬上限 $8 |

## 2. T1–T7 任务分类
完整 prompt 与判据见 `tasks.json`。摘要：

| ID | 任务类型 | 预判该用 | 重点观察 |
|---|---|---|---|
| T1 | 单文件快速修改（加参数校验） | Composer | 是否过度思考、diff 干净、耗时 |
| T2 | 多文件跨模块重构（回调→async） | Composer | 跨文件一致性、是否漏改调用方 |
| T3 | 终端/CLI 调试（模块找不到根因） | Composer | 命令选择、定位效率、是否反复试错 |
| T4 | 长上下文代码库理解（调用链/变换点） | Grok | 是否漏关键调用链、引用准确性 |
| T5 | 设计/评审（审计日志一页设计） | Grok | 结构完整性、是否发现隐藏风险 |
| T6 | 浏览器/工具操作（Playwright 脚本） | Composer | 工具调用规划、步骤数 |
| T7 | 知识工作/文档（非技术故障简报） | Grok | 受众适配、信息取舍 |
| T7b | 复杂高管决策简报（取舍压力测试·多要素+方案推荐+≤300字） | Grok | 结论先行、利弊权衡、无缩写 |

## 3. 五个指标
耗时 ms / prompt_tokens / completion_tokens / cache_hit%（cached_tokens÷prompt_tokens）/ 完成质量 1–5（人工或留空）。

## 4. 分流规则草案
有界修改/终端/浏览器/切片 → Composer；设计/评审/长上下文/知识工作 → Grok；Composer 一次重试失败或 CRITICAL → 升级 Grok；硬禁 *-fast 变体做默认。

## 5. 用法
`pwsh run-matrix.ps1 -DryRun` 预览；`-Suite smoke|primary|gift` 选择套件。
- `-Suite smoke`：动态取全部 cursor 模型各 ping 1 次。
- `-Suite primary`：主池 5 模型 × T1–T7。
- `-Suite gift`：赠额 6 模型 × T1/T2，累计花费硬上限 `-GiftCapUSD`（默认 $8）。
- 结果幂等写 `results/<suite>.json`（按 model+task 覆盖合并）。

## 5.1 实测结果（2026-11-13，v3 复现后）
完整矩阵与结论见 [REPORT.md](./REPORT.md)。关键：
- **可先行**：T1/T2 有界代码任务 composer 3/3 稳、快、池额度；T3 终端调试 composer 2/3（1/3 坍缩）→ 归 grok-4.7（3/3）。
- **需缓解**：composer 有 ~1/3 间歇性模板坍缩/串题（T3/T7b 实证）。`run-matrix.ps1` 内置 `Test-OffTask` 正则（4 正类/84 样本：旧版漏检 composer T5rep3 的 "Final file content/tasks/…" 串题→Recall 75%，补 runaway 模式后 100%/100%）；但只覆盖模板坍缩+文件转储两类，**未命中≠on-task**，仍需人工抽检。命中标 `⚠OFFTASK` → 拒收重跑/升级 grok。
- **2026-11-13 新增第 5 类：虚构交付物型偏题（正则已漏检）**。样本：编排器 `code_edit_with_signal` 首次冒烟（提问「一句话说明 dict.get 与 [] 区别」，32.6s），输出凭空构造项目路径 `source/blogs/drafts/*.md`、不存在的 `blog_skill`、以及无关的「Mike Dane 风格博客」整篇成稿。**旧 OLD/NEW 正则对此 Recall=0**（实测 MATCH_NEW=False）。已在 `validate-offtask-signal.py` 补 `FAKE_DELIVERY` 模式（`source/blogs|blog_skill|Mike Dane|Giraffa|请保存为|drafts/\w+\.md|正在阅读项目内的风格指南`），在该语料上 **Precision 100% / Recall 100%**（1 正类 / 11 负类）。
- **复现性实测（重要边界）**：同一提问重放 11 次（5×baseline + 3×注入 `NO_LOCAL_FILE_SYSTEM` system + 3×max_tokens 6144）**全部 on-task**，无法靠请求本身复现。因此该偏题**不能归为「偶发可忽略」**，但也没有稳定触发器；处理方式=正则拦截 + 人工抽检，不能靠「改 prompt 就没事」。详见 `results/offtask-*20261113*`。
- **T5**：composer 覆盖高但取舍失控（同 prompt 3 次 3.6k/4.9k/31.5k 字符）、grok 稳 ~2k → 要成品用 grok。
- **T7b**：grok 3/3 on-task 但 ~1/3 数值漂移（含数字基准须复核）。
- **池额度悬崖**：composer 30d 白吃 95.5M tok/$0，同量走 grok 约 $462/月；悬崖=Cursor Pro 外部周额度墙，网关无读数，靠 `unpriced`/错误率监控。

## 6. 局限
直连网关=裸能力+池缓存行为，无 DSH 端到端注入的大 system prompt，不代表真实会话成本。
