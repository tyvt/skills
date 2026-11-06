# 门户首页卡片体顶部间距修复
门户首页除业务中心外，常用功能 / 公示公告等 .card-body 因负 margin-top 与 overflow:hidden 被裁切，已修复。

## 问题根因
- 之前为压间距给 .card-body 加 margin-top: -8px，容器仍 overflow: hidden，内容整体上移后顶部落在裁剪区域，常用功能图标、公告第一行被切掉

## 修复方式
- 去掉负 margin-top，恢复 margin-top: 0
- 用统一 $design-card-body-padding-top: 6（约 6px）做顶部留白，比原来 14px 紧且不裁切
- 常用功能 / 公示公告的 .card-body 改为 overflow: visible，避免再被裁切
- 功能块、公告行内边距略回调，保证文字和图标完整显示
- 若仍偏松或偏紧，只改约第 506 行 $design-card-body-padding-top（如 4 或 8）即可

## 涉及文件与归属
- d:\repository\门户\zhi2-web-admin\src\views\home\index-new.vue
- d:\repository\门户\zhi2-web-admin\src\styles\index.scss
- d:\repository\门户\zhi2-web-admin\tests\e2e\portal-home-visual.spec.ts
- 所属项目：门户；来源会话ID：2a87516f-bc63-420e-9c43-3e2e10205bfd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "card_body_margin",
  "source_extraction_id": "094ea85f71754ba48e097e9c549bb100",
  "version": 1,
  "memory_type": "entities"
}
-->