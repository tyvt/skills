# 门户操作指引三条业务线 Banner 统一
门户操作指引顶栏图集中由 operationGuideBanners.js 配置，三条业务线统一指向公共 banner.svg。

## 配置方式
- 商品房、存量房、住房租赁的 src 统一指向 public/assets/images/operationGuide/banner.svg（设计稿约 1922×485，与原 JPG 比例一致）
- 轮播用 <img> 渲染时 SVG 可直接缩放，无需改组件类型
- 替换后旧 JPG 可暂留目录待验收再删

## 验证与归属
- 验证：将组 437.svg 复制到 public/assets/images/operationGuide/banner.svg；更新 operationGuideBanners.js 三条业务线 src 都指向 banner.svg
- 涉及文件：zhi2-web-admin/public/assets/images/operationGuide/banner.svg、zhi2-web-admin/src/views/home/operationGuide/config/operationGuideBanners.js
- 所属项目：门户；来源会话ID：session_097a24fe37894436d674e84dda77dad9；代码基线：fd9ef3e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_guide_banner",
  "source_extraction_id": "9bff8e575e8c477cbc2cfba8158e77d8",
  "version": 1,
  "memory_type": "entities"
}
-->