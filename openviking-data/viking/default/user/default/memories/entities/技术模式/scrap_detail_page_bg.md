# 报废记录详情页分块背景缺失修复
物业手持B端报废记录详情页因根节点样式问题导致灰色页面底与白色分块卡片背景缺失。

## 问题根因
- `src/pages_facility/record/detailScrap.vue` 根节点为 `add-record-page`，缺少灰色页面底与白卡片分块背景

## 解决方案
- 根节点改为 `detail-page`，与设施设备详情页命名一致
- 新增非 scoped 样式 `page { background: #f7f7f7 }`，`.detail-page` 增加 `min-height: 100vh` 与灰色背景兜底，移除不可靠的 `:deep(uni-page-body)`
- 白卡片分块沿用 `facilityDetail` 规范：白底 `#FFFFFF`、圆角 `16rpx`、内边距 `32rpx`、卡片间距 `24rpx`，标题与详情值颜色 `#333333`

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages_facility/record/detailScrap.vue、src/pages_facility/record/detail.vue、src/pages_facility/issue/detail.vue、src/pages_facility/record/addScrap.vue、src/pages_facility/facility/facilityDetail.vue
- 来源会话ID：98d5b47c-5806-4707-a116-9d28de128902
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrap_detail_page_bg",
  "source_extraction_id": "c99b5f6c19b841578a10f18af3a609aa",
  "version": 1,
  "memory_type": "entities"
}
-->