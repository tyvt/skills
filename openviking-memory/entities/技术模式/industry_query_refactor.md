# 行业管理六页查询与列表改造（苏住房G）
苏住房G 行业管理相关页面完成查询与列表通用改造，新增公共工具并统一多页面筛选与列。

## 新增公共工具
- `companyListQuery.js`：更新时间区间表单项（最多 2 年，含 `disabledDate` 与查询前校验），具体含 `getUpdateTimeSelectableBounds`（可选区间为今天起向前 2 个自然年）、`isUpdateTimeDayDisabled`（超出全局窗口禁用；锚点 ±2 年内可选第二个日期）、`validateUpdateTimeRange`（起止须在全局窗口，失败清空 `_updateTimePickAnchor`）；是否本地机构下拉（1/0）、列表 `updateTime` 列构建、人员类型白名单与字典标签解析
- `dict.js`：新增 `getDictsIncludeDisabled()`，用于展示含停用项的人员类型名称

## 页面改动
- 物业服务企业：`enableAdvancedQuery=true`，新增筛选与列表列，去掉默认「已备案」
- 企业变更记录：同上，查询顺序为关键字→行政区域→业务状态→更新时间→是否本地机构→机构类型→企业类型
- 信托公司：仅去掉 `defaultBizState="2"`，无新增筛选项
- 机构注册审核：查询重排 + 新筛选项 + `updateTime` 列

## 验证与归属
- 涉及文件：`companyListQuery.js`、`dict.js`、`companyManagement/components/index.vue`、`companyRegister/index.vue`、`staffManagement/components/index.vue` 等
- 所属项目：苏住房G；来源会话：c7bcdd50-859e-48be-b953-435a57e9aa54；补充会话：5992a86f-b14f-41cb-b926-2177b55b150a（更新时间选择器细节）；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "industry_query_refactor",
  "source_extraction_id": "ec57e1fd4b5e42818b6deaa5a40b679a",
  "version": 2,
  "memory_type": "entities"
}
-->