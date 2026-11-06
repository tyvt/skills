# 经纪机构管理前端改造
苏州市房地产监测V3 完成经纪机构入网认证、开业、基本信息及从业人员等相关前端改造。

## 业务范围
- `businessScenario` 字典 `company_business_scenario` 接入
- 入网认证保存 `AgencyEntryNetworkDetail` 增加必填 `businessScenario`（多选逗号拼接）
- 入网编辑 `AgencyEntryNetworkSections` 增加多选「业务范围」
- 机构基本信息 `AgencyBasicInfoDetail` + `agencyBasicInfoContent.js` 展示
- 新增 `AgencyBusinessScenarioSection.vue` 独立「业务范围」区块（复选框组，查看态禁用，编辑态可改并支持变更前后对比 tooltip），数据仍来自 `getOwnCompany` → `companyRecord`
- `AgencyBasicInfoDetail.vue` 在「基本信息」与「机构管理员信息」间增加业务范围区块，基本信息网格移除重复列（`omitBusinessScenario: true`）
- `AgencyBasicInfoForm.vue` 非租赁机构增加业务范围区块（编辑可勾选，查看态禁用复选框），补充 `companyTypeOptions` 透传
- 变更页 `toB/agencyRecord/detail.vue` 加载字典 `company_business_scenario` 供业务范围使用

## 租赁开业控制
- `allowOpeningBusinessFlag` 为 `0` 时禁用编辑/开业按钮并提示「当前不允许开业，请联系主管部门」
- 租赁场景主按钮文案为「开业」

## 从业人员
- 新增/编辑人员类型 `professional` 且身份证有效时调用接口校验
- 查看模式（`formMode === 'view'`）下 `handlePersonnelTypeChange` 与 `queryProfessionalCertificateByIdNumber` 直接返回，不再按身份证号查证，避免弹出「未查询到专业人员资格证书信息」（修复见 `AgencyPersonnelDetail.vue`，来源会话 2b8ceea5-e003-419f-96a4-2a958a3533ab）

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：agencyBasicInfoContent.js、companyBasicInfoShared.js、AgencyEntryNetworkDetail.vue、AgencyEntryNetworkSections.vue、AgencyBasicInfoDetail.vue、AgencyPersonnelDetail.vue
- 来源会话ID：b0af49dc-1ee9-4bca-82ad-f1b1f4a01bf0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_mgmt_fix",
  "source_extraction_id": "0f5bf290b820418491b3cd580b84c35a",
  "version": 3,
  "memory_type": "entities"
}
-->