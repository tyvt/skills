# github.com-tyvt-financial-data-lake
- 正在维护个人持仓面板项目（单页 HTML + holding.sqlite），该面板为其自用监控工具 (as of 2026-11-11)
- 正在维护数据湖选股模块（final_portfolio_v3.py、annual_review.py、screen_sh.py、screen_sz.py 等分析产出脚本）(as of 2026-11-15)
- 数据湖分析产出目录于 2026-11-16 完成清理，由 64 个文件精简至 21 个（14 个活跃脚本 + 当期产物 + 治理清单 + 持仓面板）(as of 2026-11-16)
- final_portfolio_v3.py 默认 base 已改为 2026-11-13，对应 11-13 版成员权重与替补席 CSV 已入库 (as of 2026-11-16)
- 数据湖定时任务 Update 走 scripts/update_selection_lake.py（仅依赖 update_external_lake/external_lake），Audit 独立写抽检文件 (as of 2026-11-16)
- 该项目 GitHub 推送需经本地代理 127.0.0.1:7890，地址配置于 configs/selection_lake_policy.json (as of 2026-11-16)
- 数据湖选股项目统一回测口径：只用精确前复权价、深沪 PIT 去重、回测输出隔离 (as of 2026-11-15)
- 沪深 C2 共用门槛：近三年连续分红且三年平均股息率严格 >3.5%（须有有效 DPS 与年末价格），TTM 仅作参考 (as of 2026-11-15)
- 沪市清单为 5 只通过项（渝农商行、沪农商行、唐山港、洪城环境、青岛港），海尔智家财务达标但治理缓存待确认而单列、未计入 (as of 2026-11-15)
- 深市筛选当前 8 只通过财务、净利暂停与银行门；PIT 回测中 4 个有候选深市组平均收益 13.86%、基准 −13.81%、平均超额 27.68%，沪市 7 组无候选、收益记 N/A (as of 2026-11-15)
- 规则、沪市清单与 PIT 回测报告已推送至分支 feat/common-sz-standards-20261115（提交 347dd29），.task-state 筛选证据保持未提交 (as of 2026-11-15)

<!-- MEMORY_FIELDS
{
  "source_extraction_id": "86c8710ec78b425096e1592a00d8680d",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 16,
  "memory_type": "profile"
}
-->