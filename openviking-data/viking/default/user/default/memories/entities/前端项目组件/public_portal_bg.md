# 门户全屏对外二级页背景
门户从 /#/UnifiedLogin 菜单打开的全屏对外二级页（publicPortal）背景统一使用 portal_page_bg.jpg，样式在 portal.scss。
## 提交规则
- portal_page_bg.jpg 必须与 portal.scss 一起提交，否则线上只会看到 #dfe6ee 灰色回退色
- 背景 background-size: cover、顶部居中，图片加载前回退色 #dfe6ee
- @media print 去掉背景避免整页大图打印，内容区仍用半透明白 portal-panel
## 关联入口
- 与统一登录顶栏 banner_hero.svg、登录后 HomeHeroBanner 是不同入口，换同一张天际线图需分别改引用
## 涉及文件
- zhi2-web-admin/public/assets/images/homeNew/portal_page_bg.jpg
- zhi2-web-admin/src/views/home/publicPortal/portal.scss
- zhi2-web-admin/src/views/home/components/HomeQuickLinks.vue

<!-- MEMORY_FIELDS
{
  "category": "前端项目组件",
  "name": "public_portal_bg",
  "source_extraction_id": "7037bdfe688c4a78a39bfd8eeba60a8f",
  "version": 1,
  "memory_type": "entities"
}
-->