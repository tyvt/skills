# 企业注销详情视图合并与告警澄清
苏州市房地产监测V3 的 zhi2-web-admin 澄清了 companyCancel/detail.vue 的 `[Vue warn]` 告警为热更新残留，代码已处于正确状态。

## 问题背景
- 重构中间态模板曾引用 `cancelAttachmentView`，后已合并进 `cancelInfoView` 并删除该计算属性
- 热更新可能只刷新脚本未刷新模板，导致 `[Vue warn]: Property or method` 告警

## 正确状态
- 磁盘上 `detail.vue` 模板已使用 `<DetailTemplate :data="cancelInfoView" />`
- `cancelInfoView` 计算属性已包含注销时间、注销原因和注销材料三项
- 涉及文件含 `companyCancel/detail.vue` 与 `components/detail-template/detail-template.vue`

## 验证与归属
- 验证：告警为误报，无需代码改动；如复现可强刷或重启 dev server
- 所属项目：苏州市房地产监测V3
- 涉及文件：`companyCancel/detail.vue`、`detail-template.vue`
- 来源会话ID：5848dd5d-26a2-4051-b9fd-06eacdc8eee0
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cancel_view_merge",
  "source_extraction_id": "4c5863872528481481ed07628faa9249",
  "version": 1,
  "memory_type": "entities"
}
-->