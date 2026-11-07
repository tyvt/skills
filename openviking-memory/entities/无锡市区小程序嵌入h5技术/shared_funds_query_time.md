# 共有资金查询明细查询时间取值模式
共有资金查询明细的查询时间与账户余额直接取自accountStatistics接口，不再用本地冗余状态兜底。

## 数据来源
- 查询时间取自bankAccountUpdateTime
- 账户余额取自bankBalanceAmount
- 二者均来自/benefit/app/accountStatistics/{projectId}接口返回

## 交互逻辑
- 点击「查询明细」→调用getBenefitList→请求accountStatistics/{projectId}→更新benefitInfo
- 页面通过accountInfo（即benefitInfo）直接读取bankAccountUpdateTime与bankBalanceAmount
- 查询时间格式化为YYYY.MM.DD HH:mm:ss展示

## 优化点
- 已去掉本地冗余状态
- 已去掉bankReceiptDetail的兜底取值，完全依赖accountStatistics接口返回

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 所属项目：无锡市区小程序嵌入H5；来源会话：ff85538f-d398-42e4-ba21-d4efd07edadb
- 涉及文件：src/pages_benefit/sharedFunds/components/OverviewTab.vue、src/api/sharedFunds.js、src/pages_benefit/sharedFunds/index.vue
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "shared_funds_query_time",
  "source_extraction_id": "9d334abc52e0456abf2471f8e4566102",
  "version": 1,
  "memory_type": "entities"
}
-->