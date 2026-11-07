# 企业入网认证页面业务范围区块调整
苏州市房地产监测V3 中企业入网认证页（`AgencyEntryNetworkSections.vue`）在基本信息与机构管理员信息间新增「业务范围」独立区块。

## 修改内容
- 仅经纪机构（`!isLeaseOrgan`）显示 `Headline` 区块「业务范围」
- 编辑态使用 `el-checkbox-group` 多选，选项来自字典 `company_business_scenario`
- 详情态同一组 checkbox 禁用（`disabled`）并已选项仍勾选展示
- 查看态基本信息通过 `buildAgencyBasicContentInfo` 的 `omitBusinessScenario: true` 过滤避免重复
- 编辑态保留提示文案：「选择住房租赁中介，需要有住房租赁企业开业菜单」
- 字段仍为 `businessScenario`（逗号分隔），校验与提交逻辑未改

## 涉及文件
- `src/views/company/companyManagement/components/AgencyEntryNetworkSections.vue`
- `src/views/company/companyManagement/components/agencyBasicInfoContent.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：ef795d90-6f54-4f25-af97-f78da87e2817
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_network_fix",
  "source_extraction_id": "4e19ad089b314ee7a3955a02853db69b",
  "version": 1,
  "memory_type": "entities"
}
-->