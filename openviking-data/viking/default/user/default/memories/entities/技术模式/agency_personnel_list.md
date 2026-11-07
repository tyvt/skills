# 经纪机构管理(jjjg)列表筛选主组件为AgencyPersonnel
苏州市房地产监测V3 中经纪机构管理（/jjjg）菜单的 filePath 为 institution/agencyPersonnel/index，列表与筛选主逻辑由 AgencyPersonnelList.vue 承载。

## 菜单与入口
- 经纪机构管理（/jjjg）菜单 filePath 为 institution/agencyPersonnel/index，配置于 e2e/fixtures/institution-menu-config.js
- 列表页入口 src/views/institution/agencyPersonnel/index.vue 渲染 AgencyPersonnelList.vue

## 主逻辑归属
- AgencyPersonnelList.vue 承载列表、筛选与分页主逻辑
- 复用 mixins/listMixins.js 与 mixins/table.js
- 详情页为 institution/agencyPersonnel/detail.vue；分支列表为 institution/agencyBranch/components/AgencyBranchList.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/114.md
- 涉及文件：agency-personnel-real-api-flow.spec.js、institution-menu-config.js、index.vue、AgencyPersonnelList.vue、listMixins.js、table.js、detail.vue、AgencyBranchList.vue
- 所属项目：苏州市房地产监测V3；来源会话：727ebb5f-f730-4f04-859a-246e4ec3b2a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_list",
  "source_extraction_id": "1fb73d685c824df4a1f924aabfc03c6d",
  "version": 1,
  "memory_type": "entities"
}
-->