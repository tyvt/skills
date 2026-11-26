# leek-fund

用于获取股票和基金数据的软件项目，股票行情以新浪接口为核心数据源。

## 股票行情数据源
- 股票行情核心接口为新浪行情 hq.sinajs.cn
- A 股（sh/sz/bj）、美股（gb_/usr_）、国内期货（nf_）、海外期货（hf_）的实时报价都通过新浪接口获取
- 新浪接口请求拼接 list= 多代码，代码中的点号替换为 $，使用 GB18030 解码，Referer 设为新浪财经

## 相关文件
- d:/repository/leek-fund/src/explorer/stockService.ts：新浪行情接口实现（约第 103-119、647-651 行）
- d:/repository/leek-fund/src/shared/tencentStock.ts：腾讯股票相关代码（约第 5-36、29-36 行）

<!-- MEMORY_FIELDS
{
  "category": "软件项目",
  "name": "leek-fund",
  "source_extraction_id": "d47a13935d6f410c8c99b5f2053f0a74",
  "version": 1,
  "memory_type": "entities"
}
-->