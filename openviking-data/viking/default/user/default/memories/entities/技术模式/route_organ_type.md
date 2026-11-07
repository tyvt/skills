
# 共用路由缺机构区分致 organType 误传
管理员列表 `organType` 取自 `listOrganType`，菜单指向共用内核 `company/companyAdmin/index` 且无 `:organ-type` 薄入口时 `resolveOrganType` 默认 `agency`，致开发企业菜单误传机构类型且表头错显。

## 问题根因
- 管理员列表 `organType` 取自 `listOrganType`
- 菜单指向共用内核 `company/companyAdmin/index`，无 `:organ-type` 薄入口时 `resolveOrganType` 默认返回 `agency`
- 导致开发企业菜单误传 `organType:"agency"` 且表头错显

## 修复方案
- `companyOrgan.js` 增加路由路径、菜单 `busCode`、`matched` 父级标题多层回退推断，共用页不再一律当开发企业
- `companyAdmin/index.vue` 列表统一用 `resolveCompany` 解析机构类型

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/116.md
- 涉及文件：companyAdmin/index.vue、constants/companyOrgan.js、companyAdmin/agency/index.vue、companyAdmin/developer/index.vue、mixins/companyOrganContext.js、utils/ruoyi.js、mixins/listMixins.js、mixins/table.js
- 所属项目：苏州市房地产监测V3；来源会话：45c552dc-2133-4822-8720-0b09881d4cdf；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_organ_type",
  "source_extraction_id": "c0492b99adb24ccda6149da33f2e4546",
  "version": 2,
  "memory_type": "entities"
}
-->