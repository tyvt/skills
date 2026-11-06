# 新浪行情接口编码与请求约定
新浪行情接口 hq.sinajs.cn 需将股票代码中的点替换为 $，返回 GB18030 编码数据，前端须用 Axios 以 arraybuffer 接收并做 GB18030 解码。

## 请求与编码规则
- 新浪行情接口域名为 hq.sinajs.cn
- 请求前将股票代码中的点（.）替换为 $
- 接口返回 GB18030 编码的二进制数据，须显式解码
- 支持市场：A股（sh/sz/bj）、美股（gb_/usr_）、国内期货（nf_）、海外期货（hf_）
- 请求 URL 形如 `https://hq.sinajs.cn/list=${codes.map((code) => code.replace('.', '$')).join(',')}`

## 前端实现
- Axios 设置 responseType 为 arraybuffer
- 在 transformResponse 中对返回数据做 GB18030 解码
- 请求头须附加新浪 Referer（如 http://finance.sina.com.cn）以通过接口鉴权

## 相关文件
- d:/repository/leek-fund/src/explorer/stockService.ts（约 103:119、647:651 行）
- d:/repository/leek-fund/src/shared/tencentStock.ts（约 5:36、29:36 行）
- d:/repository/leek-fund/src/explorer/fundService.ts
- d:/repository/leek-fund/src/explorer/leekService.ts
- d:/repository/leek-fund/src/service/eastmoney.ts 及其他：fundSuggestData.ts、fundHistory.ts、aiStockHistoryData.ts

## 验证与归属
- 来源会话：0ab12128-c9a7-4aa0-a0fe-c5d1bd320633
- 代码基线：none
- 所属项目：leek-fund

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sina_hq_gb18030",
  "source_extraction_id": "040b106478684eab989b2b1f2889b0d9",
  "version": 2,
  "memory_type": "entities"
}
-->