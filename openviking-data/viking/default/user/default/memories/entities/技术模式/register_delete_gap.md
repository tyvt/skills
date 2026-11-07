# 注册流程中不一致的删除 API
在项目 苏州市房地产监测V3 中，三个注册流程在 Step3 的附件删除实现上不一致。

## 问题
- 三个注册流程在 Step3 的附件上传删除 API 不一致。
- 仓库仅包含 `uploadAnonymous`，而没有 `deleteAnonymous`。

## 组件模式
- 经纪机构和租赁机构共享页面组件。
- 仅区别于 `busCode` 和入口路由。

## 文件
- `companyRegister.js`, `institutionRegister.js`, `Step3Appendix.vue`, `RegisterUploadItem.vue`, `InstitutionUploadItem.vue`, `前端技术信息.md`, `路由信息.json`.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_delete_gap",
  "source_extraction_id": "c214f8dac06a4cb6a5b1a6943e986c4d",
  "version": 1,
  "memory_type": "entities"
}
-->