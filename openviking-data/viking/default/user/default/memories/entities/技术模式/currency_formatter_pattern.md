# 数字千分位全局统一入口
园区物管2.0 非表格场景（摘要文案组件、大屏统计文案）需给数字加千分位，值可能为非数字混排文案。

## 问题根因
- 直接 Intl.NumberFormat 或 toLocaleString 会把非数字值变 NaN 或报错
- 各页面自写千分位会造成展示口径不一致

## 解决方案
- 统一复用 @/formatters/index.js 的 currencyFormatter（内部 Intl.NumberFormat，与 amountFormatter 同源）
- 先判 undefined/null/'' 直接返回空，再用 @/patterns/index.js 的 patterns.number 正则判定是否数字字符串——非数字原样 return
- 数字调 currencyFormatter(v, 0, 20, v)，小数上限放宽到 20 保留金额类小数
- 必须固定两位小数时给数据项加可选字段 decimals:2 分支调用 currencyFormatter(v,2,2)，不改调用方数据形状
- 与表格列「prop + :formatter」并列的文案级千分位约定，两处都禁止页面内自写正则加逗号

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 e7b17454-44cc-4737-a77d-b8aa48d3a424 中 ZsSummaryText 数字千分位用全局 currencyFormatter + patterns.number 判定，非数字原样返回
- 涉及文件：zhi2-web-admin/src/components/ZsSummaryText/index.vue、src/formatters/index.js、src/patterns/index.js
- 所属项目：园区物管2.0；来源会话ID：e7b17454-44cc-4737-a77d-b8aa48d3a424；代码基线：3965548b6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "currency_formatter_pattern",
  "source_extraction_id": "8e90ed7f7e304631b0c6fbdcf7cbe027",
  "version": 1,
  "memory_type": "entities"
}
-->