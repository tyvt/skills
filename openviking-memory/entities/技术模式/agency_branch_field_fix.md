# 经纪机构分支前端字段与接口对齐修复
修复经纪机构分支（注销功能仅主管部门使用）前端字段名与接口不一致导致业务状态不显示、删除按钮缺失、机构类型回显原始值的问题。
## 问题1修复
- 接口返回 `bizState`，列表之前误用 `recordState` 导致业务状态列空白、删除按钮判断失效
- `AgencyBranchList.vue` 全部对齐为 `bizState`（列表列、筛选条件、编辑/删除/注销按钮可见性）
## 问题2修复
- 接口字段为 `organType`，前端之前用 `companyType` 并硬编码 `'agency'`，字典未加载完成就赋值导致下拉框无法匹配
- `AgencyBranchDetail.vue` 表单字段改为 `organType`，从 init 接口读取 `data.organType`
- 初始化先并行加载 `company_type` 字典再设置表单；机构类型改为只读输入框显示中文标签（如「经纪机构」）；保存提交 `organType`
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgencyBranchList.vue、AgencyBranchDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：f6efa03f-122d-4824-bd41-be603cf2e082；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_field_fix",
  "source_extraction_id": "165456c449fa4d7da22f43201a818ef9",
  "version": 1,
  "memory_type": "entities"
}
-->