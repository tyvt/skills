# 大文本域间距修复
苏住房防汛C端 H5 ref8443 页面修复普通卡片内大文本域（textarea）与相邻块贴边无间距问题，2026-11-06 完成。

## 问题根因
- 普通 `.card` 无 flex gap，其子元素 `.ref-textarea`（险情说明、备注等）无上下间距
- 相邻块如「现场照片」标题仅有 bottom margin，导致备注 textarea 紧贴上方照片区

## 修复方案
- 在 `src/styles/ref8443.css` 新增 `.ui-ref8443 .card > .ref-textarea{margin:12px 0!important}`
- 仅作用于普通 `.card` 直接子元素 `.ref-textarea`，救援页文本域在 `.textarea-wrap` 内不受影响

## 验证与归属
- 汛中「险情补充及影像」卡、汛后各分区卡文本域均获得 12px 上下间距，截图确认不再贴边
- 救援页 margin 0 保持原样（由 `.card.fields` gap 提供）
- 提交 `0a8adfb` 合并至 `dev`（工作树提交 `4b36ef2`），部署 nginx 8095 验证
- 所属项目：苏住房防汛C端 H5；会话时间：2026-11-06

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "textarea_gap_fix",
  "source_extraction_id": "88ae84c0b79f44a4bf63ac09d0173b11",
  "version": 1,
  "memory_type": "entities"
}
-->