# cn_broad分指数阈值环境变量与CSIndex指标URL约定
投资推送项目里 cn_broad 宽基信号阈值通过环境变量与默认值管理，并约定中证指数估值文件 URL 拼接规则。

## 阈值与环境变量
- 宽基信号阈值读取 `get_cn_broad_signal_config(index_code)`：全局 `CN_BROAD_*` + `_CN_BROAD_PER_INDEX_DEFAULTS` 按 code 覆盖
- 环境变量命名：`CN_BROAD_{指数code}_{SUFFIX}`（如 `CN_BROAD_000300_BUY_SPREAD_PERCENTILE_MIN`），兼容旧前缀 `A500_*`

## 中证指数数据URL
- 估值历史：`market_data.read_indicator_history(code)` 拉 `{CSINDEX_INDICATOR_BASE_URL}/{code}indicator.xls`
- 成分权重：`{code}closeweight.xls`

## 新指数接入流程
- 新指数接入前全库检索 code 是否已存在，再补白名单、config 分指数默认与 report 模块路由

## 验证与归属
- 验证证据：会话 66471137 给出 URL 拼接规则、env 格式及 cn_broad 数据链（indicator.xls → cn_broad_data → cn_broad_signal → report/push/backtest）
- 涉及文件：config.py、market_data.py、cn_broad_data.py、report.py
- 所属项目：投资推送；来源会话ID：66471137-806e-41aa-b92c-c3ddc7dbd584

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cn_broad分指数阈值环境变量与CSIndex指标URL约定",
  "source_extraction_id": "a3dc477ad941455eaf900a9789834bdb",
  "version": 1,
  "memory_type": "entities"
}
-->