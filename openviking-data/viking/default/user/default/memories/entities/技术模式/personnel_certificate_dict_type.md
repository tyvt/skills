# 经纪机构专业资格证书类型字典接入
已在经纪机构管理 → 专业资格证书管理列表页为「资格证书类型」列接入字典 company_personnel_certificate_type 转译。
## 修改说明
- 修改文件 `personnelCertificate/index.vue`：表格列 `type="dict"`，设置 `dict-url="company_personnel_certificate_type"`，通过 `:options="certificateTypeOptions"` 传入字典项
- 数据加载：在 `created` 中调用 `initDict()`，用 `getDicts('company_personnel_certificate_type')` 拉取选项，避免列仅按 prop 回退到错误字典显示原始码值
- 详情页 `detail.vue` 本就用同一字典，列表与详情已对齐
## 预期效果
- 刷新列表后，「资格证书类型」显示字典中文标签（如经纪人、经纪人协理等，以环境字典配置为准）
- 若仍显示 `01`，请在系统管理 → 字典管理中确认 `company_personnel_certificate_type` 配置
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：personnelCertificate/index.vue、detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：2a03d161-8f4b-4db5-aecc-7bd4caa3a15d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_certificate_dict_type",
  "source_extraction_id": "165456c449fa4d7da22f43201a818ef9",
  "version": 1,
  "memory_type": "entities"
}
-->