- 持仓面板（分析产出/持仓面板/）严格维持单 HTML 格式：页面不加载任何外部 .js 数据文件，不预生成数据文件，所有逻辑与数据获取内联在 index.html
- 除 holding.sqlite（本地账户/流水/分红持久数据）外，其他市场数据尽量用免费公开接口在浏览器实时获取，不依赖本地行情文件
- config.js 作为策略目标权重配置（final_portfolio_v3.py 生成）允许保留，因其非行情数据
- 接口失败时需优雅降级（如退化为 60 日均价口径），功能不中断
- 免费公开接口：腾讯 qt.gtimg.cn（现价/涨跌，JSONP）、东财 push2his（前复权日线/布林带，fetch CORS *）、东财 datacenter-web RPT_SHAREBONUS_DET（分红，JSONP）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "user": "github.com-tyvt-financial-data-lake",
  "topic": "持仓面板单HTML与数据接口规范",
  "source_extraction_id": "2bfd816460894a4e84cfd96f6a977885",
  "version": 1,
  "memory_type": "preferences"
}
-->