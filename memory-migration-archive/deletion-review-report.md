# 会话提炼与删除前核对报告

生成时间：2026-10-27T09:04:49.091Z。提取快照：2026-10-27T07:03:45.025Z。发布库 5350 条。抽样随机种子：08022756afe53f7570555df35d98b69e。

## 全部来源覆盖

| 来源 | 有效会话 | 发布库命中 | 规则筛除 | 实际遗漏 |
|---|---:|---:|---:|---:|
| codex | 32 | 20 | 12 | 0 |
| cursor | 5675 | 3697 | 1978 | 0 |
| pi | 99 | 71 | 28 | 0 |
| workbuddy | 234 | 158 | 76 | 0 |
| zcode | 79 | 57 | 22 | 0 |

原始记录总数：pi 100、zcode 79、codex 33；其中提取阶段分别排除 1、0、1 条。

规则筛除不等于已入库，也不代表人工确认没有价值。以下逐项记录按现行保守规则作出的决定。会话总数与去重后的记忆条目数不应一一对应。

## 质量核验

```json
{
  "draft": 0,
  "refine": 0,
  "newUnrefined": 0,
  "stageTotal": 4244,
  "fieldIssues": {
    "title": 0,
    "type": 0,
    "content": 0,
    "evidence": 0,
    "files": 0,
    "sessionIds": 0
  },
  "emptySessionIds": 0,
  "unpublished": [],
  "shards": 201,
  "maxShardBytes": 40161,
  "oversizedShards": []
}
```

## 不限定是否命中的随机抽样（各10条）

### codex

| 会话 ID | 项目 | 结果 | 命中记忆标题 |
|---|---|---|---|
| rollout-2026-08-26T15-00-29-01a03cde-cb2b-70f1-b104-fe84df789b0c | 投资推送 | 已命中 | x1643：回测表现与诊断 IC 不一致时的三类修正口径 |
| rollout-2026-08-25T11-24-34-01a036f2-c18a-7a10-adea-524c1f695b32 | 投资推送 | 已命中 | x1535：VectorBT 与 RQAlpha 对齐的工程约定 |
| rollout-2026-08-27T10-00-16-01a040f2-4dca-7810-b246-594ac1915afc | 投资推送 | 已命中 | x1567：[投资推送] 融合排序稳健性：持仓上限显式化与 buffer 归因；x1568：[投资推送] 调仓敏感性 Bootstrap：主方案调仓日偏移，辅方案分块重采样 |
| rollout-2026-08-27T12-47-53-01a0418b-c09c-7882-aeea-91ab71028277 | 投资推送 | 已命中 | x1546：多因子数据管道：Parquet 优先，远程 API 必须先落本地再算；x1547：PE 行业分位：负 PE / 零 PE 一律按缺失走 L3=0.5，禁止取绝对值；x1548：基本面因子行业中性化：ROE/毛利率 z-score，股息率与 PE 分位不中性化 |
| rollout-2026-08-24T18-07-05-01a0333c-e911-71d3-8394-b773964444d8 | 园区公共收益 | 缺少技术结论信号 |  |
| rollout-2026-08-26T13-48-50-01a03c9d-33c8-7be0-9185-22d4aae5106c | 投资推送 | 已命中 | x1593：[投资推送] 红利策略约束消融：降回撤≠相对市场超额，需区分现金暴露 |
| rollout-2026-08-26T15-06-37-01a03ce4-69bc-7741-9ca6-02dd898c40da | 投资推送 | 已命中 | x1647：策略绝对阈值致空仓重构为分位过滤满仓 |
| rollout-2026-08-21T17-16-18-01a0239b-56dc-7e03-8112-efb843eda6d4 | 苏住房C | 缺少技术结论信号 |  |
| rollout-2026-09-24T18-12-06-01a0d2e6-a67e-78e3-a680-bee1b70f33a0 | 量化选股 | 已中断 |  |
| rollout-2026-08-27T18-04-53-01a042ad-fbe2-7832-8777-897adf18f6f9 | 投资推送 | 已命中 | x1588：[投资推送] 指数机械复现（Phase 7-A）：只抄官网编制方案，策略变形进待测清单 |

### pi

| 会话 ID | 项目 | 结果 | 命中记忆标题 |
|---|---|---|---|
| 01a05c52-9fcd-7f0c-a5ca-f57160c931de | Administrator | 已命中 | x0168：开发工具配置隔离于点开头目录 |
| 01a166fd-251b-764e-99b7-41fab9799d84 | 苏州市房地产监测V3 | 已命中 | s0346：端别(terminalType)条件隐藏的判定口径与降级方向：缺失按 G 端处理；薄入口共用内核列表组件一处改覆盖多菜单 |
| 01a162aa-5047-70c5-a400-7594cbb8728b | 苏州市房地产监测V3 | 已命中 | s0275：新增/提交拆分的审批流改造：先落库草稿再提交，add 成功前不显示「提交」；s1090：新增页用getOwnCompany替代init回填；x3078：分支新增页用getOwnCompany替init回填 |
| 01a16663-e3ec-70c5-a400-768ee53fe834 | 苏州市房地产监测V3 | 已命中 | s0002：Web 管理端 e2e 约定：全量注入 test-id、单用例控制在 60s 内、必须把「阻塞」与「通过」分开报 |
| 01a16280-871c-70c5-a400-75261afd267f | 苏州市房地产监测V3 | 已命中 | s0509：新增改走审批流（删除提交即生效接口）：草稿 add/update 拆分 + 新增态 config-only 上传 + 落库后才出提交按钮 |
| 01a161b2-e6e3-7553-b4af-dfec6cfefa0f | 苏州市房地产监测V3 | 已命中 | s1475：资质详情页资质状态未加载字典显1；x3019：资质详情页资质状态未加载字典显示1 |
| 01a16770-5e36-764e-99b7-421bbe4aa013 | 苏州市房地产监测V3 | 已命中 | s0081：Vue2 变更详情页角标不刷新：mixin 写入的 beforeForm 必须在 data() 里显式声明；s0990：变更详情页角标因回退致批量缺失 |
| 01a1620f-ed3c-7393-a93b-aa8f6ad5c94a | 门户 | 已命中 | x3318：对外首页顶部卡片「操作指引」箭头在 UnifiedLogin，勿改 OperationGuideBody |
| 01a1625f-8c84-70c5-a400-74e19978db01 | 苏州市房地产监测V3 | 已命中 | s1456：企业变更列表须内核薄页固定 organType 入参；x3001：企业变更列表内核须固organType拆薄页 |
| 01a16680-39de-70c5-a400-76a50aec295e | 无锡市区小程序嵌入H5 | 已命中 | x1699：业主决策确认弹窗需红字标注适用区（梁溪/滨湖/新吴）；发布 tag 仅在父仓打 |

### zcode

| 会话 ID | 项目 | 结果 | 命中记忆标题 |
|---|---|---|---|
| session_08aa1b0852b93beea14c8ebfce90d7d7 | 苏州市房地产监测V3 | 已命中 | s0386：表格列改名只改 label/formatter，绝不能改 prop —— 列配置按 prop 持久化在 localStorage |
| session_92f14ad8ea3d61cd3f2e758f2ce4acb6 | 苏州市房地产监测V3 | 已命中 | s1488：预售批次字段改只读后端自动生成 |
| session_7f2e2d90410f7e1562f496bdbb3c95f0 | 苏州市房地产监测V3 | 已命中 | s0013：要件附件按名称从企业/项目来源自动带出：prefillSources + 严格同名 + 别名表的完整设计 |
| session_f7967c90115c8b16911d7e9608044e34 | 门户 | 已命中 | x3534：租赁类别列渲染按钮无功能改纯文本 |
| session_da9b2bda195bdfca7b27e2a181f01d16 | 苏州市房地产监测V3 | 已命中 | s0146：Web 后台「页内变更/编辑模式」必须把路由当唯一状态源：模式标志放 data() 不放 created()，否则组件重建后被 immediate watcher 抢先执行 |
| sess_subagent_agent_79d2e82d-c4c2-482b-b06e-28d1e124cc15 | 门户 | 已命中 | x3385：门户对外首页 UnifiedLogin 与登录后首页 index-wrapper 路由分工；x3386：门户仓库为 suzhufang 父仓 + zhi2-web-admin 子模块，横幅无 Swiper |
| session_9aa856baf3b1b1c6028c26512bf5a74c | 门户 | 已命中 | x3531：单价列格式化缺两位小数致显示不一致 |
| sess_subagent_agent_9f2817ae-1780-442c-aab4-82716458bd16 | 苏州市房地产监测V3 | 已命中 | s0148：企业/项目附件没有独立接口：全部复用 listAppendixPackage「要件包」，靠 busCode + 多维过滤区分 |
| session_1049d6185d5fcfff06cfb94108b48261 | 门户 | 已命中 | x3376：[门户] 苏周到扫码登录三接口迁至 /portal/login/external/suzhouDao（网关仍走 v3.0 portal base） |
| session_dcca4ee681a8111b7f2b93027268aa1e | 苏州市房地产监测V3 | 已命中 | s0294：详情页「返回」找不到授权菜单：不报错，静默降级浏览器返回（router.resolve 判可用性） |

## 从已命中会话中随机抽取的追溯清单（各10条）

此组用于核对标题、内容与来源，不用于估计总体覆盖率。

### codex

- 会话 `rollout-2026-08-26T15-00-29-01a03cde-cb2b-70f1-b104-fe84df789b0c`（投资推送）→ **x1643：回测表现与诊断 IC 不一致时的三类修正口径**
  - 内容：用户归纳的三类根因及应对：（1）**频率错配**——实盘/回测改为月末调仓、持有约 20 日，与诊断 IC 口径严格对齐；（2）**交集过窄**——ROE、负债率改为全市场**排名分位**筛选（如 ROE 剔除后 20%、负债率剔除前 20%），不再用绝对阈值压候选池；（3）**现金假象**——强制满仓且最少 10 只持仓，不足 10 只时放宽到 Top 100 再分配权重。该表在会话中仅作为待落地需求，助手要求先确认要改的仓库文件/提示词路径。
  - 依据：会话 rollout-2026-08-26T15-00-29：用户贴根因/修正措施/提示词对照表并写「有疑问先和我确认」；助手回复请指明文件名或授权在仓库内查找。
