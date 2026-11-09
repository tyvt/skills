# screen_sz.py
数据湖项目中用于深市筛选的分析脚本（文件名暗示市场）。
## 功能
- 执行深市标的筛选，输出深市专用标准_筛选结果.csv（2026-11-06 18:22 改，23 只名单不变，价格/波动/股息率全刷新）
- 2026-11-06 前加入 2 行 PIT 防未来函数修正（年报 OCF 仅取公告日 ≤ 基准日），但改完未跑 reselect_portfolio.py，组合与面板未吸收修正
## 关系
- 与 screen_sh.py 同为筛选链路脚本
- 上游被 reselect_portfolio.py 调用以生成组合


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "Python分析脚本",
  "name": "screen_sz.py",
  "source_extraction_id": "b26862bbbb3248ed8dd7f70dfda2437e",
  "version": 1,
  "memory_type": "entities"
}
-->