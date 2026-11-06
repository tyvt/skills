# 注册页主标题与分区标题对齐修复
苏州市房地产监测V3 项目调整注册页 `RegisterPageHeader` 对齐逻辑，使主标题与分区标题文字左缘一致。

## 修改原因
- 版心不一致：banner 内层曾为 `max-width: 1200px`，表单区为 `1400px`，宽屏下标题偏右
- 与分区标题对齐：分区标题文字有 `padding-left: 12px`（蓝条在更左侧），主标题也加相同 `12px`

## 改动内容
- `RegisterPageHeader` 使用与 `register-wrap` 相同的 CSS 变量：`--register-content-max-width`、`--register-page-padding`（含移动端 16px），三种注册页一起对齐

## 涉及文件
- `src/router/index.js`、`src/views/register/companyRegister.vue`、`src/views/institutionRegister/index.vue`、`src/views/leaseInstitutionRegister/index.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：d258d735-cf1c-4ea1-b3c3-bf1f9a80262c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_header_align_fix",
  "source_extraction_id": "ad219bd3153445a1967d7e62570af761",
  "version": 1,
  "memory_type": "entities"
}
-->