- 会话 `rollout-2026-08-25T11-24-34-01a036f2-c18a-7a10-adea-524c1f695b32`（投资推送）→ **x1535：VectorBT 与 RQAlpha 对齐的工程约定**
  - 内容：接入 VectorBT 时：使用独立虚拟环境 `.venv-vectorbt`，不改动 `rqalpha_env`；十年基准与报告写入 `output/vectorbt/baselines/` 与 `output/vectorbt/reports/`，不覆盖既有 RQAlpha 结果。数据口径：close/total_mv/is_st 从 `stock_daily` 加载，行业从现有行业缓存加载；因子矩阵保留源数据单位，YAML 策略阈值按需做单位转换。验收目标为与 RQAlpha 完整规则对齐（共同交易日净值、回撤、期末持仓等）。
  - 依据：会话 rollout-2026-08-25：用户四项确认「完整对齐 RQAlpha」「close/total_mv/is_st 从 stock_daily」「新基准单独 baselines/」「独立 .venv-vectorbt」；验收逐日净值差 0.0000、Top10 重合 100%。
- 会话 `rollout-2026-08-27T10-00-16-01a040f2-4dca-7810-b246-594ac1915afc`（投资推送）→ **x1567：[投资推送] 融合排序稳健性：持仓上限显式化与 buffer 归因**
  - 内容：股息+低波融合策略应将 fusion_candidate_n（如 100）与 top_n（如 10）拆分，并在代码中显式 max_holding = top_n + NDrop（如 13），避免候选池逻辑隐式膨胀持仓。Layer2 收益归因须按逐日实际权重计算 core/buffer 贡献，不能用调仓日静态权重，否则缓冲仓收益被低估。若 buffer_contribution 长期 >30%，说明 Alpha 仍依赖缓冲，应回炉。综合验收矩阵（如 7 项中 ≥5 项）未通过前，融合配置保持 experimental，生产默认 fusion_mode: false。
  - 依据：稳健性会话：1/7 通过未升级；原策略 buffer 贡献约 100%、候选枯竭频率 100%；用户确认 max_holding=13、逐日动态权重
- 会话 `rollout-2026-08-27T12-47-53-01a0418b-c09c-7882-aeea-91ab71028277`（投资推送）→ **x1546：多因子数据管道：Parquet 优先，远程 API 必须先落本地再算**
  - 内容：红利低波等多因子重构约定：能用本地 `stock_daily` 等 Parquet 的字段一律走 Parquet（最优）；无法形成 Parquet 的远程字段先同步进本地 DuckDB，再执行因子与回测，禁止边跑策略边直连远程 API。季报财务优先 StockDB `get_fundamentals`，备用 AKShare `stock_financial_abstract`；PE_TTM 用已有 Parquet，行业用 `cache/dividend_lowvol/stock_industry_sw_l1.csv`。
  - 依据：005 rollout-2026-08-27：用户明确要求「所有需要 API 远程拉取的数据都先同步到本地 duckdb」及「可以用本地 parquet，无法形成 parquet 再使用 duckdb」；最终验收 52 项测试通过。
- 会话 `rollout-2026-08-26T13-48-50-01a03c9d-33c8-7be0-9185-22d4aae5106c`（投资推送）→ **x1593：[投资推送] 红利策略约束消融：降回撤≠相对市场超额，需区分现金暴露**
  - 内容：十年消融（Baseline 0/1/2 vs Full）显示：完整硬约束可显著压低最大回撤（如 Full 约 -28% vs Baseline 约 -62%），但 Full 相对市场年化超额可为负；平均持仓仅约 7 只、平均投资比例约 56%，部分年份零持仓，风险改善有相当部分来自现金暴露，不能全部归因于因子选股。写实验结论或调参目标时应同时看年化、回撤、夏普与持仓/投资比例，避免只凭回撤改善认定策略 alpha。
  - 依据：会话 rollout-2026-08-26 最终结论表与「核心结论：完整约束显著降低了回撤，但没有创造相对市场的超额收益…现金暴露」段落。
- 会话 `rollout-2026-08-26T15-06-37-01a03ce4-69bc-7741-9ca6-02dd898c40da`（投资推送）→ **x1647：策略绝对阈值致空仓重构为分位过滤满仓**
  - 内容：原策略采用ROE/负债率绝对阈值过滤导致年份持仓为零、年化仅4.14%。重构为单侧分位过滤删除绝对阈值，强制满仓与最少持仓，满仓时保持单股行业约束，不可行显式报错（strategy_params.yaml:4）。消融脚本支持 --tag 防基线覆盖，测试28/28通过。
  - 依据：extracted source=codex session=rollout-2026-08-26T15-06-37-01a03ce4-69bc-7741-9ca6-02dd898c40da
- 会话 `rollout-2026-08-27T18-04-53-01a042ad-fbe2-7832-8777-897adf18f6f9`（投资推送）→ **x1588：[投资推送] 指数机械复现（Phase 7-A）：只抄官网编制方案，策略变形进待测清单**
  - 内容：对齐中证等指数时，复现阶段禁止发明规则（如行业内股息率排名、rank-sum 复合打分、凭记忆的 5% 权重或半年度调样）。官方多为串联漏斗（例：全市场股息率前 75 → 其内低波前 50 → 股息率加权）、单股权重上限与调样频率以现行 PDF 为准并在报告注明「编制方案核对日期」。非官方改进（行业内选样等）只能记入后续阿尔法/7-B 预注册清单做增量评估。分红资格 PIT：按调样日前三个完整自然年、每年均有现金分红，以除权除息日落入自然年计，不用宣告日。综合硬门槛未通过时验证脚本可能 exit 1，需与用例失败区分。
  - 依据：会话 rollout H30269：全市场前 75+低波 50、15% 上限、年度调样；相对 H20269 年化 -0.14pp 三线 ±2pp PASS 但硬门槛不通过未调参；65/65 测试通过仍 exit 1。
- 会话 `rollout-2026-08-25T09-43-58-01a03696-a7e2-72a1-90b8-2aaa05fb347f`（投资推送）→ **x1594：[投资推送] 文档结构：根 README 统一指数定投+红利子策略+Parquet 基建**
  - 内容：多 README 易与实现漂移时，将主体（指数定投策略）、子目录业务（红利低波个股）、共享数据基础设施（Parquet/因子集市等）合并为单一根 README，删除分散的子 README，并在合并后做链接、命令、路径、代码围栏与实现一致性核对。
  - 依据：会话 rollout-2026-08-25 用户诉求「将项目里面多个 readme 合并…主体是指数定投策略，子目录有个红利选股策略」及最终结论。
- 会话 `rollout-2026-08-27T15-54-52-01a04236-f0c5-7421-82a2-894ccf1c11e7`（投资推送）→ **x1649：三因子通过t闸门但年度稳定性验收未达标**
  - 内容：低波、FCF/EV、10日反转三因子等权通过t值闸门（t>2），股息率等因t<2淘汰，主配置年化8.29%但回撤-52.60%。真实验收4/9未达生产门槛，年度稳定性与滚动三年未通过，固定对照策略不可替t闸门裁决（t_stats.csv）。
  - 依据：extracted source=codex session=rollout-2026-08-27T15-54-52-01a04236-f0c5-7421-82a2-894ccf1c11e7
- 会话 `rollout-2026-08-25T08-40-12-01a0365c-491b-7070-b2b8-ce2a8e119887`（投资推送）→ **x1646：因子集市复用CSV全量生成Parquet无误差**
  - 内容：因子集市基于现有CSV全量生成Parquet，6因子共112,436,766行，物理Schema统一且股息率抽检零误差、其余误差低于1e-15。核心交付 factor_builder.py、factor_loader.py 及 manifest.json，全量构建耗时约4分4秒，全历史加载单因子1.97秒。
  - 依据：extracted source=codex session=rollout-2026-08-25T08-40-12-01a0365c-491b-7070-b2b8-ce2a8e119887

### pi

- 会话 `01a05c52-9fcd-7f0c-a5ca-f57160c931de`（Administrator）→ **x0168：开发工具配置隔离于点开头目录**
  - 内容：当前目录包含 `.cursor`、`.docker`、`.bun`、`.android` 等以 `.` 开头的开发工具配置文件夹，各工具配置按名称独立隔离存放。
  - 依据：src=Administrator/001.md
- 会话 `01a166fd-251b-764e-99b7-41fab9799d84`（苏州市房地产监测V3）→ **s0346：端别(terminalType)条件隐藏的判定口径与降级方向：缺失按 G 端处理；薄入口共用内核列表组件一处改覆盖多菜单**
  - 内容：什么情况：机构登录（B 端）时要隐藏某些筛选项，如「开发企业-企业变更管理 / 经济机构-机构变更管理 / 租赁机构-开业信息变更管理」三个菜单隐藏「行政区域」。为什么一处改动能覆盖三个菜单：三者都是薄入口页，只写 <CoreList :organ-type="01|agency|lease" />（filePath 分别为 company/companyChangeManage/developer|agency|lease/index），筛选项逻辑全在同一内核列表组件里，没有各页独立副本。怎么做：先组装完整 formItems 数组，再按端别过滤——机构登录 terminalType === 'B' 时过滤掉目标项，主管部门 G 端保持原样；端别判断抽成 computed（如 isCompanyTerminal）读 this.$store.state.user.terminalType，与 companyAdmin、companyRecordAgency、agencyBranch 等既有页口径一致，不要在模板里散写字符串比较。关键约定：terminalType 缺失时按 G 端处理（不隐藏），避免后端未返回该字段时把筛选项误藏掉，宁可多显示。改前先确认是否薄入口 + 共用内核组件，改内核一处即可，不要逐个入口复制过滤代码。
  - 依据：会话 01a166fd：用户诉求「机构登录时 开发企业-企业变更管理 隐藏行政区域 条件 / 经济机构-机构变更管理 隐藏行政区域 / 租赁机构-开业信息变更管理 隐藏行政区域」；结论给出三个菜单的 filePath 与 organType 对照表，新增 isCompanyTerminal computed，并注明「terminalType 缺失时按 G 端处理（不隐藏），与 companyAdmin 系列一致」，ESLint 通过。
