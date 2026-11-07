# 行业管理列表更新时间最多跨 2 天
苏住房G 行业管理 6 个列表的「更新时间」筛选前后跨度最多 2 天，限制内聚到共享工具而非逐页改。

## 适用页面
- 物业服务企业 / 开发企业 / 信托公司 / 机构变更 / 机构注册审核 / 人员管理 共 6 个行业管理列表

## 限制原因
- 这 6 个页面高级查询（enableAdvancedQuery + zs-search-form/zs-advanced-query）共用同一套日期区间解析，逐页改会造成 6 份口径漂移，改公共 zs-advanced-query 会波及全后台其它模块

## 修复方案
- 只改 src/utils/companyListQuery.js 一处：① 常量 TWO_YEARS_MS 改名并改值成 TWO_DAYS_MS（2 天毫秒数）；② 选日限制：首个选中日作锚点，与锚点相差超 2 天的日期置灰不可选；③ 搜索校验：跨度超限提示「更新时间跨度最多可选择2天」并阻断查询
- 6 个页面通过共用工具自动生效，不改页面代码

## 验收与边界
- 验收：9/9→9/11 允许，9/9→9/12 拦截（9/12 置灰）
- trust/index.vue 当前未开 enableAdvancedQuery、页面暂无「更新时间」项，属未受影响项，不要因验收看不到而误判改造失败；后续开启高级查询会自动继承该限制
- 验证：会话 84fe40ac-f546-41bc-9d7e-76bd876f4594（2026-09-17，基线 d5eee56）用户点名校验 6 个页面「跨度限制两天」；仅修改 companyListQuery.js，6 个 Vue 页面共用工具自动生效
- 涉及文件：zhi2-web-admin/src/utils/companyListQuery.js、zhi2-web-admin/src/views/company/companyManagement/property/index.vue、change/index.vue、components/index.vue、trust/index.vue、companyRegister/index.vue、staffManagement/components/index.vue
- 所属项目：苏住房G

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：84fe40ac-f546-41bc-9d7e-76bd876f4594


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "industry_list_2day_filter",
  "source_extraction_id": "e1db49533c284582ba9bbe3acf901093",
  "version": 1,
  "memory_type": "entities"
}
-->
