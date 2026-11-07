# 预售详情页布局边框修复
苏州市房地产监测V3 项目修复了预售许可详情页基本信息 Tab 左侧只读网格外框被误删的问题，改动在 `index.scss`。

## 修复内容
- 原在 `index.scss` 将 Tab 内 `.detail-template` 设 `border:none` 导致外框丢失，现仅保留 `margin-bottom:0`
- 备案后 Tab「基本信息」左侧只读网格恢复 `DetailTemplate` 默认 1px `#f0f0f0` 外框（圆角 4px）
- 不再去掉边框，避免 Headline 叠层顶缝问题

## 可选扩展
- 若需外框圆角与右侧「预售方案」一致（8px），可在 `PermitInfoPanel` 加局部样式

## 归属信息
- 所属项目：苏州市房地产监测V3
- 来源会话：93be20d8-831b-48da-b8df-1a5b31730ca5
- 涉及文件：`index.scss`、`PermitInfoPanel.vue`、`presale/permit/detail.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_border_fix",
  "source_extraction_id": "8ac21a9135c44085aa6571c2f9166d98",
  "version": 1,
  "memory_type": "entities"
}
-->