- 会话 `01a162aa-5047-70c5-a400-7594cbb8728b`（苏州市房地产监测V3）→ **s0275：新增/提交拆分的审批流改造：先落库草稿再提交，add 成功前不显示「提交」**
  - 内容：经纪机构分支机构备案由「提交即生效」改为走 flowable 审批流时，接口从旧的 /init + 统一 /submit 拆成 /add（新增草稿，返回主键 Long）、/update（仅待提交可编辑）、/submit（启动审批，busCode=fzjgba）、/approval（zs-approval 自动回调，前端不主动调）。落地要点：① 保存逻辑必须是「首次 /add → 成功后 /update」，且 /add 返回主键之前不渲染「提交」按钮，否则用户会对着空 id 提交；② 新增态要件不能用 busId 挂接，走 configOnly 上传把 draftAppendixIds 塞进 /add 的 attachmentList，编辑/查看态才回到 busId + busCode 查询；③ 列表要能注入没有 agencyBranchId 的本地草稿行（显示「未保存」），否则保存前后列表体验断裂；④ 后端已废弃的 /init 不要继续调用，设立机构信息改用 getOwnCompany 取 companyName / uniformSocialCreditCode 回填父机构字段，E2E 的等待点同步从 init 改成 getOwnCompany。
  - 依据：026.md 会话 01a162aa：用户提供《经纪机构分支机构备案-前端对接文档》，说明 /init 废弃、/submit 拆为 /add /update /submit /approval；随后用户指出「没有/init接口，用getOwnCompany接口获取数据回填」；最终结论给出 loadInit→loadAddPage、configOnly 上传 + draftAppendixIds 随 /add 的 attachmentList、/add 成功前不显示提交
- 会话 `01a16663-e3ec-70c5-a400-768ee53fe834`（苏州市房地产监测V3）→ **s0002：Web 管理端 e2e 约定：全量注入 test-id、单用例控制在 60s 内、必须把「阻塞」与「通过」分开报**
  - 内容：什么情况：在 zhi2-web-admin（Vue3 + Element Plus，Playwright e2e）做全量用例复测时，旧用例大量与当前页面 DOM 不符，且验收方要求每个元素都有稳定选择器、单个用例尽量 1 分钟内跑完。

为什么：页面迭代后 test-id 缺失导致选择器靠文本/层级，脆弱且改动即失效；用例串行跑满菜单审计会到 2.7 小时，失去回归价值。

怎么做：①以「当前页面为准」修正旧用例逻辑，顺手给所有交互元素补 data-testid，并用脚本（e2e/scripts/audit-testids.mjs）扫缺失项；②单用例预算 60s，超时/慢接口单独拆分，全菜单审计类用例不放进日常回归；③结果表必须分「通过 / 失败 / 跳过」三列，缺账号、后端无登录态（如 getOwnCompany 直连 500）、无在途业务单（没有在途变更单、审批流 busCode 未配置）造成的跳过一律记为阻塞，不得算通过；④上级给的 status-brief 可能是旧批次结论，收尾前要按本次实跑重新核对再汇报。
  - 依据：「检查项目中的所有测试用例，复测确认是否畅通…所有元素选择加入test-id」「单个测试的时间尽量控制在1分钟以内」；结论表 register 35 通过/3 跳过、full-menu-audit 约 2.7h 超 60s；明确「没有在途变更单可验证，不算通过」「这两条 status-brief 是旧批次结果」。
- 会话 `01a16280-871c-70c5-a400-75261afd267f`（苏州市房地产监测V3）→ **s0509：新增改走审批流（删除提交即生效接口）：草稿 add/update 拆分 + 新增态 config-only 上传 + 落库后才出提交按钮**
  - 内容：后端把「提交即生效」拆成 add（落草稿，返回主键）/ update（仅待提交可编辑）/ submit（启动 flowable）/ approval（回调）后，详情页组件的改法有四条要点。1）新增态不再调 /init 预分配主键，改本地 resetFormForAdd()，快照字段等 /detail 回填；保存按有无主键分流：无主键走 /add 且 payload 带 attachmentList，成功取返回 data 作为新主键并转查看态；有主键走 /update 且不传附件（编辑态靠 busId + busCode 直挂）。2）新增态没有 busId，要件区改用 AnnexUpload 的 config-only 模式，监听 config-appendix-ids-change 把 appendixId 收进 draftAppendixIds，未落库前跳过 checkRequiredAppendix 预检。3）提交按钮加 canShowSubmitInHeader：新增态必须 /add 落库后才渲染 ZsSubmit，否则 submit 无 id 可传。4）草稿缓存放宽为新增态即写 sessionStorage，列表侧 mergeDraftRowFromSession 要支持无主键草稿——直接用本地表单注入列表并标 _unsavedDraft、名称缺省「（未保存）」，不要再调 /detail 校验。
  - 依据：用户贴出经纪机构分支机构接口文档（/init 废弃、/submit 拆为 add/update/submit/approval），改造 AgencyBranchDetail/List 与真实接口 e2e 后构建通过；用户后补充「/init 有的，后端说没有废弃」，实现仍改为不再依赖 init 返回主键。
- 会话 `01a161b2-e6e3-7553-b4af-dfec6cfefa0f`（苏州市房地产监测V3）→ **s1475：资质详情页资质状态未加载字典显1**
  - 内容：`zhi2-web-admin/src/views/toB/qualificationRecord/detail.vue` 的 `contentInfo` 中「资质状态」字段为 `type: 'text'` 且未加载字典，显示原始值 `1`。改为 `type: 'tag'` 绑定 `qualificationStateOptions`，`data` 声明空数组，`initDict()` 加载 `company_qualification_state` 字典；旧列表 `qualificationTable.vue` 用 `certState` 未改动。
  - 依据：src=苏州市房地产监测V3/324.md
- 会话 `01a16770-5e36-764e-99b7-421bbe4aa013`（苏州市房地产监测V3）→ **s0081：Vue2 变更详情页角标不刷新：mixin 写入的 beforeForm 必须在 data() 里显式声明**
  - 内容：场景：zhi2-web-admin 的各类变更详情页（building/projectChange、institution/agencyBranch、institution/leasePersonnel、toB/personnelRecord 等）统一用 changeObjectMixins 提供 changeBadge()/changeActive，mixin 只在运行时给 this.beforeForm 赋值，并不在 data 中声明它。为什么出问题：Vue 2 只对初始化时已存在的属性做响应式追踪，后续新增的 beforeForm 不是响应式对象，模板里依赖它的字段变更角标（v-tooltip）就不会随快照刷新，表现为「有的页面缺角标/角标不更新」。怎么做：用该 mixin 的页面必须在 data() 里补 beforeForm: {}；给新字段加角标时逐个绑定 changeBadge('fieldName')，若角标写在子组件（如 AgencyPersonnelBasicInfoFormFields）里，父组件必须把 beforeForm 等 props 透传下去，否则子组件拿不到快照。排查套路：全量 grep changeBadge / v-tooltip，横向对比各变更页字段覆盖，按 P0/P1 分级；动手前先 git blame 确认是「从未实现」还是「被后续提交回退」——本项目 projectChange 的「计划施工起止日期」角标就是早期修复被两次后续提交覆盖掉了，照着重放实现写会再次冲突。
  - 依据：会话 01a16770：用户要求「检查所有变更页面的角标提示，有些页面缺失了」→ 修复 12 文件（129+/97-）。结果表明确列出 agencyPersonnel/leasePersonnel/personnelRecord 需补 props/method 与 mixin 接入，并注明「4 个 institution/toB 页面同时在 data() 声明了 beforeForm: {}（mixin 只写入不声明，Vue 2 下非响应式会导致角标不刷新）」，以及 projectChange 是 532d5c4e61 修复被 2193d1c4a3 + e76506e24e 回退。
- 会话 `01a1620f-ed3c-7393-a93b-aa8f6ad5c94a`（门户）→ **x3318：对外首页顶部卡片「操作指引」箭头在 UnifiedLogin，勿改 OperationGuideBody**
  - 内容：用户说的「首页操作指引箭头」指 `UnifiedLogin.vue` 顶部三张卡片行内的指引图标（约第 41 行：`icon_guide_arrow.svg` → `icon_guide_arrow.gif`），不是 `operationGuide` 详情页里的 `OperationGuideBody.vue` 内部箭头。动效资源放 `public/assets/images/UnifiedLogin/`。误改详情页后应 checkout 还原详情组件，避免两套入口图标不一致。
  - 依据：「替换的有问题吧？是替换首页的操作指引箭头」「首页顶部三张卡片的“操作指引”箭头（UnifiedLogin.vue 第 41 行）」「OperationGuideBody.vue 已 git checkout 还原（操作指引详情页内部的箭头保持原来的 svg 不动）」
- 会话 `01a1625f-8c84-70c5-a400-74e19978db01`（苏州市房地产监测V3）→ **s1456：企业变更列表须内核薄页固定 organType 入参**
  - 内容：多机构变更列表未隔离查询参数致数据混淆。在 `src/views/company/companyChangeManage/index.vue` 内核增 `organType` prop（默认 `01`），`getList()` 固定携带并动态渲染标签；新建 `developer/agency/lease/index.vue` 入口薄页分别传参复用内核。
  - 依据：src=苏州市房地产监测V3/308.md
