# 用户授权企业管理员删除按钮修复（operatorAuthRangeTable）
产品2.0 的 zhi2-web-admin 中用户授权详情的物业管理区域子表，企业管理员账号下「删除」按钮越权可用问题已修复。

## 现象
- operatorAuthRangeTable.vue 中「新增」已按 isCompanyAdmin 置灰，但「删除」仍走 mixin 默认逻辑
- 企业管理员账号下仍可操作删除，与新增不一致

## 修复方案
- 重写 multiDeleteButton：当 isCompanyAdmin 为 true 时禁用删除按钮，与「新增」一致
- 在 handleDelete 中增加拦截：即使绕过 UI 触发，企业管理员也不执行删除

## 验证与归属
- 所属项目：产品2.0；来源会话：01e7eed0-b3c3-4b15-9fda-320771899793；代码基线：none
- 涉及文件：operatorAuthRangeTable.vue、detail.vue

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "company_admin_delete",
  "source_extraction_id": "78adc053f19543b39c7c4949d8e76fa2",
  "version": 1,
  "memory_type": "entities"
}
-->