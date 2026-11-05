# 人员管理角色下拉框数据源错误修复
苏住房G项目修复 toB 人员管理详情页角色下拉框硬编码机构类型导致的数据源错误。

## 修改内容
- 移除硬编码：form.organType 默认值由 '02' 改为 undefined
- 新增 loadRoleOptions(organType)：按机构类型请求 /system/role/roles，无 organType 时清空选项
- 新增 resolveAndLoadRoles()：优先用 form.organType，否则通过 companyRecordId 查询企业详情获取 organType
- initDict()：普通新增/编辑调用 resolveAndLoadRoles()；变更场景按 res.data.organType 加载角色
- setCompany(row)：企业类型变化时清空 roleIds 并重新加载对应角色列表

## 涉及文件
- zhi2-web-admin/src/views/toB/personnelRecord/components/detail.vue（主改）
- 关联：register/components/accountInfo.vue、institution/personnel/detail.vue

## 验证与归属
- 所属项目：苏住房G；来源会话：4d653d37-aa8a-4614-b734-2b2e40476bec；代码基线：none
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_role_fix",
  "source_extraction_id": "abdd97970a8a4abf9d8be3872a649e61",
  "version": 1,
  "memory_type": "entities"
}
-->