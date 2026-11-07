# 子表按角色禁用操作按钮
需求为某角色（如企业管理员 isCompanyAdmin）在详情页子表上「新增/删除」按钮可见但置灰时，需重写 multiDeleteButton + handleDelete 双层拦截。
## 问题根因
- 只改「新增」按钮 disabled 不够：「删除」走 listMixins/table mixin 默认 multiDeleteButton，不重写仍可被点击。
- 前端置灰可被绕过，需在方法层兜底。
## 解决方案
- 子表组件重写 multiDeleteButton，把角色条件并入 disabled（如 disabled: isCompanyAdmin || selection.length===0），保持 permission/multi 等契约不变。
- handleDelete 开头加同条件拦截，即使绕过 UI 也不执行删除。
- 角色标志由详情页把接口字段 :isCompanyAdmin="form.isCompanyAdmin" 传给子表，详情页本身不用改。
- 与已知 #823（复用 multiDeleteButton 不要自造按钮）互补：本条补充按角色置灰需重写+方法层双保险。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 01e7eed0 operatorAuthRangeTable.vue 重写 multiDeleteButton 使企业管理员删除按钮置灰，并在 handleDelete 中拦截。
- 涉及文件：zhi2-web-admin/src/views/company/userManagement/operatorAuth/operatorAuthRangeTable.vue。
- 所属项目：产品2.0；来源会话ID：01e7eed0-b3c3-4b15-9fda-320771899793；代码基线：0161609~94b86fa（2026-07）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "child_table_role_disable",
  "source_extraction_id": "95867fed974048d29a326f877b61667d",
  "version": 1,
  "memory_type": "entities"
}
-->