# FjDialog.vue 附件配置接口规范化修复
FjDialog.vue 原使用 dialogMixins 但详情与保存仍走旧 REST 风格接口，已改为复用 mixin 标准 CRUD。

## 问题根因
- FjDialog.vue 使用 dialogMixins，但详情、新增、修改仍走旧 REST 风格接口
- 旧接口示例：GET /file/appendixConfig/{id}、POST /file/appendixConfig、PUT /file/appendixConfig
- 导致请求到 http://localhost:8081/api/v3.0/file/appendixConfig/2093171403265224706 这类旧地址

## 修复方案
- 参考 ArchiveDetailDialog.vue 等已迁移页面改造 FjDialog.vue
- 补充 primaryKey、moduleName、businessName，复用 mixin 的标准 CRUD 接口
- 用 mode 映射操作类型

## 新接口规范
- 详情：POST /file/appendixConfig/detail
- 新增：POST /file/appendixConfig/add
- 修改：POST /file/appendixConfig/update

## 验证与归属
- 所属项目：产品2.0
- 来源会话ID：4d504758-e807-4d71-ab92-00820c1154ef
- 涉及文件：FjDialog.vue、form.js、ArchiveDetailDialog.vue、index.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fjdialog_rest_fix",
  "source_extraction_id": "00a25f2a044543009563b95e37f53c30",
  "version": 1,
  "memory_type": "entities"
}
-->