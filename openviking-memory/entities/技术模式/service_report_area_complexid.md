# B端服务周报区域选择显式传complexId
B端服务周报选发布范围时，若所选物业管理区域与右上角全局区域不同，必须在各请求点显式传complexId，否则后端隐式兜底按全局区域处理。

## 问题现象
- 用户选了与右上角全局物业管理区域(currentProjectId)不同的区域，筛选、列表、保存全部按全局区域走，数据不对
- 根因为后端缺complexId则回落当前登录用户全局区域；前端弹窗列表请求不带complexId、选中项只存deptId丢complexId、列表筛选与保存未传complexId

## 解决方案
- 选中区域与全局不同时，在弹窗列表查询、列表页筛选、新增/编辑保存三处都显式附带complexId
- 选中行complexId保留进row归一化结果，rangeList取值优先deptId || complexId
- 切换区域后主动刷新列表让请求带新参数；与全局相同则不传保持原行为
- 验证：直接看Network里是否出现complexId参数

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/system/message/service/index.vue、components/index.vue、detail.vue
- 所属项目：苏住房G；来源会话ID：f09d0d8f-6e96-496a-8a72-7934ff001122；代码基线：c2a604a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "service_report_area_complexid",
  "source_extraction_id": "f7f1e07dd4db4c05b244379202929f45",
  "version": 1,
  "memory_type": "entities"
}
-->