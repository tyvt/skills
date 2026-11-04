# 门户首页公示公告两行版式
index-new 右侧公示公告列表项采用两行结构：第一行圆点+标题，第二行左侧分类标签、右侧日期+箭头，勿用 flex-wrap。

## 结构规则
- DOM：notice-text 内标题 + notice-footer（标签与 notice-meta 同行左右分布）
- 圆点用实心色块（如 #2D4B81）而非字符 ·
- 标签灰底 #f2f4f7、字色 #8a96a8；项间分隔用虚线 dashed
- 标题 font-weight:500 并加 :title 悬停全文；v-for 用 announcementId 作 key

## 验证与归属
- 验证证据：会话 3189eeb5，用户反馈通知公告与设计稿不一致；结论 flex-wrap 导致标签跟标题同行，已改为 notice-text/notice-footer 两行结构、实心圆点、虚线分隔与标签色值，并改用 announcementId 作 key
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；来源会话：3189eeb5-f453-4f06-a88b-e017c31ce460；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_notice_twoline",
  "source_extraction_id": "c5ddad6824164d7095ceeab2e97eb65d",
  "version": 1,
  "memory_type": "entities"
}
-->