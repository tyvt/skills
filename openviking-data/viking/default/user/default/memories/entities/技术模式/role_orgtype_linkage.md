# 角色下拉按机构类型联动修复
人员管理新增/编辑人员页角色下拉因organType写死默认值'02'导致跨机构返回错误角色集，须改为动态取类型。

## 问题根因
- form.organType默认值硬编码'02'（物业企业），无论实际所属企业类型均按'02'过滤角色接口
- 编辑历史人员沿用默认值，非按人员所属企业取类型；角色加载在initDict并行发导致时序错误

## 解决方案
- form.organType默认值改undefined，禁兜底
- 抽loadRoleOptions(organType)：organType空时清选项不请求
- 抽resolveAndLoadRoles()：优先form.organType，缺失用companyRecordId查企业详情补
- setCompany切换企业先清roleIds再重拉；detailCallback里补调loadRoleOptions避免并行时序错
- isChange场景按源人员organType加载

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话4d653d37用户报信托公司时角色框显物业企业角色，定位listRolePage未传企业类型
- 涉及文件：toB/personnelRecord/components/detail.vue、institution/personnel/detail.vue、company/staffManagement/components/detail.vue、register/components/accountInfo.vue、company/userManagement/operator/detail.vue、toB/adminOperator/detail.vue
- 所属项目：苏住房G；来源会话：4d653d37-aa8a-4614-b734-2b2e40476bec；代码基线：b8ae114

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "role_orgtype_linkage",
  "source_extraction_id": "e32fbf3f2ec94e2394584ddc813a6f8f",
  "version": 1,
  "memory_type": "entities"
}
-->