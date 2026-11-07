# 门户首页卡片丝带标题被裁半
门户首页（index-new 类卡片）出现标题贴底只剩一半字，根因是 card-header 的 overflow:hidden 与白底 card-body 叠层。
## 问题现象
- 标题伸出 header 盒外被裁切，叠上 .card-body 白底后像被内容区盖住。
- 验收可用 Playwright 断言标题文字完整落在 header 盒内。
## 修复做法
- .card-header 改为 overflow: visible 并抬高 z-index（如 3）。
- .card-header-tab 用不对称内边距把字收进丝带厚区。
- .card-header-text 可用 translateY(dw(-3)) 微调垂直位置。
- .card-body 恢复四边 padding 与标题区留白。
## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 会话 36da1bfd 最终结论：原因 .card-header 用了 overflow:hidden，叠上 card-body 白底后标题下半截被裁掉。
- 已改 overflow:visible、z-index:3、tab 内边距 4/14/11、translateY(dw(-3))、card-body padding dw(14)；Playwright 加 header 盒内断言 2 passed。
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue、zhi2-web-admin/tests/e2e。
- 所属项目：门户；代码基线：04586c4；来源会话ID：36da1bfd-d85e-47d1-a0e0-3a2d922f74ca。

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "portal_card_header_clip",
  "source_extraction_id": "08a22315a92147d78d710883711e5733",
  "version": 1,
  "memory_type": "entities"
}
-->