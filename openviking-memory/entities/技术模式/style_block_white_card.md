# 详情页纵向分块白卡片样式补齐
苏州市房地产监测V3 中预售许可、机构注册审核等详情页按「纵向分块 + 16px 间距 + 白卡片」补齐样式。

## 问题根因
- 预售/现售 `presale-detail-section-stack` 内 `permit-info-panel`、`cashsale-info-panel` 的 Headline 嵌套在面板内，基本信息块标题区与内容区 padding 未对齐
- 备案后 `permit-tabs--meta` 缺少与下方区块一致的外边框，与页面灰底混在一起
- 楼幢区外层白卡片内层 Tab 再套卡片导致双层边框，且 `margin-top:8px` 与 stack 的 `gap` 不一致
- 机构注册审核详情多个 Headline 直接挂在 `detail-from-container` 下，未走统一 section-stack，无独立白卡片分区

## 修改内容
- `src/styles/index.scss`：info 面板补全 header/content padding；备案 Tab 加边框圆角；楼幢区内层 Tab 去重复外框
- `institutionRegister/detail.vue`、`PresaleBuildingSection.vue` 调整区块结构对齐统一样式

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`src/styles/index.scss`、`institutionRegister/detail.vue`、`PresaleBuildingSection.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：1e2e1648-2f90-4501-a2b6-10925eeb1b2f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "style_block_white_card",
  "source_extraction_id": "b4d7c66a115e439a926be64696a6d02d",
  "version": 1,
  "memory_type": "entities"
}
-->