# 机构管理员详情页人员类型与住所不显示且不保存
苏州市房地产监测V3 中 `company/companyAdmin/detail.vue` 因 `isAgency` 依赖 `organType` 且保存报文漏字段，导致查看不显示、编辑不保存人员类型/住所。

## 问题根因
- 查看态与编辑态均用 `isAgency` 判断是否渲染「人员类型/住所」，而 `isAgency` 依赖 `form.organType`
- 详情接口未返回 `organType` 时，即使数据存在也被隐藏
- `getForm()` 提交报文中漏掉 `personnelType`、`householdAddress`（及 `personnelCode`），编辑后保存等于没改

## 解决方案
- 新增计算属性 `showAgencyFields`：`isAgency` 或记录中存在 `personnelType/householdAddress/personnelCode` 时为真，作为兜底判断
- 编辑态表单、查看态 `contentInfo`、校验规则统一改用 `showAgencyFields`
- `getForm()` 在 `showAgencyFields` 时把 `personnelCode、personnelType、householdAddress` 加入保存报文

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/company/companyAdmin/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：1aa60fcd-fb6c-40ed-85a3-935deaae7e9d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_admin_fields",
  "source_extraction_id": "c5d95a38a9c04a809be2e123d4710d6d",
  "version": 1,
  "memory_type": "entities"
}
-->