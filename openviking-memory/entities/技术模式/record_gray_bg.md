# 记录详情页白卡需浅灰底色分区显示
泰兴小程序员工端记录详情页需设置浅灰底色分区，避免下拉露白。
## 修改内容
- 在 `src/staff/pages_facility/record/detail.vue` 设置 `page` 与 `.add-record-page` 背景为 `#f7f7f7`。
- 移除无效的 `:deep(uni-page-body)` 写法。
- 在 `src/pages.json` 的 `record/detail` 路由增加 `backgroundColor` 避免下拉露白。
## 验证与归属
- 验证证据：src=泰兴小程序/017.md
- 涉及文件：src/staff/pages_facility/record/detail.vue、src/uni.scss、src/staff/styles/theme.scss、src/staff/pages_facility/record/add.vue、src/staff/pages_facility/record/index.vue、src/staff/pages_facility/record/detailScrap.vue、src/pages_facility/record-detail.vue、src/pages_facility/maintain-detail.vue
- 来源会话ID：1c084a78-e3f9-4415-96c7-c73e01f31b78
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_gray_bg",
  "source_extraction_id": "14f9f34c6b2047cf86ef295274671d43",
  "version": 1,
  "memory_type": "entities"
}
-->