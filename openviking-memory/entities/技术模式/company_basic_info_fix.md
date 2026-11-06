# 开发企业基本信息界面修复
苏州市房地产监测V3 中修复 `CompanyBasicInfoDetail.vue`，对齐开发企业模板并移除经纪机构逻辑。

## 业务状态与办公信息
- 文案改为「业务状态」，使用 `form.bizState` + `biz_state` 字典展示（如「已备案」），移除 `getCompanyApplyOverview`、去备案引导等经纪机构逻辑
- 底部「机构管理员信息」改为「办公信息」，展示办公地址、联系人、联系电话（`buildCompanyBasicContentInfo2`）

## 附件与基本信息
- `AnnexUpload` 替换为 `LicenseAppendix`（与变更页一致），标题改为「附件上传」，固定显示「营业执照正本原件」
- 基本信息对齐开发企业模板，使用 `buildCompanyBasicContentInfo` + `DetailTemplate`，字段为企业名称、行政区划、营业期限、备案审核机构等（不再显示机构别名、行业协会、加盟品牌等经纪机构字段）

## 验证与归属
- E2E 用例因测试账号未授权 `toB` 未完全跑通
- 涉及文件：`CompanyBasicInfoDetail.vue`
- 所属项目：苏州市房地产监测V3；来源会话：2c756fb1-3104-49e3-a267-f18e9110ae47；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_basic_info_fix",
  "source_extraction_id": "0c9fcbb812df4bc98444adb2fa3c05fb",
  "version": 1,
  "memory_type": "entities"
}
-->