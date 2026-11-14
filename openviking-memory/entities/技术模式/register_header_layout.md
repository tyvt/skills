# 注册页横幅与标题布局规范
RegisterPageHeader 组件在房地产开发企业/经纪机构账号注册页的横幅背景图已自带平台名，故横幅内不渲染 HTML 标题，页面标题移至横幅下方。

## 布局规则
- 横幅背景图（register-page-banner.png）已印有「苏州市房地产综合服务平台」，横幅内不再渲染 HTML 标题文字，避免与图片文字重叠
- 页面标题（如「房地产开发企业账号注册」）渲染在横幅下方白色区域，黑色左对齐
- `page-title-bar` 上下内边距统一为 40px，使标题与横幅、与下方「营业执照信息」等内容的间距一致
- `showBackButton` prop 默认 `true`；companyRegister 传 `false` 去掉「返回首页」按钮，institutionRegister 保留返回按钮

## 涉及文件
- zhi2-web-admin/src/components/RegisterPageHeader/index.vue
- zhi2-web-admin/src/views/register/companyRegister.vue
- zhi2-web-admin/src/views/register/institutionRegister/InstitutionRegisterPage.vue（共享组件，仅传 title，保持返回按钮）

## 验证与归属
- 验证证据：nginx(8098) 部署截图确认横幅仅显示背景图自带标题、页面标题在横幅下方、无返回按钮、上下边距一致
- 所属项目：房产综合服务平台 zhi2-web-admin；来源会话：2026-11-12 注册页顶部调整任务
- 代码基线：子模块提交 7354379d3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_header_layout",
  "source_extraction_id": "dce78972fb694a2e9e9ce09de9251841",
  "version": 1,
  "memory_type": "entities"
}
-->