# 门户二级页全屏背景
publicPortal 首页菜单链接打开的全屏对外门户页（可售楼盘、公示公告、经纪人查询等）背景由 portal.scss 的 `.public-portal` 全屏层引用静态资源。

## 实现方式
- 新增 `zhi2-web-admin/public/assets/images/homeNew/portal_page_bg.jpg`（苏州天际线背景）
- `src/views/home/publicPortal/portal.scss` 中 `.public-portal` 全屏层使用该图：`background-size: cover`、顶部居中，并保留 `#dfe6ee` 作为加载回退色
- 内容区仍是半透明白色面板（`portal-panel`），与设计稿层次一致
- 打印时去掉背景图，避免整页大图打印
- 换底图时须将 `portal_page_bg.jpg` 与 `portal.scss` 一起提交，否则线上只会看到灰色回退色

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：会话 49156c21 用户将苏州天际线背景应用到全屏对外门户页；会话 db938840 早期结论为二级页背景走 portal.scss 变量引用静态资源
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/portal.scss、zhi2-web-admin/public/assets/images/homeNew/portal_page_bg.jpg、HomeQuickLinks.vue
- 所属项目：门户；来源会话ID：49156c21-c97f-451b-8a6d-e974d3322dfe、db938840-34a6-4a51-bfdc-9bc6cd447438；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_page_bg",
  "source_extraction_id": "52c39ff7d9024162adeec53c60ddde30",
  "version": 2,
  "memory_type": "entities"
}
-->