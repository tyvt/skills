# reselect_portfolio.py
按行业强制重跑权重的脚本。

## 关键逻辑
- 按数据湖 `industry_members`（申万一级行业）强制重跑权重，单只 25%、行业 35% 上限
- 扩池后交运达上限时现代投资、东莞控股被赋 w=0 不进候选
- 2026-11-11 起按 score 写出 `buy_list`（最多 min(3, floor(金额/3000)) 只，max_buys 改为 3），面板仅执行该清单
- score 定义为 1/√(波动率×|最大回撤|)，据此对候选排序
- 写清单时硬剔除现价高于目标买价超 10% 的标的（唐山港高 29.1%、渝农商行高 20.4% 不入选），面板容忍线由15%改为10%，「未买入」兜底名单超10%也不出现

## 2026-11-14 重选结果
- 重选已完成，但触发计划中的停止条件：按价格偏离目标买价超 10% 排除沪市候选后，仅剩沪市 2 只、深市 3 只可选
- 组合与面板数据库尚未同步；先核对生成的成员 CSV，再由用户决定是否维持价格门槛

<!-- MEMORY_FIELDS
{
  "category": "量化系统",
  "name": "reselect_portfolio_py",
  "source_extraction_id": "39b45ac42c61463285c698cec3db3015",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 3,
  "memory_type": "entities"
}
-->