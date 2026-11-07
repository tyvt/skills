# 预售许可申请页基本信息Headline化
苏州市房地产监测V3 的 zhi2-web-admin 中将预售许可申请页「基本信息」改为与其他分区一致的 Headline 展示。

## 改动内容
- `PermitInfoPanel.vue` 始终使用 `<Headline class="basic-info-section" title-text="基本信息">` 包裹表单/查看模板
- 去掉 `hideHeadline` 及原先的 `border-only`、无标题边框逻辑
- `detail.vue` 去掉仅含一个 Tab 的 `zs-tabs`（之前用卡片 Tab 当标题，样式不一致）
- 删除已无用的 `basicInfoTab`、`basicInfoTabList` 及相关样式，两处 `permit-info-panel` 不再传 `hide-headline`

## 涉及文件
- `zhi2-web-admin/src/views/presale/permit/components/PermitInfoPanel.vue`
- `zhi2-web-admin/src/views/presale/permit/detail.vue`
- `zhi2-web-admin/src/components/Headline/index.vue`

## 验证与归属
- 刷新申请/编辑页后，「基本信息」显示蓝色圆点标题，与「预售方案」分区一致
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：e6742834-ef8f-41c0-9875-0bc367ca292b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_basic_info_headline",
  "source_extraction_id": "1ee14cf9ddb149ff99b2da177d5a4b29",
  "version": 1,
  "memory_type": "entities"
}
-->