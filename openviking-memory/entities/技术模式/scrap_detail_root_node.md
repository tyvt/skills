# 报废详情页根节点误用致灰底分块缺失
物业手持B端报废记录详情页因根节点类名误用导致灰色底与白卡分块缺失的已知问题及修复方案。

## 问题根因
- `src/pages_facility/record/detailScrap.vue` 根节点误用 `add-record-page` 并依赖 `:deep(uni-page-body)` 样式穿透
- 导致灰色背景与白卡分块样式缺失，页面视觉结构错乱

## 解决方案
- 根节点改为 `detail-page`，新增 `page { background: #f7f7f7 }` 与 `.detail-page` 灰底 `min-height:100vh`
- 移除 `:deep` 写法，白卡片沿用 `facilityDetail` 规范（圆角16rpx、间距24rpx）

## 验证与归属
- 验证证据：src=物业手持B端/003.md
- 涉及文件：detailScrap.vue、detail.vue、addScrap.vue、facilityDetail.vue、record/index.vue、issue/index.vue、workbench/index.vue
- 来源会话ID：98d5b47c-5806-4707-a116-9d28de128902；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrap_detail_root_node",
  "source_extraction_id": "8d4147cd914e4ebdb70a5e2257f219ff",
  "version": 1,
  "memory_type": "entities"
}
-->