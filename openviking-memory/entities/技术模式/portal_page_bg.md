# 门户二级页背景走 portal.scss 变量
publicPortal 等首页二级页面背景由 portal.scss 的 --portal-page-bg 引用静态资源，换图只需替换文件。

## 实现方式
- 二级页面背景不硬编码在各 Vue 中，由 `src/views/home/publicPortal/portal.scss` 的 CSS 变量 `--portal-page-bg` 引用 `public/assets/images/homeNew/portal_page_bg.png`（或同路径替换资源）
- 换底图时替换该静态文件即可，一般无需改组件；浏览器强刷避免缓存

## 验证与归属
- 验证证据：用户要求二级页背景换 SVG 切图；结论为替换 portal_page_bg.png，portal.scss 变量引用路径不变
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/portal.scss、zhi2-web-admin/public/assets/images/homeNew/portal_page_bg.png
- 所属项目：门户；来源会话ID：db938840-34a6-4a51-bfdc-9bc6cd447438；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_page_bg",
  "source_extraction_id": "31f13fc945de4a1380d778018b63e80a",
  "version": 1,
  "memory_type": "entities"
}
-->