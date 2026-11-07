# 统一登录页静态PDF菜单分支
统一登录页菜单项指向静态 `.pdf` 时须用 `window.open` 单独分支，且部署前须确认 public 文件存在。

## 处理方法
- `handleNavigate` 须在 `portal:`/`http(s)` 之后单独分支，用 `window.open(path, '_blank', 'noopener,noreferrer')`
- 避免 `$router.push` 把 PDF 当路由
- 常量指向 `public/assets/files/` 下文件时，合并前须确认仓库或部署包中文件存在，否则新标签 404

## 验证与归属
- 验证证据：审查 COMMERCIAL_CONTRACT_TEXT_2016_PDF + handleNavigate PDF 分支；仓库内曾未检出对应 pdf 为运维 MEDIUM
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue
- 所属项目：门户；来源会话ID：ab4c5939-b99f-446e-8468-af5cdbe34e30；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_login_pdf",
  "source_extraction_id": "dd05c04674b048bf80a36b361c86a7fd",
  "version": 1,
  "memory_type": "entities"
}
-->