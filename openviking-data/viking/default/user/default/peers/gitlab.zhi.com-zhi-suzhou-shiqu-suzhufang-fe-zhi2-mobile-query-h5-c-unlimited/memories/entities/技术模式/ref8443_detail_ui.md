# ref8443详情页UI调整
苏住房C H5 ref8443 详情页（Ref8443Detail.vue）在 2026-11-06 的两处 UI 调整。

## 照片网格
- 「现场自救及抢险处置」现场照片由原 `photo-grid two`（两列）改为 `photo-grid three`（三列），与上传样式一致，一行三个
- 图片 `object-fit:cover`、圆角已适配；提交 f7beb30 合并 26e6d80 入 dev

## 底部按钮组
- 检查类工单详情（查看态）底部 action-bar（返回/上报）已移除，页面末尾即为内容
- 求援工单详情按钮组（上报/立即受理）保持不变
- 提交 226268d 合并 bc7c934 入 dev


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_detail_ui",
  "source_extraction_id": "dea6da673ea345ba9b2da4c19e3164d4",
  "version": 1,
  "memory_type": "entities"
}
-->