- 会话 `01a16680-39de-70c5-a400-76a50aec295e`（无锡市区小程序嵌入H5）→ **x1699：业主决策确认弹窗需红字标注适用区（梁溪/滨湖/新吴）；发布 tag 仅在父仓打**
  - 内容：小程序/H5 点击业主决策前的确认弹窗在原文案上方空一行增加：**业主决策功能适用范围：梁溪区、滨湖区、新吴区。**（红字加粗）。交付时子模块 `dev_wuxi-sfb` 提交后，父仓 `zhi2-mobile-shimin-h5-c-unlimited` 更新子模块指针；**tag 只打在父仓**（如 `202610231020` 指向含子模块提交的父提交），子模块可不打 tag。
  - 依据：会话 01a16680：用户要求适用范围文案与父仓 tag 202610231020；子模块 587b800 无 tag。

### zcode

- 会话 `session_08aa1b0852b93beea14c8ebfce90d7d7`（苏州市房地产监测V3）→ **s0386：表格列改名只改 label/formatter，绝不能改 prop —— 列配置按 prop 持久化在 localStorage**
  - 内容：场景：预售许可列表（presale/permit/components/index.vue，被「预售许可预公告列表」等通过 nodeType 复用）要求把「申请时间」列改名为「发证时间」。

为什么容易踩：本项目的表格列顺序与显隐由 tableColumnConfig.js 按列的 prop 写入 localStorage 持久化。若为了让标题与取值一致而把 prop 从 applyTime 改成 permitIssueTime，所有自定义过列表的用户本地保存的列配置会全部对不上 → 列被重置/错位，属于跨会话后才暴露的隐性回归。

做法：① prop 保持 applyTime 不动；② 只改列名 label；③ 取值放到 formatter 里优先取 permitIssueTime，取不到时依次回退 applyTime、createTime —— 后端字段是否存在无法从前端仓库确认，回退保证最坏情况只是显示原申请时间而不会出现空列；若后端实际叫 issueTime/grantTime，只需改 formatter 首个取值。

配套：同一处新增筛选条件时，除了在 formItems 插输入框（位置与延期/注销列表对齐、参数名 permitNo 保持一致），还必须把 queryParams 里新增字段写成 permitNo: undefined，因为 resetQuery 是从 data() 重新取 queryParams，漏写会导致「重置」清不掉该筛选项。参照同类列表的参数命名与位置，比自创更安全。
  - 依据：会话 08aa1b08 最终结论：改列名时特意保留 prop: 'applyTime' 不变，理由是该文件的 tableColumnConfig.js 按 prop 持久化到 localStorage，换 prop 会让用户自定义列配置失效；取值改由 formatter 按 permitIssueTime → applyTime → createTime 回退；新增 permitNo 写入 queryParams 默认值以支持重置。
- 会话 `session_92f14ad8ea3d61cd3f2e758f2ce4acb6`（苏州市房地产监测V3）→ **s1488：预售批次字段改只读后端自动生成**
  - 内容：`src/views/presale/permit/components/PermitInfoPanel.vue`将 editable `zs-input-number` 替换为 disabled `zs-input`(placeholder "系统自动生成")，移除`prop="batchNo"`。`detail.vue`移除`batchNo`必填校验与保存载荷，批次号改由后端按申请次数自动生成。
  - 依据：extracted source=zcode session=session_92f14ad8ea3d61cd3f2e758f2ce4acb6
- 会话 `session_7f2e2d90410f7e1562f496bdbb3c95f0`（苏州市房地产监测V3）→ **s0013：要件附件按名称从企业/项目来源自动带出：prefillSources + 严格同名 + 别名表的完整设计**
  - 内容：场景：预售许可「要件上传」需要把企业备案、项目宗地、楼幢证书里已有的附件自动带回，减少重复上传。做法：新建 utils/appendixPrefill.js 承担三件事——附件名归一化（合并连续空白 + 去掉首尾空格）、显式别名表解析（目前只登记「营业执照 ↔ 营业执照正本原件」，别名表要显式维护而不是模糊匹配，否则会误配）、把后端路径转成虚拟附件对象。组件 AppendixPackageSection 新增两个默认空数组的可选 props：prefillSources（按 busCode+busId 调 listAppendixPackage 拉附件包）与 prefillFiles（处理路径型来源），默认值为空保证所有现有页面行为不变。预填逻辑必须插在 handleConfig 处理链的最前面，并把「来源签名」并入 appendixReloadKey，这样切换项目、增删楼幢才会自动重新拉取。填充只写空格子，用户自己上传过的格子不覆盖；带出件统一标 fileSource='2'，缩略图据此不渲染删除按钮但保留预览和下载。列表 key 必须写成 appendixId || fileSite，因为带出件没有 appendixId，否则 key 重复导致缩略图错位。保存接口入参不变，附件由后端自动挂载。与已知清单第 89 条（附件统一走 listAppendixPackage，busCode 区分业务）的差异：那条只讲「怎么调接口」，这条补的是跨模块回填的架构约定与只读态、key 兜底、reloadKey 签名三个具体坑。
  - 依据：会话 session_7f2e2d90410f7e1562f496bdbb3c95f0 中用户要求「选项目后用项目接口里的项目ID和企业ID获取配置附件并按附件名称匹配填充」，最终结论给出三处来源表（企业备案 busCode=040100/busId=companyRecordId、项目 /presale/permit/project/info 的 landContractUrls、楼幢 /presale/permit/building/available 的 planLicenceUrl/consLicenceUrl），并说明带出件只读、保存入参不变；验证时用临时脚本覆盖了别名匹配、空来源不填、已上传不覆盖、中文文件名解码等场景。
- 会话 `session_f7967c90115c8b16911d7e9608044e34`（门户）→ **x3534：租赁类别列渲染按钮无功能改纯文本**
  - 内容：`RentalPages.vue` 的“租赁类别”列原渲染为绑定空函数 `noop()` 的 `<button>`，产生无效悬停与点击态。改为 `<span>住房租赁企业</span>` 纯文本并删除 `noop()`，文字色沿用 `#222`，不影响“企业档案”链接列。
  - 依据：extracted source=zcode session=session_f7967c90115c8b16911d7e9608044e34
- 会话 `session_da9b2bda195bdfca7b27e2a181f01d16`（苏州市房地产监测V3）→ **s0146：Web 后台「页内变更/编辑模式」必须把路由当唯一状态源：模式标志放 data() 不放 created()，否则组件重建后被 immediate watcher 抢先执行**
  - 内容：【什么情况】zhi2-web-admin（Vue3 + Element Plus）要求管理员变更在备案详情页内完成：router.replace 到同路由 formMode=edit 并带 companyAdminChangeId，不跳新页面；保存走 /company/companyAdminChange/update、提交走 /submit。上线后 bug：点「变更」调完 getLast + 变更单 detail，页面立刻退回 formMode=view，表单从 1 变 0，网络面板 detail/list/version.json 成串重复。

【为什么】AppMain 用 $route.fullPath 做详情组件 key，路由一变组件整个重建。新实例中 formMode 的 watcher 带 immediate:true，执行早于 created()：先 init()→getDetail()，此时 inPageChangeMode 还没在 created() 里置 true，changeActive=false，请求走的是备案详情接口；备案详情返回 bizState='2'（已备案自身状态），随后 created() 把 inPageChangeMode 置真，detailCallback 里 inPageChangeMode && bizState==='2' 成立，触发 exitInPageChangeMode() 退回 view 并重拉备案详情，形成来回跳转。

【怎么做】① inPageChangeMode 从 created() 移到 data()，初始化阶段就按路由 companyAdminChangeId 判定，组件重建后第一次 getDetail 即走正确的变更单接口；② 新增 detailFromChange 标记记录回填数据来源，退出判定加上该前提，避免把备案详情的 bizState=2 误判成「变更单已备案」；③ handleStartChange 中置 detailFromChange=true，保留原有自动退出逻辑。通用教训：immediate watcher 早于 created，凡依赖路由的模式标志必须在 data()/setup 顶层同步算出。验证用 Playwright 连本地 8081 跑真实管理员账号，比对改动前后路由与 .section-form 数量。
  - 依据：会话中用户报「这个变更现在点了不会进入编辑模式了，调完接口直接刷新了」；最终结论给出组件重建 + watcher immediate 早于 created + bizState='2' 误判的三段根因，并给出 inPageChangeMode 移到 data()、新增 detailFromChange 的改法；Playwright 验证改动前路由立刻退回 view 且表单元素由 1 变 0、改动后稳定停留 formMode=edit 且刷新仍在编辑态，e2e/company/company-admin-routes-probe.spec.js 通过
- 会话 `sess_subagent_agent_79d2e82d-c4c2-482b-b06e-28d1e124cc15`（门户）→ **x3385：门户对外首页 UnifiedLogin 与登录后首页 index-wrapper 路由分工**
  - 内容：zhi2-web-admin 中「门户首页」有两套入口：未登录对外门户走 /UnifiedLogin（UnifiedLogin.vue，含公示公告、platform-banner、publicPortal 宿主）；登录后工作区首页为 ''→/index 的 index-wrapper.vue，默认 index-new.vue（按角色/布局的新首页），localStorage.cwzxt 存在时回退 index-bak（含 FastGuide）。全屏对外业务流在同一路由用 query ?portal=... 驱动 publicPortal/PortalDialogHost 与 pages 下各业务页，API 侧对外公告用 api/portal/externalInfo.js，登录后应用入口用 api/portal/home.js。
  - 依据：子代理只读探索汇总 router、index-wrapper 分流与 publicPortal 目录职责。
- 会话 `session_9aa856baf3b1b1c6028c26512bf5a74c`（门户）→ **x3531：单价列格式化缺两位小数致显示不一致**
  - 内容：`PropertyPages.vue` 的 `formatUnitPrice` 原传入0位小数，导致列表单价无小数及千分位。修改为 `formatPortalNumber(value, 2)` 以 `toLocaleString` 输出千分位与两位小数，与建筑面积列格式对齐；导出 CSV 仍写 `row.unitPrice` 原值。
  - 依据：extracted source=zcode session=session_9aa856baf3b1b1c6028c26512bf5a74c
