# 机构注销材料上传组件统一
苏州市房地产监测V3 机构注销管理的「注销材料」上传从通用 `FileUpload` 换成机构模块统一的要件组件 `AppendixPackageSection`。

## 改动内容
- `src/views/company/companyCancel/detail.vue`：上传组件替换为 `AppendixPackageSection`，独立「注销材料」区块，新增/编辑/查看三态适配
- `src/api/company/companyCancel.js`：新增 `COMPANY_CANCEL_APPENDIX_BUS_CODE = 'jgzx'` 兜底 busCode
- e2e fixtures 与 spec 选择器改为要件网格 `.appendix-requirement-grid`，接口改为 `/file/appendix/upload`

## 影响范围
- 经纪/租赁（zljg）与开发企业注销三个入口共用此核心页，一处修改全部生效
- 涉及路径：`zhi2-web-admin/src/views/company/companyCancel/` 等

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：c91195ed-7ae8-483d-a56e-a2eb8c8b730b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cancel_appendix_unify",
  "source_extraction_id": "8b3fd04925784d4a9e921898df472afd",
  "version": 1,
  "memory_type": "entities"
}
-->