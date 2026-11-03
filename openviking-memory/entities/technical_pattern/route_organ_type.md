# 共用路由缺机构区分致 organType 误传
管理员列表 `organType` 经 `resolveOrganType` 在共用路由 `company/companyAdmin/index` 下默认 `agency`，致开发企业误传机构类型。

## 问题根因
- 管理员列表在共用路由 `company/companyAdmin/index` 下通过 `resolveOrganType` 解析
- 默认返回 `agency`，未区分开发企业与代理机构
- 导致开发企业误传机构类型 `organType`

## 修复方案
- `companyOrgan.js` 增加路由路径、菜单 `busCode` 与父级标题多层回退映射 `01`/`agency`
- `companyAdmin/index.vue` 统一调用 `resolveOrganType` 解析机构类型

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/060.md
- 涉及文件：companyAdmin/index.vue、constants/companyOrgan.js、companyAdmin/agency/index.vue、companyAdmin/developer/index.vue、mixins/companyOrganContext.js、utils/ruoyi.js、mixins/listMixins.js、mixins/table.js
- 所属项目：苏州市房地产监测V3；来源会话：45c552dc-2133-4822-8720-0b09881d4cdf；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "route_organ_type",
  "source_extraction_id": "914335400ee24df19f7a1f642d838c6f",
  "version": 1,
  "memory_type": "entities"
}
-->