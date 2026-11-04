# 遮罩镂空边框实现搜索框光带环绕
搜索框光带改用 CSS mask 镂空边框渲染 3px 边框环，配合 @property --border-angle 旋转实现光带沿外轮廓环绕。

## 旧实现问题
- 旋转渐变置于半透明搜索框背后，渐变透入背景形成内部光晕而非边框光效

## 新实现方案
- 改用 CSS mask 镂空边框，渐变仅渲染 3px 边框环并叠加 z-index:2
- 配合 @property --border-angle 旋转角度实现光带沿外轮廓环绕
- 可调 padding 控边框粗细、动画时长控速

## 涉及文件
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/components/zs-input/zs-input.vue
- zhi2-web-admin/package.json

## 验证与归属
- 验证证据：门户/023.md
- 来源会话ID：b952859d-fcbb-4bce-b690-b2e5ad915c03；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mask_border_glow",
  "source_extraction_id": "87dc3c1f529f4b5fb5a8a756193bd67c",
  "version": 1,
  "memory_type": "entities"
}
-->