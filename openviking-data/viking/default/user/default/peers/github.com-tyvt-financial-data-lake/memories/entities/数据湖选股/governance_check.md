# 持仓治理核查
数据湖选股模块中对候选股票进行治理实控人核查的流程，输出预览CSV供人工确认。

## 抓取机制
- 单只抓取 fetch_one 独立请求、无共享状态，可安全并发
- 实控人判定调用 classify_owner
- 缓存与合并复用 fetch_many 同款逻辑
- 采用并发 4 路抓取，命中缓存跳过，失败重试最多 2 次，整体硬超时保护
- 网络依赖本地代理 127.0.0.1:7890（Clash/机场客户端端口），代理未运行会导致全部请求 ProxyError

## 输出与分类
- 结果写入分析产出/_治理预览.csv
- 判定分类：通过（国资/无实控人）、否决（个人/家族实控人）、待确认（法人未列名录/供销社集体所有制）、缺失

## 运行约束
- 单次治理运行需在 2 分钟内完成（用户设定的时限）
- 2026-11-11 排查发现「全待确认 / 法人误挂」真实根因为 ownership.py 相对路径致白名单未加载（非名录缺项），修复后 5 家央企回归通过、双汇进否决

<!-- MEMORY_FIELDS
{
  "category": "数据湖选股",
  "name": "governance_check",
  "source_extraction_id": "2571d6307e8e4e6f99943d20ceca54c3",
  "peer_id": "github.com-tyvt-financial-data-lake",
  "version": 2,
  "memory_type": "entities"
}
-->