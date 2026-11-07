# 门户首页卡片头溢出隐藏裁切
门户首页设计图 100% 还原时，卡片标题因 .card-header 溢出隐藏被裁切，已通过样式与 Playwright 断言修复。

## 根因
- .card-header 使用 overflow:hidden，叠加 .card-body 白底，标题下半截被裁掉，看起来像贴底只剩一半字。

## 修复要点
- .card-header 改为 overflow:visible 且 z-index:3，避免被内容区盖住。
- .card-header-tab 设不对称内边距 4/14/11（@1024），在丝带厚区把字往上收。
- .card-header-text 加 translateY(dw(-3)) 减轻偏下；.card-body 恢复四边 padding:dw(14) 与标题区留间距。
- 若仍偏下可调 translateY 到 dw(-5) 或 tab 下内边距 dw(11)→dw(13)。

## 验证
- Playwright 已加「文字完整落在 header 盒内」断言，当前 2 passed。
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue；来源会话 36da1bfd-d85e-47d1-a0e0-3a2d922f74ca；项目门户。

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "card_header_clip",
  "source_extraction_id": "1121f675ae5041a1b8d5b2fb551f6b4f",
  "version": 1,
  "memory_type": "entities"
}
-->
