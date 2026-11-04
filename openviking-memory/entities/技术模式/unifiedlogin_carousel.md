# UnifiedLogin 竖向轮播公告裁切
UnifiedLogin 新闻/公告区使用竖向 el-carousel（固定高度约 29px）时，需对容器设 overflow: hidden 避免叠字。

## 修复要点
- 若 .el-carousel__container 保持 overflow: visible，多个 notice 项会同时露出导致文字重叠
- 在 scoped 样式中对 .news-content :deep(.el-carousel__container) 设 overflow: hidden
- 与 publicPortal 其它页 :deep 穿透 Element 的写法一致
- 可选加固：对 .el-carousel 再设 height 与模板 height 属性一致，避免主题差异下外层高度漂移

## 验证与归属
- 验证证据：会话 3717a5bf 竖向轮播多公告同时可见、文字叠乱；修复为 news-content 下 :deep(.el-carousel__container){overflow:hidden}，审查批准
- 涉及文件：UnifiedLogin.vue（zhi2-web-admin/src/views/home 下）
- 所属项目：门户；来源会话ID：3717a5bf-c5a2-43d7-ab4e-129de5141ccc；代码基线：2785dd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unifiedlogin_carousel",
  "source_extraction_id": "0325262565af4ddfa2e8ba7da5315c34",
  "version": 1,
  "memory_type": "entities"
}
-->