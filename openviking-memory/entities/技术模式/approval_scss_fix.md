# 产品2.0通用审批流SCSS变量编译失败修复
产品2.0迁移的审批流程组件因使用未注入的SCSS变量导致详情页无法进入，已修复。

## 问题根因
- 迁移的审批流程组件 `showApprovalHeader.vue` 中使用了未注入的 SCSS 变量 `$--color-primary`
- 编译失败导致详情页进不去

## 修复内容
- `showApprovalHeader.vue`：`$--color-primary` → `var(--primary-color)`
- `showApproval.vue`：`rgba($--color-primary, 0.4)` → `rgba(var(--primary-color-rgb), 0.4)`（与项目其他组件一致）
- `showApprovalHeader.vue`：图片路径改为 `/assets/images/icon-flow.png`（修复构建时资源解析失败）

## 验证与归属
- 本地构建已通过，需刷新后进入详情页验证
- 涉及文件：`showApprovalHeader.vue`、`showApproval.vue`、`commercialHousingSales/priceFiling/recordPriceMngSuzhou/detail.vue`
- 所属项目：产品2.0；来源会话ID：0e3dadb0-95af-45c8-ad5c-3b978035c651
- 验证证据：extracted source=cursor project=产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_scss_fix",
  "source_extraction_id": "b12861a579a6400884413657f5f2a484",
  "version": 1,
  "memory_type": "entities"
}
-->