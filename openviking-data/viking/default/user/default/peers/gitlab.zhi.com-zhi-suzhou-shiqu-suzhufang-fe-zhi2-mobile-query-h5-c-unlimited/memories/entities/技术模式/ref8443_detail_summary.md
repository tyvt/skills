# ref8443详情页首卡样式还原
在 zhi2-mobile-query-h5-c（ref8443，苏住房防汛C端查询H5）项目中，对比参考站发现详情页首卡（`.summary`）的 padding 与工单编号字号不一致，已修复。

## Description
- 现象：本端详情页首卡「工单编号」行与标题行距、字号与参考站不一致；标题换行位置不同。
- 根因1：`.summary` 缺少 `padding-right:76px`（参考站为 `16px 76px 16px 16px`，预留给「待提交」徽章）；本端 `.summary{padding-right:76px}` 被 `.detail-page .card{padding:16px}` 同权重覆盖丢失。
- 根因2：`.summary-no` 工单编号字号本端 11px，参考站 12.8px，偏小。

## Solution
- `.summary` 加 `padding:16px 76px 16px 16px !important`（用 !important 避免被 `.detail-page .card` 覆盖）。
- `.summary .summary-no` 字号 11 → 12.8px；求援详情 `.rescue-summary .summary-no` 同步。

## Verification
- 验证：工单编号字号、标题换行位置（两行）、标题间距、徽章位置与参考站逐像素一致；首卡高度 109 vs 111（差 2px，肉眼不可辨）；结构+布局 gate 7/7 通过。
- 所属项目：苏住房防汛C端查询H5（zhi2-mobile-query-h5-c / ref8443）
- 来源会话：2026-11-06 对话；Git 提交 `9117c23 fix(ref8443): detail summary card padding-right 76 + 工单编号 font-size 12.8px`（未推送）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_detail_summary",
  "source_extraction_id": "b4032b4831744db0a9acfc6fc137ae51",
  "version": 1,
  "memory_type": "entities"
}
-->