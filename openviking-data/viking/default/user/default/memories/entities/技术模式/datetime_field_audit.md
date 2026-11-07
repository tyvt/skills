# 日期时间字段类型一致性审计
苏州市房地产监测V3 使用 zsbase/ZS001Aa! 账号密码遍历全量菜单，完成日期与时间字段类型一致性审计。

## 审计结果
- 遍历 892/892 个菜单节点（zsbase 全量，耗时 1.7 小时，0 报错，结果文件 428KB）
- 命中「时间/日期」类字段 568 个，采样值 1040 条（datetime 637 / 纯日期 63 / 其他 340 多为占位文本）
- 去重后仅 1 条高严重度：预售资金监管 / 风险管理·风险项目登记 / 申请时间，声明「时间」实际仅日期（规则C）

## 判定口径
- 规则A【高】：声明「日期」值含非零时分秒；规则B【低】：声明「日期」值格式为 YYYY-MM-DD 00:00:00；规则C【高】：声明「时间」值仅日期/年月/8位数字
- 低严重度 0 条（未发现「XX日期」字段值带 00:00:00 零点时间）

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：date-type-audit.spec.js、e2e/full-audit/date-type-audit.spec.js、date-type-result.js
- 所属项目：苏州市房地产监测V3；来源会话ID：6a51b3f1-9847-4394-a457-ee38d5f0a38d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "datetime_field_audit",
  "source_extraction_id": "f45b2d9001e245ccb9ed80599939ed23",
  "version": 1,
  "memory_type": "entities"
}
-->