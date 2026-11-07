# 批量改造抽公共工具与分页total冲突
苏住房G六个行业管理页面统一改造查询区与列表列，去掉默认已备案、加更新时间区间与是否本地机构筛选。

## 问题背景
- 先按默认筛选已备案做默认值，产品口径变「默认查全部」，需升级为可开关 defaultBizState 且逐页确认
- 信托公司只需去掉 defaultBizState="2"、不做其他新增
- 时间区间最多 2 年，须带 disabledDate 且查询前再校验，仅管 disabledDate 可被改系统时间绕过

## 解决方案
- 时间区间表单项、是否本地机构下拉(1/0)、updateTime 列、人员类型白名单与标签解析抽成 src/utils/companyListQuery.js
- 人员类页面人员类型下拉只保留物业项目经理/企业管理员/信托公司人员，用 excludePersonnelTypes 排除开发企业项目经理
- 前端兜底过滤只影响当前页，total 仍是全量，分页会「对不上」，需后端支持该参数才一致
- dict.js 新增 getDictsIncludeDisabled() 显示停用项中文名；开发企业项目经理 dictValue 从字典接口动态取不硬编码
- 列宽用 minWidth（信用代码180、企业名称200、行政区域160）改善首屏

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 物业服务企业/企业变更记录 enableAdvancedQuery=true 并去掉默认已备案；联调须写明「若后端未支持，前端兜底过滤但分页 total 可能不准」
- 涉及文件：utils/companyListQuery.js、utils/dict.js、companyManagement/components/index.vue、companyRegister/index.vue、staffManagement/components/index.vue
- 所属项目：苏住房G；来源会话：c7bcdd50-859e-48be-b953-435a57e9aa54；代码基线：d5eee56

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_query_batch",
  "source_extraction_id": "dab230741e8b4b79a6560976b4006de8",
  "version": 1,
  "memory_type": "entities"
}
-->