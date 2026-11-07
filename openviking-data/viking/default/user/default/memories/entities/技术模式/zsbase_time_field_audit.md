# zsbase时间字段审计
全量遍历 zsbase 892 个菜单节点，568 个时间/日期字段的声明与时间值格式审计结果。

## 审计范围
- 遍历 zsbase 892 个菜单节点
- 涵盖 568 个时间/日期字段

## 命中规则
- 仅预售资金监管-风险项目登记「申请时间」命中规则C（声明时间、实际值仅日期无时分秒）
- 低严重度规则B（声明日期值含00:00:00）未命中

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/017.md
- 涉及文件：路由信息.json、前端技术信息.md、package.json、auth-helpers.js、env-loader.js、stock-routes.spec.js、price-filing-console-audit.spec.js、pm.mjs
- 所属项目：苏州市房地产监测V3；来源会话：6a51b3f1-9847-4394-a457-ee38d5f0a38d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsbase_time_field_audit",
  "source_extraction_id": "fbfff1862e164eeabf03bcd1386ab8d9",
  "version": 1,
  "memory_type": "entities"
}
-->