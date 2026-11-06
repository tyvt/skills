# 三种注册流程删除API不一致探索
苏州市房地产监测V3 三种注册流程在 Step3 要件上传阶段均有上传/删除 UI，但删除 API 实现不一致。

## 探索结论
- 开发企业 `/companyRegister`、经纪机构 `/institutionRegister`、租赁机构 `/leaseInstitutionRegister` 在 Step3 均有完整上传/删除 UI
- 全仓库未发现 `deleteAnonymous`，仅有 `uploadAnonymous`
- 经纪机构与租赁机构共用一套页面组件，仅 `busCode` 与路由入口不同

## 文件结构
- 开发企业入口：`zhi2-web-admin/src/views/register/companyRegister.vue`
- 经纪机构入口：`zhi2-web-admin/src/views/institutionRegister/index.vue`
- 租赁机构入口：`zhi2-web-admin/src/views/leaseInstitutionRegister/index.vue`（薄包装）

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：dd1a96b2-8912-437c-84fd-fc3b5fcab383
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_delete_diff",
  "source_extraction_id": "ab3da10e36a44bd0aa5622239b14a9f5",
  "version": 1,
  "memory_type": "entities"
}
-->