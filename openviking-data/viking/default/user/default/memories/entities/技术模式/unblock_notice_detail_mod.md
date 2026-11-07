# 划拨通知书详情页撤销与打印字段改造
苏州市房地产监测V3 的划拨通知书详情页（`supervision/unblock/notice/detail.vue`）已按需求改完撤销信息蓝条与打印字段。

## 撤销三字段改造
- 在「基本信息」上方增加 `HeadTitle` 蓝条，展示：撤销人、撤销时间、撤销标识（字典 tag）
- 已从 `contentInfo` / `DetailTemplate` 移除这三项，避免重复展示

## 打印三字段改造
- 通知书打印标识 / 次数 / 最近打印时间 紧跟在「通知书状态」之后
- 打印标识补了 `hasPrintStateOptions`

## 验证与归属
- 查看模式刷新即可见：顶部蓝条为撤销信息，主表单状态后为打印字段
- 涉及文件：`supervision/unblock/notice/detail.vue`、`HeadTitle/index.vue`、及用款申请 `supervision/unblock/usemoney/detail.vue`（待确认是否同改）
- 所属项目：苏州市房地产监测V3；来源会话ID：3c831a48-2bc2-48ac-be0d-7c70f13319c0；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unblock_notice_detail_mod",
  "source_extraction_id": "8b8445b83fa44410a50f1a1c49887871",
  "version": 1,
  "memory_type": "entities"
}
-->