- 会话 `sess_subagent_agent_9f2817ae-1780-442c-aab4-82716458bd16`（苏州市房地产监测V3）→ **s0148：企业/项目附件没有独立接口：全部复用 listAppendixPackage「要件包」，靠 busCode + 多维过滤区分**
  - 内容：场景：在苏州房地产监测V3（monorepo 只有前端主仓 + zhi2-web-admin 子模块，仓库内没有任何 Java/Spring 服务，「企业附件/项目附件」的后端契约只能从前端调用点、e2e 打桩和联调记录反推）里找「配置附件」能力时，不要去找 enterpriseAttachment/projectAttachment 之类的接口，它们不存在。
为什么：企业级与项目级附件共用同一个要件包接口 POST /file/appendix/listAppendixPackage（网关前缀 /api/v3.0），级别由业务编码决定而非由独立 URL 决定。
怎么做：请求体 = busCode（必传，来自菜单 meta.busCode 或前端常量）+ 可选 busId / companyId / projectId / buildingId / presalePermitId / autoBind。busId 不传只返回配置骨架（用于新增页渲染空要件位）；autoBind:false 表示只读取、不回挂默认业务附件；configOnly 模式下只传 busCode 不传其余过滤字段。真正权威的请求体构造只有 components/AnnexUpload/index.vue 的 buildListAppendixPackageQuery 与 AppendixPackageSection，新页面应复用这两个组件而不是自己拼包。另有两套旁路：/file/appendixConfig/*（附件配置维护，列表页 mixin 自动拼）与旧的 /file/file/*（文件表 CRUD）。
与已知清单差异：已知条目只写了「busCode 区分业务、busId 取业务主键」，本条的增量是 busId 省略返回骨架、autoBind、configOnly、以及 companyId/projectId/buildingId/presalePermitId 四个过滤维度与权威构造点。
  - 依据：会话问「find the APIs related to attachments configured at ENTERPRISE and PROJECT level」，结论明确写「这个仓库没有后端 Java 代码」「企业附件/项目附件并不存在独立的接口，二者共用同一个「要件包」接口 POST /file/appendix/listAppendixPackage」；zhi2-web-admin/src/api/fwgl/fjgl.js:57-64 的 getShareFile 即该 url；AnnexUpload/index.vue:493-505 构造 {busCode,busId,companyId,projectId,buildingId,...queryData}；ZsSubmit/index.vue:121-124 传 autoBind:false。
- 会话 `session_1049d6185d5fcfff06cfb94108b48261`（门户）→ **x3376：[门户] 苏周到扫码登录三接口迁至 /portal/login/external/suzhouDao（网关仍走 v3.0 portal base）**
  - 内容：苏周到扫码登录 API 前缀从 `/security/ctAuth/suzhouDao/*` 改为 `/portal/login/external/suzhouDao/*`（`getQrLoginParam`、`scanLogin`、`suzhouDao/login` 三个函数，通常集中在 `src/api/security/suzhouDao.js`）。浏览器最终 URL 形如 `/api/v3.0/portal/login/external/suzhouDao/...`：无需手写 `/api/v3.0`，`request.js` 拦截器对以 `/portal/` 开头的 URL 自动切到 `VITE_APP_PORTAL_BASE_URL` 并走 POST；vite/nginx 的 `/api/v3.0` 代理一般已存在。扫码弹窗与授权回调页逻辑可不动。联调注意：`scanLogin` 若后端要求 query 的 `qrCodeId` 而非 JSON body，会 400——可把该路径加入 `portalApiRewrite.js` 的 NO_BODY 类处理（与项目现有 portal 重写约定一致）。
  - 依据：会话 session_1049d6185d5fcfff06cfb94108b48261：要求三接口把 `/v2.0/security/ctAuth` 改为 `/v3.0/portal/login/external`；结论仅改 suzhouDao.js 路由前缀，构建产物含三新路径，并说明 scanLogin body 与 query 契约需联调确认。
- 会话 `session_dcca4ee681a8111b7f2b93027268aa1e`（苏州市房地产监测V3）→ **s0294：详情页「返回」找不到授权菜单：不报错，静默降级浏览器返回（router.resolve 判可用性）**
  - 内容：场景：详情页点返回时，若算出的目标不在已授权菜单里，老代码直接弹「没有授权相关菜单 / 未找到返回列表路由」，用户被卡在详情页。根因：返回目标只靠 backUrl 或拼父路径字符串，从不校验该路径在当前路由表里是否真能命中页面（vue-router 的 catch-all 会把它 redirect 到 /404）。解法：新增 utils/detailBackNavigation.js 提供无副作用方法——isNavigableLocation() 用 router.resolve() 判断目标是否命中真实页面（/404、未填充的 :tableid 都算不可用）；resolveBackUrlPath() 校验 backUrl；resolveDetailBackLocation() 按 backUrl → 直接父路径取第一个可用目标；goBackFromDetail() 先关当前页签，有可用目标就正常跳转（带 type:'back'），没有就 history.back()，连历史都没有才回首页。接入点：共享返回按钮 components/OperationBtnGroup/index.vue、main.js 的全局 goBack mixin、changeDetailMixin.goBackChangeIndex、limitFormMixin.handleOperationBack、picture.vue、statistics/detail.vue。配套：utils/ruoyi.js 的 getRouterPathByFilePath 加可选 silent 参数（非返回场景仍照旧提示抛错，行为不变）；router/index.js 的 /404 守卫在 query 带 type=back 时取消本次导航留在当前页（vue-router 3.6.5 的 catch-all redirect 确实会保留 query，判断才生效）。注意：这条取代了早期「截断路径回列表页并抛错」的做法，需求已明确改为不提示。
  - 依据：032.md 会话 session_dcca4ee681a8111b7f2b93027268aa1e：用户要求「点详情页返回按钮，找不到菜单的话改为使用浏览器返回，不要提示错误」；结论给出 detailBackNavigation.js 四个方法与 7 处接入点，并用 vue-router 3.6.5 源码确认 redirect 保留 query；eslint 无新增报错、npm run test 构建连续三次退出码 0。

## pi / zcode / codex 未命中会话的规则依据

### pi

- `01a05c09-eb64-74f7-95e8-aa8d6dc25687`（Administrator）：结论过短。结论摘录：```
- `01a05c0c-a45e-7079-8f97-195ba2a9dfae`（Administrator）：缺少技术结论信号。结论摘录：对不起，我无法直接执行命令。我是一个文本基础的AI助手，无法直接运行系统命令。你可以将上述命令复制到你的终端或命令提示符中运行，以查看C盘上占用空间最大的文件和文件夹。
- `01a05c51-b3c0-731b-8953-bc89c2f54551`（Administrator）：无结论。结论摘录：
- `01a1618f-fbd1-7553-b4af-dfd8abf907b4`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：已清理：删除了 `zhi2-web-admin/src/api/system.js` 中的 `getZhizaiyunToken` 函数，项目中已无该接口的引用。
- `01a1621f-25d5-7628-b520-45732efbe986`（门户）：缺少技术结论信号。结论摘录：已完成。`src/views/home/operationGuide/config/operationGuideContent.js` 中 4 处「查看全网通办网点」的外链地址已从 `https://www.jszwfw.gov.cn` 全部替换为 `https://szfang.szfcweb.cn/map`（涉及存量房 buy/sell 的中介成交、自行成交四个面板）。
- `01a1622c-057c-7628-b520-458d134c7a73`（苏住房G）：命中保守排除规则。结论摘录：完成 ✅ - 冲突文件仅 `src/views/home/index-v2.vue`（HEAD 删除了 `openRectification`，远端保留），采用保留该方法的版本，import 与依赖（`RECTIFICATION_NOTICE_LIST_FILE_PATH`）均完好。 - 已提交 `a2479b8` 并推送到 `origin/develop/v2.6.2-suzhufang`。
- `01a1622d-d3a7-7628-b520-4599d0692480`（苏住房G）：结论过短。结论摘录：已删除 3 个图片文件，工作区现在是干净的 ✅
- `01a16235-54c9-7628-b520-45db25a59c65`（门户）：缺少技术结论信号。结论摘录：已更新：分区卡内的卡片标题改为 `font-size: 24px; font-weight: 700; color: #333`（保持居中）。查询面板等使用同一标题类的地方也会生效，如需排除某处再告诉我。
- `01a1624a-3e9a-70c5-a400-74b2f0e11950`（门户）：缺少技术结论信号。结论摘录：已调整： - 卡片整体加了 `text-align: center`，标题、材料清单块整体居中。 - 「材料清单」及条目包在 `.og-card-materials`（`inline-block` + `text-align: left`）里，块内文字左对齐、整个块相对卡片居中。 效果即截图中的样式：清单内容左对齐，但整体在卡片里水平居中。
- `01a1624b-ebdb-70c5-a400-74b4df5b135b`（门户）：缺少技术结论信号。结论摘录：已将红框那个「(一) 办理房地产经纪机构入网信息登记」面板的最小高度从 `178px` 改为 `96px`（`OperationGuideBody.vue` 中的 `.og-panel.is-compact`），刷新页面即可看到效果。如果还想更矮，告诉我具体期望高度。
- `01a1625f-1584-70c5-a400-74dc6d3cf8a5`（门户）：缺少技术结论信号。结论摘录：完成。操作指引相关文件检查结果： - **`src/views/home/operationGuide/config/operationGuideContent.js`**：全部英文括号已换成中文括号（共 56 处），包括「（1）（2）…」编号和文中的说明性括号，如「（存在共有情形的）」「（依法取得经营管理权…的）」等。 - 其余相关文件（`operationGuideMeta.js`、`operationGuideBanners.js`、各组件、`UnifiedLogin.vue`、`rentalContractFields.js`）的文案中未发现含英文括号的中文文案；代码逻辑里的括号（函数参数、正则等）保持不变。 - 修改后已验证模块语法正常（syntax OK）。
- `01a16261-4db2-70c5-a400-74e89615e7e7`（门户）：缺少技术结论信号。结论摘录：已把 `min-width: 7em` 改为 `8em`，所有列的标签宽度统一为 8em（最长标签“出租方身份证号”约 7em，留有余量），这样每一列标签到值的间距完全一致，三列的值也都在相同偏移处左对齐。 刷新看下效果，若想间距再宽/窄一点，只需调这一个值。
- `01a16270-1de1-70c5-a400-751d2ed82521`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：已完成，修改文件 `src/views/company/companyChangeManage/index.vue`： 1. **筛选区**：「业务状态」从「变更申请时间」之前移到所有筛选项之后（搜索/重置按钮前）。 2. **表格列**：「业务状态」列移到最后（备案时间之后、操作列之前）。 该组件为开发/经纪/租赁机构变更管理共用，三处入口会同时生效。
- `01a16297-ef93-70c5-a400-755e9c5ad7fd`（门户）：缺少技术结论信号。结论摘录：完成。改动如下： 1. **新增图片**（3840×800，已压缩为 JPG）： - `public/assets/images/operationGuide/banner_guide_1.jpg`（运河与古塔水乡） - `public/assets/images/operationGuide/banner_guide_2.jpg`（虎丘塔城市全景） - `public/assets/images/operationGuide/banner_guide_3.jpg`（东方之门 CBD） 2. **修改配置** `src/views/home/operationGuide/config/operationGuideBanners.js`：三条业务线（商品房/存量房/住房租赁）的轮播均改为这 3
- `01a162c7-3a31-70c5-a400-75c98c621faa`（苏州市房地产监测V3）：一次性维护或迁移噪声。结论摘录：已完成提交并推送。 \| 项 \| 内容 \| \|---\|---\| \| **分支** \| `develop/v3.0.0` \| \| **提交** \| `b110a6d` — `fix(zs-dialog): 表单弹窗超高时 body 内滚动，避免底部按钮被裁切` \| \| **变更** \| `src/components/zs-dialog/zs-dialog.vue`（+42 / -13） \| \| **远程** \| 已推送到 `origin/develop/v3.0.0` \|
- `01a162dd-bcd4-70c5-a400-76066a43a067`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：已在苏州 2016 合同左侧目录 `SzNav.vue` 里加大**二级条款**（如「第一条、第二条…」）的缩进： - 子列表整体增加 `padding-left: 12px` - 二级项 `li` 左内边距：`14px` → `26px` - 二级项文字 `a` 左内边距：`26px` → `34px` 刷新预售合同签订页即可看到效果。若指的是**系统左侧主导航**的二级菜单，说一下我再去改 `RecursiveMenu`。
- `01a16678-15e4-70c5-a400-769ed6b1b6c5`（苏州市房地产监测V3）：缺少文件引用。结论摘录：已完成。新文件：`Downloads/研发-前端-田野-2026.10.19-10.23-周报-含禅道.xlsx`（原文件保留未动） ## 连通性确认 DBX 的 MCP 已接入，两个禅道连接都实测可查： \| 连接 \| 状态 \| 数据量 \| 最新数据 \| \|---\|---\|---\|---\| \| 新禅道 192.168.1.87:13306 \| ✅ 通 \| 2045 任务 / 5632 Bug \| 2026-10-23 10:21 \| \| 老禅道 mysql.zhi.com:3306 \| ✅ 通 \| 35889 任务 / 43775 Bug \| 2026-09-23（已停用） \| 你选了**新禅道**。本周你（tiany）名下完成记录共 **22 条**
- `01a16695-89ee-764e-99b7-41916fc6cb4a`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：“申请时间”列之所以为空，是因为接口返回的字段是 `applyTime`，而页面绑定的字段是 `createTime`，两者不匹配。 改动： **`src/views/commercialHousingSales/presale/specialcontract/index.vue`**（列表） - 申请时间列的 `prop` 从 `createTime` 改为 `applyTime`，格式化器从 `dateFormatter`（只保留到日）改为 `dateTimeFormatter`（精确到秒，与接口返回的 `2026-09-22 12:37:24` 格式一致） **`src/views/commercialHousingSales/presale/specialcontract/detai
- `01a1674d-34a3-764e-99b7-420d0f131f3a`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：已去掉「点新增后列表里凭空多一条未保存草稿行」的逻辑。列表现在只渲染接口 `page` / `pageManage` 真实返回的数据。 改动： - `src/views/institution/agencyBranch/components/AgencyBranchList.vue` - 删除 `mergeDraftRowFromSession()`（把 sessionStorage 草稿 `unshift` 成 `_unsavedDraft` 行的逻辑） - 删除 `deleteSuccessCallback()` 里的草稿清理 - `getList()` 恢复为只走 `listCallback(res)` - 移除 `agencyBranchDraft.js` 的 import - `s
- `01a16784-264e-764e-99b7-421ec9bea504`（无锡市区G）：命中保守排除规则。结论摘录：已按「先子模块、后父模块」的顺序提交并推送完成。 **1. 子模块 `zhi2-web-admin`（分支 `develop/v2.6.1`）** - 提交：`d99d12043 fix: 停车泊位删除接口改为 parkingSpaceDetailIds 数组入参` - 改动：`src/api/benefit/pubParkingSpaceDetail.js`、`src/views/benefit/parkingSpace/index.vue`（+17 −3） - 已推送：`21d169753..d99d12043 develop/v2.6.1 -> develop/v2.6.1` **2. 父模块 `无锡市区G`（分支 `develop/v2.6.1`）** - 提交：`26b1b12 c
- `01a16788-e04f-764e-99b7-422aa24f4eff`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：已完成。 - **子模块**：仓库无子模块，未单独处理。 - **提交**：`4c0393519`（分支 `develop/v3.0.0`） - **推送**：`origin/develop/v3.0.0`（`3389f6d91..4c0393519`） **本次仅包含 4 个文件：** - `src/utils/branchStatus.js` - `src/utils/personnelStatus.js` - `src/views/institution/agencyBranch/components/AgencyBranchList.vue` - `e2e/institution/agency-branch-status.spec.js` 工作区里其余未暂存改动未纳入本次提交。
- `01a167a3-e6fc-764e-99b7-4248f80047cc`（门户）：命中保守排除规则。结论摘录：全部提交并推送完成。 **子模块** `zhi2-web-admin`（`develop/v2.6.2-portal`） - 提交 `f98ac7da7`：fix(unified-login): 提前平台 banner 文字动效开始时间 - 已推送：`e582db076..f98ac7da7` **父仓库** `门户`（`develop/v2.6.2-portal`） - 提交 `8e21a1c`：chore: update zhi2-web-admin submodule to commit f98ac7d（指针 e582db0 → f98ac7d） - 已推送：`fd9ef3e..8e21a1c` 两个仓库工作区都是干净的，且本地与远端完全同步（`## ...origin/...` 无 
- `01a167b3-ee40-764e-99b7-42635695ae80`（泰兴G）：一次性维护或迁移噪声。结论摘录：全部处理完成。 ## 磁盘空间节省 \| 批次 \| 项目数 \| 改造前 \| 改造后 \| 节省 \| \|---\|---\|---\|---\|---\| \| 第一批（Vite） \| 19 \| 16.20 GB \| 6.47 GB \| **9.73 GB（60.1%）** \| \| 第二批（uni/vue-cli/pnpm） \| 17 \| 9.95 GB \| 6.38 GB \| **3.56 GB（35.8%）** \| \| **合计** \| **36** \| **26.14 GB** \| **12.85 GB** \| **13.29 GB（50.8%）** \| 扣除 bun 全局缓存 2.4 GB 后，**净节省约 10.9 GB**。 单项目最大收
- `01a16803-0c22-764e-99b7-42edf5776b0c`（门户）：缺少技术结论信号。结论摘录：已调整 `UnifiedLogin.vue` 里横幅下方三个「操作指引」卡片（商品房 / 存量房 / 住房租赁）的内部排版： 1. **`.guide-card`**：`align-items: flex-start` → **`align-items: center`**，标题和「操作指引」行在卡片内水平居中。 2. **`.guide-title`**：增加 **`width: 100%`**，保证标题在整卡宽度内居中。 外层 `.guide-cards-wrap` 本身已是 `left: 50%` + `translateX(-50%)`，整组卡片相对页面本来就是居中的。刷新统一登录/门户首页即可看到效果。若你指的是红框里别的区域（例如四列菜单），说一下具体区块我再改。
- `01a16816-b2c9-764e-99b7-42f61e5a65e2`（门户）：缺少技术结论信号。结论摘录：已按你的要求改好了，主要动在 `HomeAiPanel.vue`： **布局** - 用 `home-ai-panel__inner` 做 **横向 flex**：左侧文案「敬请期待」，右侧机器人图。 - 去掉标题居中 + 机器人绝对定位的旧写法。 **文案样式** - `font-weight: 700` - `font-size: 49px` - `color: #2D3C78` - `line-height: 71px` **图片** - 机器人：`width` / `height` 均为 **194px**，`object-fit: contain`。 **高度** - 面板与 `HomeLayoutAdmin` 里 `.admin-grid-ai` 的 `min-height` 从
- `01a16846-8301-7740-9035-fb252db3bfbf`（苏州市房地产监测V3）：一次性维护或迁移噪声。结论摘录：**已完成** - **子模块**：`zhi2-web-admin` 无子模块，无需先提交子仓库。 - **本次仅提交 1 个文件**：`src/views/institution/agencyBranch/components/AgencyBranchDetail.vue` - **提交**：`412dc280d` — `fix(institution): 分支机构详情启用公共提交与审核` - **推送**：`origin/develop/v3.0.0`（`96d6e26af..412dc280d`） 工作区里其余未提交的 e2e、`version.json` 等改动**未纳入**本次提交。
- `01a170e0-86a9-7048-964a-22b05b9e5b7f`（苏州市房地产监测V3）：缺少文件引用。结论摘录：Skill 已创建完成：`D:/repository/skills/zentao-analyzer/` ## 文件结构 \| 文件 \| 作用 \| \| --- \| --- \| \| `SKILL.md` \| 主技能文件，frontmatter 的 description 写明了触发条件（提到禅道 / 出现禅道链接） \| \| `zentao_html.py` \| 辅助脚本：禅道正文 HTML → 纯文本 + 抽取图片 fileID（纯标准库） \| \| `README.md` \| 安装与使用说明 \| ## 已验证的实测结论（已写进 SKILL.md 第七节） 我用你给的三个真实链接在新禅道库上跑通了全流程： **story 1319**（`m=execution&f=st
- `01a171d5-c145-7048-964a-22e0f444ec25`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：全部停止成功。 ## 已停止的 7 个 JDK 21 服务 \| PID \| 服务 \| \|---\|---\| \| 41868 \| common-framework \| \| 13604 \| data-property \| \| 41964 \| common-flowable \| \| 32160 \| zhi3-presale \| \| 32220 \| zhi3-prefund \| \| 42940 \| zhi3-external \| \| 38220 \| common-gateway \| 确认：`tasklist` 已无 `java.exe` 进程，JDK 服务全部干净退出。 ⚠️ 提醒：这些是你之前部署的**苏州市房地产监测V3 后端微服务**（跑在 

### zcode

- `session_6410887b064caf40c930d9efc2eb15b3`（门户）：缺少技术结论信号。结论摘录：已改好：出租方、承租方各用与下方相同的 **3 列网格**（`portal-rental-result-grid`），名称在第 1 列、身份证号在第 2 列，与下面每行 3 个字段里的**第 2 个字段**同一竖线对齐；第 3 列留空。刷新页面即可核对。
- `session_de7d0da11f576ffa1067abd85600e92a`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：推送已完成。 - **子模块** `zhi2-web-admin`：`develop/v3.0.0` → `9c70ce28a` - **父仓库**：`develop/v3.0.0` → `b1e55d3`
- `sess_subagent_agent_640e0c24-a586-4ab6-9459-6630b65df2a4`（门户）：缺少技术结论信号。结论摘录：## 设计图目录清单 **路径:** `C:\Users\Administrator\Downloads\设计图` **文件数:** 9 个 PNG（无子目录） **平台:** 苏州房产综合服务平台 **说明:** 本目录**没有**独立「首页 + Banner 轮播」稿；均为业务线**操作指引 / 查询**子页，共用同一套 **Banner 头图 + 标题 + 副标题 + Tab 切换** 模式。Banner 为**静态插画**（苏式建筑、桥、云），不是多图轮播控件稿。 --- ### 功能映射总表 \| 业务线 \| 操作指引（Tab 态） \| 查询/详情 \| \|--------\|-------------------\|-----------\| \| **二手房（存量房）**
- `sess_subagent_agent_4d620c6d-7bf4-4bee-8eaa-cd4ee04aed3d`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：Searching the 建湖G repository for the contract template detail page and 范本内容 flow.
- `sess_subagent_agent_fe813609-be5a-4f11-a92b-1bf7385711de`（苏州市房地产监测V3）：结论过短。结论摘录：正在并行搜索这些 API 路径与相关页面。
- `sess_subagent_agent_53b59114-b84d-4de9-9c3e-4fc60a0f994e`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：正在 `zhi2-web-admin` 中搜索与企业基本信息详情及提交接口相关的代码。
- `session_8d0fe7dac3de127e880f45da6f6791a6`（门户）：缺少技术结论信号。结论摘录：完成。修改了 `RentalPages.vue`（zhi2-web-admin/src/views/home/publicPortal/pages/）： - 在开业信息公示企业列表的 `listColumns` 中，“企业档案”列前新增“租赁类别”列（RentalPages.vue:159）。 - 为该列添加了 `#cell-rentalCategory` 插槽，渲染一个与“基本信息”同样式的链接按钮“住房租赁企业”，点击绑定到空的 `noop` 方法，暂不做任何逻辑。 该改动只影响开业信息公示的企业列表；人员列表和信用记录列表的列定义未动。如果后续要加点击逻辑，把 `noop` 换成实际方法即可。
- `session_b78e03a393696d45d4fdf666815bf7ba`（门户）：缺少技术结论信号。结论摘录：已按图1设计稿修改了“住房租赁-机构档案-基本信息”弹窗（`zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue`），ESLint 通过。改动内容： 1. **移除顶部企业 logo 和微信二维码区域** — 企业弹窗正文直接从字段列表开始，与设计图一致。同时清理了 `wechatQrSrc` 计算属性和 `PORTAL_WECHAT_QR`、`isAllowedPortalImageUrl` 的无用导入。 2. **标题“基本信息”改为左对齐**，并去掉了标题栏的灰底和下边线（设计图中标题是白底左对齐，右上角保留关闭按钮）。 3. **底部新增“取消 / 确定”按钮栏** — 复用了原有人员
- `session_743e06b72bab665dfd58571590884a3b`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：修改完成。接口返回值更新后，苏州2016 合同章节的字段回填已打通。 **改动内容**（仅 1 个文件：`zhi2-web-admin/src/views/contract/chapters/suzhou2016/mixins/szForm.js`）： - 新增 `BASIC_DATA_ALIAS` 映射常量，收录 14 个「sz2016 别名 → 接口新字段名」的对应关系，覆盖 chapter2 第一、二条：土地证类型/编号（`landCertType→typeOfLandCertificate` 等）、规划/施工许可证号、销售依据编号（`saleDocNo→presaleLicenseNo`）、公安门牌号（`policeDoorplate→policeHouseNo`）、房屋用途、建筑结
- `sess_subagent_agent_6f8f3c45-0d6c-44c4-aacb-9bd24c030c4f`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：搜索完成。以下是完整报告。 # `/presale/contractMainInfo/getContractFillInfo` 前端使用情况报告 ## 关键结论（注意拼写差异） 前端**没有** `getContractFillInfo`（单数）的任何引用。实际使用的接口路径是复数形式 **`/presale/contractMainInfo/getContractFillInfos`**，对应前端函数名 `getContractFillInfos`。全仓库（含 dist、docs）该路径只出现在 3 个源文件 + 2 个构建产物中，且后端文档也无单数形式——确认单数形式在前端不存在。 ## 1. API 定义文件位置与当前定义 文件：`D:\repository\苏州市房地产监测V3\zh
- `session_bfd35c0390159714bb4edd3c876c153a`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：编辑态正确，按钮是「返回 / 保存」。现在改一下备注并点保存验证。
- `sess_subagent_agent_f03e1b22-f797-41c6-8b4e-f693eb493c2c`（门户）：缺少技术结论信号。结论摘录：我已经完成调查。以下是完整报告。 --- # 1. 技术栈 ## 仓库结构 - 根目录 `D:\repository\门户\package.json`：仅作为 workspace 壳，`workspaces: ["zhi2-web-admin"]`，脚本全部转发到子模块（`dev` → `node scripts/pm.mjs dev`，`build` → `npm run --workspace=zhi2-web-admin build`）。 - 真正的应用在 git submodule：`D:\repository\门户\zhi2-web-admin\`（`package.json` name `zhi2-web-admin`, version 2.6.1, `"type": "modu
- `sess_subagent_agent_fc97f514-4de0-4e50-a075-5ba70d3dea11`（苏州市房地产监测V3）：无结论。结论摘录：
- `sess_subagent_agent_30ac39f4-9cc1-4fd6-8919-ab291663d0af`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：I'll start by mapping the repo structure and searching for the key terms in parallel.
- `sess_subagent_agent_4be87c5f-914e-4eed-a5b8-7b1a665f1bb5`（苏州市房地产监测V3）：一次性维护或迁移噪声。结论摘录：## Frontend Map — 苏州市房地产监测V3 ### 1. Repository layout (top level) ``` D:\repository\苏州市房地产监测V3\ ├── .gitmodules ← declares zhi2-web-admin as a submodule ├── package.json ← npm workspaces root: workspaces: ["zhi2-web-admin"] ├── icons.js ← root-level SVG icon registry ├── 路由信息.json ← exported route/menu reference dump (~300 KB) ├── 前端技术信息.md ← tech-
- `sess_subagent_agent_77b5bdd3-05a7-4134-bfa4-9109f6706ddf`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：Findings (all paths absolute): ## 1. Files Registration pages (both mounts of the same component): - `D:\repository\苏州市房地产监测V3\zhi2-web-admin\src\views\institutionRegister\index.vue:1-20` — agency (经纪) route `/institutionRegister`, passes `organ-type = ORGAN_TYPE_AGENCY` - `D:\repository\苏州市房地产监测V3\zhi2-web-admin\src\views\leaseInstitutionRegister\
- `sess_subagent_agent_a50953c9-329f-4aa5-bc2f-53dd7ba73cf1`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：## 1. Pages calling `/company/companyRecord/entryNetwork/save` **API layer** — `D:\repository\苏州市房地产监测V3\zhi2-web-admin\src\api\company\companyRecord.js` - `saveEntryNetwork(data, config)` → `POST /company/companyRecord/entryNetwork/save` (line 256-258) - `saveAgencyEntryNetwork(data, config)` (line 265-271) — strips `qualificationList`, then deleg
- `session_1d9bc3e0091c91ba70120a0ca5959d02`（门户）：缺少技术结论信号。结论摘录：两处标注都已改好，测试全绿。 **改动内容** 1. **标题高度改为 50px** — `OperationGuideHeader.vue` 里 `.og-logo` 原来 `height: 34px`，改成 50px；窄屏（≤1024px）下按比例从 24px 提到 32px。 2. **新增返回按钮** — 同样在 `OperationGuideHeader.vue`，在 header 内部改为 flex 两端对齐，右侧加了一个白描边胶囊按钮（返回箭头 + “返回”文字，符合设计里 header 两侧的排布）。点击后 `$emit('back')`，`:aria-label="返回"`。 `OperationGuide.vue` 里把已有的 `goHome()` 接了上去（`<oper
- `session_93e75673cc06d1e1f10c89464e361fd5`（门户）：缺少技术结论信号。结论摘录：改好了，改动在 `zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue:346`。 **改了什么** 「开发企业入网 →」原本是 `.og-callout-link`，样式是 `background: none; padding: 0; font-size: 18px`，渲染出来就是一行蓝字。现在改成实心按钮： - 字号 `32px`（原来 18px） - 蓝底 `#2a5faa` + 白色文字 + 4px 圆角，内边距 `14px 56px` - 补了 hover 深蓝和 `:focus-visible` 描边，因为键盘可聚焦的元素需要有可见焦点 - 小屏（≤1024px）下退到 20p
- `session_9e2cb88d3c1b34f378b9eb539ee41640`（门户）：缺少技术结论信号。结论摘录：完成。所有“图2”类型的横向箭头都在操作指引页面组件里，由 `.og-arrow` 用 CSS 伪元素绘制，现已全部替换为您提供的 SVG： - SVG 已存为 `zhi2-web-admin/src/assets/images/operationGuide/arrow-horizontal.svg` - [OperationGuideBody.vue](D:\repository\门户\zhi2-web-admin\src\views\home\operationGuide\components\OperationGuideBody.vue) 中删除了原来 `::before`/`::after` 画的箭头，改为以背景图方式引用该 SVG（尺寸 80×36，居中缩放） - 该组件覆盖了所有
- `session_e78c66d54d17db91fc844bff3956e0be`（门户）：缺少技术结论信号。结论摘录：确认完整了——这个链接 `https://szfang.szfcweb.cn` 在整个代码库里只出现在 `operationGuideContent.js` 的两处正文里（第 106 行买房、第 167 行卖房），而这两处都是通过 `OperationGuideBody.vue` 的同一个 `card.body` 渲染入口输出的，上一轮的修改已经全部覆盖。 具体实现（`zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue:32`）： - `splitUrl` 方法会把正文中所有 `http(s)://` 开头的地址自动切出来渲染成 `<a>` 链接，`target="_blank"` 新窗
- `session_e64e901a585d9aa7b9a5f9bc3547a5f7`（苏州市房地产监测V3）：缺少技术结论信号。结论摘录：路由已注册。现在去项目备案申请详情页点击“楼盘表”按钮复现。先找到该菜单入口。

### codex

- `rollout-2026-08-21T17-16-18-01a0239b-56dc-7e03-8112-efb843eda6d4`（苏住房C）：缺少技术结论信号。结论摘录：已定位到“共有资金”入口页：当前两个图标已经是用户给出的同款图形，但资源名仍是通用编号 `icon_complex_17/18`。我会改成含义明确的英文文件名，并同步页面引用，避免继续依赖编号资源。
- `rollout-2026-08-24T16-10-47-01a032d2-714d-7931-837f-6364977071a4`（苏住房G）：缺少技术结论信号。结论摘录：已新增银行授权变更功能： - 原授权列表“变更”改为调用 `/system/regionBankAuthChange/start/{authId}`，成功后进入变更记录编辑页。 - 新增变更记录列表，支持查询、查看、编辑草稿、删除草稿。 - 新增变更详情页，支持变更日期/说明、授权期限/范围、协议上传、保存、提交与审批，并展示变更前授权信息。 - 权限使用 `system:regionBankAuthChange:*`。 文件： - [原授权列表入口](D:\repository\苏住房G\zhi2-web-admin\src\views\system\regionBankAuth\index.vue) - [变更记录列表](D:\repository\苏住房G\zhi2-web-admin
- `rollout-2026-08-24T16-33-12-01a032e6-f7ca-7682-a9b1-934885b04f33`（产品2.0）：缺少文件引用。结论摘录：已生成技术信息文档：[前端技术信息.md](D:/repository/产品2.0/前端技术信息.md) 内容涵盖开发语言、Vue/UI 组件库、路由、状态管理、请求、构建、样式、Node 及浏览器兼容性。
- `rollout-2026-08-24T16-44-39-01a032f1-7265-7691-a0af-f2e0f37c6022`（苏住房G）：缺少文件引用。结论摘录：已对照并补齐前端实现： - 授权银行改为仅取启用的“承办银行”数据。 - 新增时协议不再校验；详情打印、线下签署后编辑上传；编辑及提交前强制校验协议。 - 承办银行所属系统改为多选，并兼容以逗号字符串提交/回显。 - 授权范围会按所选银行的所属系统自动置灰，且清除不适用的已选范围。 - 授权详情已补“变更”按钮；变更页仅可维护授权时间、范围、协议、变更日期和说明。 - 变更记录列表与详情已有的保存、提交、审批链路保持使用。 已通过相关文件 ESLint 与 diff 检查。完整测试构建在 124 秒超时前未输出编译错误，但未能完成。 请确认：打印配置中是否已为业务编码 `regionBankAuth` 配置协议模板？当前使用项目通用在线预览/打印机制；若未配置模板，打印按钮不会实际展示可用模
- `rollout-2026-08-24T17-55-46-01a03332-8e07-7f13-a9ba-76e254b7abc2`（产品2.0）：缺少技术结论信号。结论摘录：已还原本次需求改动，`landPlotCode` 请求体处理恢复原状。仓库中其他已有改动未动。
- `rollout-2026-08-24T18-07-05-01a0333c-e911-71d3-8394-b773964444d8`（园区公共收益）：缺少技术结论信号。结论摘录：已完成统一入口修正：显式 URL 查询参数和 `config.params.landPlotCode` 都会被移除，并合并到 POST body；其他查询参数保持不变，FormData 也会正确追加。现在做语法与构建检查。
- `rollout-2026-08-26T16-02-47-01a03d17-d435-7af3-b194-28c2e79fb0b6`（投资推送）：缺少文件引用。结论摘录：已完成实现、全区间回测和产物验收。核心结论： - 股息率 Alpha 集中在 Q5：年化 11.37%，比 Q1 高 5.70 个百分点，保留 Top10 更合理。 - 股息率 Top30 年化 14.71%，低于 Baseline 1 的 17.47%。这说明扩容会稀释 Q5 Alpha，不应改成 Top30。 - 低波因子最佳分位是 Q3（13.85%），不是预期的 Q1（9.92%），当前极端低波筛选需要重新设计。 - Full 无成本、低成本、当前成本年化分别为 15.75%、14.37%、13.51%。 - 当前成本侵蚀 2.24 个百分点，属于成本敏感；但无成本 Full 仍落后 Baseline 1 约 1.72 个百分点，因此成本和因子组合问题同时存在。 关键交付物： - [
- `rollout-2026-08-26T18-23-27-01a03d98-9f26-7290-b3d5-86b184ccc464`（投资推送）：无结论。结论摘录：
- `rollout-2026-09-24T18-12-06-01a0d2e6-a67e-78e3-a680-bee1b70f33a0`（量化选股）：已中断。结论摘录：已暂停 PDF 修复，完成[伊利限定诊断报告](/D:/repository/量化选股/storage/pilots/yili-rule-diagnostic-2026-10-08-v1/diagnostic-only.md)，`as_of=2026-09-30`。 - 原文条件测试：2024 年正权益 PASS，其余五门 UNKNOWN；这不是截止日硬门通过。 - 历史时点输入：六门均 UNKNOWN，未虚构可用日期。 - 穿透回报函数已执行，GG 为 UNKNOWN；绝对估值缺必填输入，未执行，Coverage(6) 保持未知。 - 101 项相关测试通过，报告重跑逐字节一致；未重跑全仓测试。 按龟龟 skill 保留原文／PIT 分离。规则、快照和九域状态未变；此前未完成修改保留，本轮
- `rollout-2026-10-11T12-45-18-01a12947-8fea-7f50-9c5b-4df3bd8d02b9`（门户）：缺少技术结论信号。结论摘录：已完成 24 张设计对应的全部弹窗，封装了公共表单、表格和详情组件，数据使用集中 Mock。需补充的图标、Banner、背景等素材保持留空。 33/33 项 E2E 全部通过。UI 内容区域还原度最低 **95.369%**，平均 **96.838%**（排除预留素材区域）。生产构建和 ESLint 均通过。 [测试报告](D:/repository/门户/zhi2-web-admin/test-results/public-portal-visual-summary.md) · [实现说明](D:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/README.md)
- `rollout-2026-10-11T12-52-00-01a1294d-b3e8-7133-a8d1-dfac822218b3`（门户）：缺少文件引用。结论摘录：最新修复复测通过：同一详情 URL 的不同经纪人可正确后退/前进；嵌套详情记录保留；浏览器回退与页头返回混用正常，无浏览器异常。 README 整体一致。建议说明：URL 保留界面层级，选中记录依赖会话历史快照，刷新后使用默认 Mock 记录。
- `rollout-2026-10-11T12-52-53-01a1294e-837f-7440-9a2a-dfdf82647a1a`（门户）：缺少技术结论信号。结论摘录：公告详情整体还原度 **96.072%**；标题区 96.372%、正文 95.833%、日期 97.470%。 已完成标点间距、换行、文案、标题字重和位置校准。新增仅供公告标题使用的 1.46 MB Medium 字体子集，附完整 OFL 许可，来源为 [Adobe 官方字库](https://github.com/adobe-fonts/source-han-sans/blob/release/SubsetOTF/CN/SourceHanSansCN-Medium.otf)。 ESLint、Vue 编译通过；已通知测试代理运行最终完整 E2E。

## 删除闸门

本报告未执行任何删除。待用户阅读报告后明确回复“确认删除”，才可执行永久删除。

- `C:\Users\Administrator\.pi\agent\sessions`：189 个文件，98.3 MiB。
- `C:\Users\Administrator\.zcode\cli\db\db.sqlite`：1 个文件，86.8 MiB。
- `C:\Users\Administrator\.codex\sessions`：33 个文件，325.3 MiB。

pi 文件数包含 .touches.json 等侧录元数据；它们不是额外会话。

Cursor 与 WorkBuddy 保留。执行删除前应重新核对源文件是否发生变化。