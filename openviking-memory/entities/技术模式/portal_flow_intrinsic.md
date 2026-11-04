# 门户首页流程区 intrinsic 宽度与横向滚动依赖
门户首页 `.home-new`/`.top-row` 使用 `width: max-content` 叠加流程区固定最小宽，会撑宽整页并依赖 layout 提供横向滚动。

## 触发条件
- `.top-row` 为 `width: max-content`
- `.flow-steps` 设 `flex-wrap: nowrap`、`flex-shrink: 0` 及 px/vw `min-width`
- 步骤不会在卡片内换行或压缩

## 关键约束
- `max-width: 100%` 无法压过 intrinsic 最小宽度
- 通常依赖 layout 上 `portal-home-layout` 提供横向滚动
- 路由未挂 `portal-home-layout` 时，内容可能被 `.card-body { overflow: hidden }` 裁切

## 业务现状与建议
- 业务中心已对 body 设 `overflow: visible`，仍可能顶破卡片视觉边界
- 改首页流程布局或 E2E 时应显式覆盖窄视口与 overflow 行为

## 验证与归属
- 验证证据：窄视口横向溢出为预期但需 `portal-home-layout`；`max-width: 100%` 挡不住 intrinsic 最小宽度
- 涉及文件：src/views/home/index-new.vue、src/layout/index.vue、tests/e2e/portal-home-visual.spec.ts
- 所属项目：门户；来源会话：0a743a90-328f-4c94-9f35-0f8b4f911423；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_flow_intrinsic",
  "source_extraction_id": "3f03ea727476499892bbe2ec8f798037",
  "version": 1,
  "memory_type": "entities"
}
-->