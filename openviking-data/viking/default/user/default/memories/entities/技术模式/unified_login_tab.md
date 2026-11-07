# 首页 UnifiedLogin 操作指引入口 Tab 高亮规则
首页 UnifiedLogin.vue 入口链接的 query 参数决定操作指引页默认选中的身份 Tab。

## 规则要点
- 从首页进入「住房租赁 操作指引」时，入口链接 query（如 tab=individual / tab=enterprise）决定操作指引页默认选中身份 Tab
- 产品要求默认高亮第一个（企业）时，须把写死的 tab=individual 改为与 operationGuide 路由约定一致首项（如 tab=enterprise）
- 仅改 operationGuideMeta 不够，须查首页所有入口链接统一修正

## 验证与归属
- 验证：首页入口链接在 UnifiedLogin.vue 写死 tab=individual，已改为 tab=enterprise；从首页「住房租赁 操作指引」进入默认高亮「我是住房租赁企业」
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue、zhi2-web-admin/src/views/home/operationGuide/config/operationGuideMeta.js
- 所属项目：门户；来源会话ID：01a1624c-058b-70c5-a400-74b8fa58e8de；代码基线：fd9ef3e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unified_login_tab",
  "source_extraction_id": "9bff8e575e8c477cbc2cfba8158e77d8",
  "version": 1,
  "memory_type": "entities"
}
-->