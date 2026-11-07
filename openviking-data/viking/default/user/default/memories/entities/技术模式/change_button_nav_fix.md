# 「变更」按钮跳转编辑页修复
苏州市房地产监测V3 修复变更按钮无法跳转编辑页的问题。

## 修改内容
- companyRecord.js：新增 resolveChangeId()，兼容 getLastByLogin 返回标量 ID 或对象两种格式
- CompanyBasicInfoDetail.vue 路由查找：用 findRouterByFilePath 静默查找，优先 toB/change/detail，再 fallback company/companyManagement/change/detail（避免 getRouterPathByFilePath 抛错导致 fallback 失效）
- CompanyBasicInfoDetail.vue 跳转与 ID 规范化：跳转格式 path + changeId 带 query: { formMode: 'edit', id }（与从业人员页一致）；loadActiveChange、detailCallback、navigateToChangeEdit 均做 ID 规范化

## 涉及文件
- companyRecord.js、CompanyBasicInfoDetail.vue、company/companyManagement/change/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：ac2a541a-e0f6-41f2-bba0-8b283388ff32；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "change_button_nav_fix",
  "source_extraction_id": "aecd5ccb4e0e42769b1470cec6b4862f",
  "version": 1,
  "memory_type": "entities"
}
-->