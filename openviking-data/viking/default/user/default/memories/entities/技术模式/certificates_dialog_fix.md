
# 从业人员证书弹窗表单结构规范
苏州市房地产监测V3 中从业人员证书弹窗（certificatesDialog.vue）已统一表单结构并符合前端规范。

## 已完成改动
- 两处 `certificatesDialog.vue`（components/ 与 personnelRecord/）均改为 `form-box` → `zs-form`（`label-position="right"`）→ `zs-form-item`，移除 `el-row` / `el-col` 及 `.certificate-form` 样式
- `FileUpload` 设 `:is-show-tip="false"`，并添加灰色 `.upload-tip` 文案
- 两处文件结构保持一致（副本同步），Lint 无报错

## 涉及文件
- `zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue`
- `zhi2-web-admin/src/views/company/staffManagement/personnelRecord/certificatesDialog.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：ba8901ef-27cd-40ea-a120-41f51d8f7810；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificates_dialog_fix",
  "source_extraction_id": "51f509fc1cfc4814bd2e840f740c0807",
  "version": 1,
  "memory_type": "entities"
}
-->