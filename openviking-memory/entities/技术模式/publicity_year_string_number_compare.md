# 公示年份字符串与数字严格相等致当前周期校验失效
园区公共收益项目中 `mainFundUsePublicity/detail.vue` 的 `zs-date-picker` 配置 `value-format="yyyy"` 导致 `form.publicityPeriodYear` 为字符串，与数字 `currentYear` 严格相等比较恒为 false。

## 问题根因
- `zs-date-picker` 配置 `value-format="yyyy"` 使 `form.publicityPeriodYear` 为字符串类型
- 与数字 `currentYear` 严格相等比较恒为 false，使当前年份校验分支不可达

## 解决方案
- 于 `detail.vue` 第 174 行 `form.publicityPeriod` watcher 内改用 `parseInt(this.form.publicityPeriodYear, 10)` 转换
- 增加 `isNaN` 空值保护

## 验证与归属
- 验证证据：src=园区公共收益/042.md
- 涉及文件：zhi2-web-admin/src/views/maintenance/mainFundUsePublicity/detail.vue
- 所属项目：园区公共收益；来源会话：aeffa2e1-b013-43b5-946d-0c9ceb6f5f63；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "publicity_year_string_number_compare",
  "source_extraction_id": "381659ee9de44443be66fc4b57c43a44",
  "version": 1,
  "memory_type": "entities"
}
-->