# 维修资金支出公示周期年份类型比较修复
园区公共收益项目维修资金支出公示详情选择"公示周期"当前年份时校验失败的根因与修复。

## 根因
- zhi2-web-admin/src/views/maintenance/mainFundUsePublicity/detail.vue 中公示周期校验存在类型比较 bug
- zs-date-picker 配置 value-format="yyyy"，form.publicityPeriodYear 为字符串 "2026"
- 校验里 currentYear === year 严格相等，数字 2026 === "2026" 恒为 false
- "当前年份"分支永远执行不到，选当前年份任何周期被判无效弹提示；往年可选因走 currentYear > year 宽松比较分支
- 校验逻辑本身没写反，纯数字与字符串比较的类型问题

## 修复要点
- 只改 detail.vue 第 174 行（watcher form.publicityPeriod）
- 改前：const year = this.form.publicityPeriodYear
- 改后：const year = parseInt(this.form.publicityPeriodYear, 10); if (isNaN(year)) { return } 附带空值保护

## 涉及文件
- zhi2-web-admin/src/views/maintenance/mainFundUsePublicity/detail.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=园区公共收益
- 所属项目：园区公共收益；来源会话ID：aeffa2e1-b013-43b5-946d-0c9ceb6f5f63；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicity_period_type_bug",
  "source_extraction_id": "e0e87242c8254357a011c8930e518a2e",
  "version": 1,
  "memory_type": "entities"
}
-->