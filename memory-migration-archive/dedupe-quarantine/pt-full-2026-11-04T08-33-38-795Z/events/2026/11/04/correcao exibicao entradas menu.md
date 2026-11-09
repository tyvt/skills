# Summary
Em UnifiedLogin.vue, textos de menuList estavam muito curtos causando exibição incompleta de campos de entrada, não por truncamento CSS. Foram completados 6 títulos conforme design e o cartão "broker" ajustado de 4 para 2 itens, garantindo renderização de 10 entradas. Evidência: portal/022.md.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】bug
【标题】查询入口显示不全因 menuList 文案过短
【内容】`UnifiedLogin.vue` 中 `menuList` 文案定义过短导致入口字段显示不全，非 CSS 截断。按设计稿补全 6 处标题，并将「经纪机构」卡片由 4 项调整为 2 项，保障 10 条入口文案完整渲染。
【验证证据】src=门户/022.md
【涉及文件】d:/repository/门户/zhi2-web-admin/src/views/home/UnifiedLogin.vue ; d:/repository/门户/zhi2-web-admin/package.json ; UnifiedLogin.vue
【来源会话ID】4062ecea-0902-44eb-88ca-58ac62a6986b
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "correcao exibicao entradas menu",
  "goal": "Corrigir exibição de entradas",
  "summary": "Em UnifiedLogin.vue, textos de menuList estavam muito curtos causando exibição incompleta de campos de entrada, não por truncamento CSS. Foram completados 6 títulos conforme design e o cartão \"broker\" ajustado de 4 para 2 itens, garantindo renderização de 10 entradas. Evidência: portal/022.md.",
  "ranges": "10-12",
  "source_extraction_id": "6d81a1d895e74cd1bc8d8f74ecec9578",
  "version": 1,
  "memory_type": "events"
}
-->