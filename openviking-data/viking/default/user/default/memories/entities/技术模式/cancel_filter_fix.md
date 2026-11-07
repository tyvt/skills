# 机构注销管理筛选与列表调整
苏州市房地产监测V3 的 companyCancel/index.vue 按截图要求去掉「机构类型」筛选并增加「业务状态」列。

## 修改内容
- 去掉搜索区「机构类型」筛选，仅保留关键字、行政区划、业务状态
- 删除查询参数 companyType 及 company_type 字典加载等残留逻辑
- 列表在「注销原因」与「操作」之间新增「业务状态」列，写法与机构入网列表一致

## 验证与归属
- 刷新「机构注销管理」列表页可见筛选区无机构类型，表格显示业务状态标签
- 涉及文件：src/views/company/companyCancel/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：0ddf3408-a91a-40b6-a6b4-be7f00a8a464
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cancel_filter_fix",
  "source_extraction_id": "4b2de2a5bed3429c8dadec66071ab087",
  "version": 1,
  "memory_type": "entities"
}
-->