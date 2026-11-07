# 经纪机构列表主文件包含筛选和分页
在 Suzhou Real Estate Monitoring V3 项目中，经纪机构管理 (/jjjg) 模块的菜单位于 institution-menu-config.js 中，filePath 为 institution/agencyPersonnel/index。

## 结构
- 入口 src/views/institution/agencyPersonnel/index.vue 渲染 AgencyPersonnelList.vue。
- AgencyPersonnelList.vue 负责列表、筛选和分页。

## 文件与验证
- 涉及文件: agency-personnel-real-api-flow.spec.js, institution-menu-config.js, index.vue, AgencyPersonnelList.vue, listMixins.js, table.js, detail.vue, AgencyBranchList.vue.
- 验证证据: src=苏州市房地产监测V3-rest/059.md; session 727ebb5f-f730-4f04-859a-246e4ec3b2a7.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：727ebb5f-f730-4f04-859a-246e4ec3b2a7


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_list_page_files",
  "source_extraction_id": "ab08f4474f3d4570b5cc83bd74d094a3",
  "version": 1,
  "memory_type": "entities"
}
-->
