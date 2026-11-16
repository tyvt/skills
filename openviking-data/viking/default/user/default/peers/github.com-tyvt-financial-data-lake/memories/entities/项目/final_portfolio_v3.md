# final_portfolio_v3 组合生成器
数据湖选股模块中负责生成最终持仓组合的脚本，带重选守卫与多档情景生成。

## 用途与产出
- 脚本 `final_portfolio_v3.py` 属于数据湖「分析产出」目录的分析产出脚本之一
- 生成结果写入配置，并与 SQLite（holding.sqlite）同步
- 组合目标数为 7 个，需核对权重总和

## 守卫与情景档位
- 重选器守卫要求：沪市 2 只 + 深市 3 只（2 沪 + 3 深）
- 执行配比 50/50，权重合计必须为 100%，单股与行业上限均须满足
- 生成时显式传入四档情景 50/48/45/43，每档权重均合计 100%

## 校验与人工干预
- 内置业务校验共 19 项，2026-11-15 运行终版生成器为 19/19 通过
- 手工保留标的：粤高速A、兴蓉环境，已追加到配置
- 配置变更后已做 SQLite 备份，备份的 `quick_check` 返回 `ok`

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "项目",
  "name": "final_portfolio_v3",
  "source_extraction_id": "c9371268ac9249c0809543d67d38422b",
  "version": 1,
  "memory_type": "entities"
}
-->