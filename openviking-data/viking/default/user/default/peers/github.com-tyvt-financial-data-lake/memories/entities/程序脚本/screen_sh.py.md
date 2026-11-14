# screen_sh.py
沪市打新底仓/选股筛选脚本，隶属数据湖选股模块，对沪市股票执行准入标准筛选并输出候选池；内含红利质量指标判定逻辑，可被探针复用只算数据不落盘对任意股票逐项判定。

## 基础池与筛选逻辑
- ①基础池 SQL：沪市主板 A 股 + 上市满 3 年（list_date <= base - 3年，第386-398行已含）+ 剔 ST/退市 + 剔科创板（substr(symbol,1,3) not like '688%'）；打印同步；沪市无创业板故仅需剔科创板
- 须同时满足沪市准入 11 条（连续三年分红+三年平均股息率>3.5%、净利同比正、资产负债率<60%、支付率30-80%、OCF/分红>1、ROE>8%、现金流/净利>80%、近12月收益>-20%、净利CAGR>3%、三年累计分红>10亿、年化波动<25%、63日均额≥5000万、股息率/均值<2倍）
- 银行仍须过独立银行专项门（核心一级≥9.5% 等），并自 2026-11-14 起要求近三年平均股息率严格 >5%（yld3，共用 bank_screen.bank_gate）；缺失或无效股息率视为不通过，非银行不受影响

## 性能优化（2026-11-11）
- 热点：cProfile 显示共用函数 div_agg（定义在 screen_sz.py）原 13.96s（嵌套 groupby 循环约 11.8 万组）为最大瓶颈；screen_sh.py 另有两处列表列展开 iterrows
- div_agg 向量化（一次 groupby(code,year) 求和+pivot）：13.96s→0.57s（32.5×），输出逐行一致（5696 代码相同）
- screen_sh.py 两处列表列展开改为 (n,3) 矩阵取列；沪市全量 32.3s→约 15s（2.2×），严格 <2 分钟（约 8× 余量），输出 CSV 改前改后 DataFrame.equals==True（12 行×25 列）
- 深市同受益（共用 div_agg）：全量 6.2s，结果仍 9 只不变；改动文件 screen_sz.py、screen_sh.py，均 py_compile 通过

## 验证与提交状态
- 2026-11-11 新增沪深统一基础池：①SQL 加剔科创板，与 screen_sz.py 对称；全部 py_compile 通过，改动未提交 git
- 2026-11-11 探针复用其函数对 24 只深市票逐项判定 14 项，输出对比矩阵至 分析产出/_沪标逐项对比.csv
- 2026-11-14 银行股息率门槛重跑：沪市入选 11 只，入选银行为渝农商行（三年均值 5.69%）、沪农商行（5.45%）；3 家银行被银行专项门剔除，其中 1 家三年均值 4.71%，另 2 家高于 5% 但监管指标不达标
- 2026-11-14 首次 watchdog 包装器误报沪市脚本失败，实际 SCRIPT_EXIT=0 且三份结果 CSV 已写出；本轮改动未提交 git

## Relations
- 与 screen_sz.py、final_portfolio_v3.py、annual_review.py 同属数据湖选股模块，与深市筛选脚本（pay3 同口径）并列
- 筛选标准细节见实体「数据湖筛选标准」

<!-- MEMORY_FIELDS
{
  "category": "程序脚本",
  "name": "screen_sh.py",
  "source_extraction_id": "255647515d6a4646a2d7d4bdf2b38fde",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 3,
  "memory_type": "entities"
}
-->