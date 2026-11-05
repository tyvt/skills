# 更新时间跨度限制为2天
苏住房G 项目共用工具 `companyListQuery.js` 将更新时间筛选跨度从 2 年改为 2 天。

## 改动内容
- 常量 `TWO_YEARS_MS` 改为 `TWO_DAYS_MS`（2 天毫秒数）
- 选日限制：首个选中日为锚点，相差超 2 天的日期置灰
- 搜索校验：跨度超 2 天提示「更新时间跨度最多可选择2天」
- 6 个 Vue 页面通过共用工具自动生效（物业服务企业、机构变更、机构注册、人员管理等）

## 逻辑验证
- 9/9 → 9/11 允许；9/9 → 9/12 拦截（9/12 置灰）
- 信托企业页（`trust/index.vue`）未开启 `enableAdvancedQuery`，暂无此筛选项，后续开启同受限制

## 涉及文件与归属
- 文件：`zhi2-web-admin/src/utils/companyListQuery.js` 及上述 Vue 页面
- 所属项目：苏住房G；来源会话：84fe40ac-f546-41bc-9d7e-76bd876f4594；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_list_query_2days_limit",
  "source_extraction_id": "0fa9adadc9e847248fa4eb9235709be9",
  "version": 1,
  "memory_type": "entities"
}
-->