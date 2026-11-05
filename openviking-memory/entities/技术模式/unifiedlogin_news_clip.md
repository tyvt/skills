# 首页登录页公告标题裁切修复
门户首页 UnifiedLogin.vue 公告区因日期换行与 Element 竖向轮播导致标题糊成一条线，已改为单条定时轮换并固定行高。

## 根因
- 接口失败走 mock 时时间如 `2022-06-06 12:41:10`，右侧列仅 120px 折成两行，整行高 58px 而展示区仅 29px，标题被裁切
- Element 的 el-carousel 多条公告叠在同高度，互相糊在一起

## 修复要点
- 去掉 el-carousel，改为定时轮换单条 activeNewsItem（仍 4 秒切换）
- 用 formatNoticeDate 统一只显示 YYYY-MM-DD
- .news-item 固定 height:29px，日期加 white-space:nowrap

## 涉及文件
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/views/home/publicPortal

## 验证与归属
- 在 http://localhost:8082/ 验证：行高 29px、日期 2022-06-06，标题可读
- 验证证据：cursor 会话提取；所属项目：门户；来源会话：36c8f156-f9a2-4ed8-b85c-200e96ace5cc


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unifiedlogin_news_clip",
  "source_extraction_id": "6313d7294504464dbdd902f7fd29842d",
  "version": 1,
  "memory_type": "entities"
}
-->