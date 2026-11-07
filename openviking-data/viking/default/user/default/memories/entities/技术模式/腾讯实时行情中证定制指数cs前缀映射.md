# 腾讯实时行情中证定制指数cs前缀映射
投资推送项目在 realtime_quote.py 映射腾讯行情时，中证定制指数代码须用 cs 前缀而非 sh/sz。

## 映射规则
- 红利等中证定制指数（如 H30269）在 `realtime_quote.py` 映射腾讯行情时须用 `cs` 前缀（例 `H30269` → `csH30269`）
- 不能使用上交所 `sh`/深交所 `sz` 前缀

## 排障要点
- 映射缺失会导致实时价完全拉不到
- 与「接口已拉到但 `log_fetch_done` 未拼接实时字段」的展示问题不同，排障时先确认映射表是否含该代码

## 验证与归属
- 验证证据：会话 e7077452 用户报中证红利无实时数据；增加 cs 映射后报告元信息示例 `实时 11,125.28 -0.42% …`
- 涉及文件：realtime_quote.py、report.py、index_meta.py
- 所属项目：投资推送；来源会话ID：e7077452-6663-48f2-ba41-f20b45f24975

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "腾讯实时行情中证定制指数cs前缀映射",
  "source_extraction_id": "15fba428076444a7ac67605e839d5e2d",
  "version": 1,
  "memory_type": "entities"
}
-->