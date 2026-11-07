# ctUserIdentityApply 模块
泰兴G 前端子模块 zhi2-web-admin 中对应「APP业主人工审核新」菜单的业务模块，处理用户身份申请。

## 基本信息
- 菜单图标名：icon-APP业主人工审核新（svg 中字面量）
- 组件名：CtUserIdentityApply，路径 src/views/property/ctUserIdentityApply/index.vue
- 使用 listMixins + ListTemplate.js 渲染标准列表
- API：GET /property/ctUserIdentityApply/page，主键 applyId
- 旧版类似功能在 appOwnerAudit（businessName: ctUserIdentity）

## 相关文件
- 列表页：src/views/property/ctUserIdentityApply/index.vue
- 详情页：src/views/property/ctUserIdentityApply/detail.vue
- 模板：ListTemplate.js

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴G
- 来源会话：9ccefa94-018e-4d3e-9072-433fd241659a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "泰兴G技术",
  "name": "ct_identity_apply",
  "source_extraction_id": "711b02c3051d41118a09a64828ded27d",
  "version": 1,
  "memory_type": "entities"
}
-->