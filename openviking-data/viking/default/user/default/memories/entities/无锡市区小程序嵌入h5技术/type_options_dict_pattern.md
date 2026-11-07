# 类型选项直取字典数据免硬编码重复
受益资金类型选项原硬编码致重复，改为直取字典数据并默认选中首项。

## 问题根因
- 此前硬编码 ALL_FUND_TYPE_OPTION 并手动拼接致选项重复
- 存在多余过滤逻辑
- 字典 benefit_app_account_fund_type 已含空 value 项，loadTypeOptions 手动插入「全部共有资金」致选择器重复（会话 0d2c6516）

## 解决方案
- loadTypeOptions直接赋值 typeOptions.value = dict（benefit_app_account_fund_type）
- 移除硬编码及过滤逻辑，默认选中字典首项
- 合并前 filter 过滤 value 为空项，仅保留手动添加项（会话 0d2c6516）

## 验证与归属
- 所属项目：无锡市区小程序嵌入H5
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：src=无锡市区小程序嵌入H5/012.md
- 涉及文件：src/pages_benefit/sharedFunds/components/DetailsTab.vue、src/api/common.js、src/pages_benefit/sharedFunds/components/OverviewTab.vue、src/pages_benefit/sharedFunds/components/PublicityTab.vue
- 来源会话：c3697b27-3a83-450d-a4a0-5c2a22ae4a0e、0d2c6516-1930-4d19-b020-1182a8c885bb；代码基线：none
- 涉及文件补充：src/api/sharedFunds.js

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "type_options_dict_pattern",
  "source_extraction_id": "dc39a6e5b671492c87b68671b8c83d92",
  "version": 2,
  "memory_type": "entities"
}
-->