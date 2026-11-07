# 人员授权列表增加所属企业筛选
人员授权列表页（operatorAuth）新增【所属企业】筛选条件，输入企业名称可按所属企业过滤当前列表。

## 改动说明
- `queryParams` 新增 `companyName: undefined`，随其他条件一并传给列表接口
- `formItems` 新增输入框筛选项：标签「所属企业」、字段 `companyName`、占位符「请输入企业名称」
- 实现方式与 `staffManagement/components/index.vue` 中的同类筛选一致

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/company/userManagement/operatorAuth/index.vue、company/staffManagement/components/index.vue、company/userManagement/operator/index.vue
- 所属项目：产品2.0；来源会话：0819ec89-ecfa-4859-8949-e31b74cfb8f3；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operator_company_filter",
  "source_extraction_id": "6e0f002672a049a3a4a088edec38ef06",
  "version": 1,
  "memory_type": "entities"
}
-->
