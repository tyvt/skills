# 公司管理员详情页人员字段因organType缺失漏存
苏州市房地产监测V3 中 companyAdmin/detail.vue 因接口缺 organType 致人员字段隐藏且提交遗漏，已新增计算属性兜底修复。

## 问题根因
- `companyAdmin/detail.vue` 查看与编辑态依赖 `isAgency`（依赖 `form.organType`）渲染"人员类型/住所"
- 接口缺 `organType` 时字段隐藏
- `getForm()` 提交遗漏 `personnelType`、`householdAddress`、`personnelCode` 致保存无效

## 修复方案
- 新增计算属性 `showAgencyFields` 兜底判断并统一渲染与校验
- `getForm()` 在其为真时补填三字段入报文

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/318.md
- 涉及文件：companyAdmin/detail.vue、companyOrganContext.js、companyOrgan.js、operator/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：1aa60fcd-fb6c-40ed-85a3-935deaae7e9d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_admin_field_omission",
  "source_extraction_id": "8298b83dd6b24dbbbfaf79725dcec981",
  "version": 1,
  "memory_type": "entities"
}
-->