# 主包WXSS样式泄漏正则修复
苏住房C(zhi2-mobile-shimin)因 uni.scss 添加 min-height:100% 导致 prune-component-wxss-leak.mjs 正则匹配失败，主包超限，已修复正则。

## 问题根因
- 在 `uni.scss` 给 `.page-wrapper`、`.page` 等加 `min-height:100%`，编译后组件 wxss 末尾 marker 变为 `{width:100%;min-height:100%;box-sizing:border-box}`
- `scripts/prune-component-wxss-leak.mjs` 的 `LEAK_END` 正则仍匹配旧格式 `{width:100%;box-sizing:border-box}`，匹配失败
- 32 个主包组件各自重复注入约 8KB 全局样式（合计约 258KB），主包上传预估从 1793KB 涨到 2094.8KB，超 2048KB 限制

## 修复内容
- 更新 `LEAK_END` 正则使 `min-height:100%` 为可选：`{width:100%;(?:min-height:100%;)?box-sizing:border-box}`
- 构建后主包大小恢复达标

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`uni.scss`、`scripts/prune-component-wxss-leak.mjs`、`scripts/validate-dist.mjs`、`src/pages_my/verification/TypeChoose.vue`、`package.json`、`src/pages.js`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：fc94b08c-d7f0-4ffe-9070-050d77fd5bb1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "wxss_leak_fix",
  "source_extraction_id": "3bad886309d54823969374dcd2916583",
  "version": 1,
  "memory_type": "entities"
}
-->