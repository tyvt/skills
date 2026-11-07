# 经纪机构基本信息字段调整
苏州市房地产监测V3 中经纪机构基本信息（查看态+编辑态）按设计图完成字段删减、重排与改名。

## 改动内容
- `AgencyBasicInfoDetail.vue`（路由 `toB/agencyRecord/detail`）对于 B 端本企业（`detailScope === 'own'`）且经纪机构（非租赁），在顶部状态栏与「基本信息」区块最前面展示「机构备案状态」（来自 `getCompanyApplyOverview`）与「是否达成备案条件」（仅当备案状态为未备案/已失效/已注销时展示，值与 `institution/record/index.vue` 的 `showCondition` 一致，展示「是/否」，加载中显示 `--`）；`agencyApplyOverview.js` 新增 `shouldShowApplyConditionMet` 供详情页与列表页共用展示条件
- 剩余字段按标注顺序调整（查看态与编辑态一致）：统一社会信用代码 → 企业名称 → 机构简称 → 机构类型 → 行政区域 → 行业协会组织 → 成立日期 → 注册资本 → 注册地址 → 法定代表人信息 → 公司联系电话 → 加盟品牌 → 经营地址 → 经营范围
- 字段改名：机构名称 → 企业名称、机构别名 → 机构简称（含输入框 placeholder）
- 机构管理员信息字段去掉「管理员」前缀：管理员类别→类别、管理员姓名→姓名、管理员联系电话→联系电话、管理员证件类型→证件类型、管理员证件号码→证件号码（租赁机构分支同步处理）
- `InstitutionRegisterSingleForm.vue` 的 diff 为工作区原有改动，未触碰

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/company/companyManagement/components/AgencyBasicInfoDetail.vue、agencyBasicInfoContent.js、agencyApplyOverview.js、institution/record/index.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：a86872e6-6e7a-49c4-b361-c04bed9de6a4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_info_fields",
  "source_extraction_id": "79f8ae00a108477b8779e22490c3122c",
  "version": 2,
  "memory_type": "entities"
}
-->