# 主包体积超限修复
苏住房C小程序主包上传预估从2110.8KB降到1798.4KB（限制2048KB），已修复。

## 问题原因
- `uni.scss` 新增页面容器类（`.container`、`.success-page` 等）并把 `min-height:100%` 改为 `min-height:inherit`
- 构建后脚本 `prune-component-wxss-leak.mjs` 的 `LEAK_END` 正则仍旧，匹配失败，32个组件各泄漏约8.3KB合计267KB

## 修复内容
- 更新 `scripts/prune-component-wxss-leak.mjs` 正则，兼容新增页面类与 `min-height:inherit` 及旧 `min-height:100%`
- 效果：components 431.6KB→164.6KB，MAIN磁盘1804.1KB→1537.1KB，MAIN上传预估2110.8KB(OVER)→1798.4KB

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`uni.scss`、`scripts/size-main-package.mjs`、`src/pages.js`
- 来源会话ID：ec247072-d32c-44f5-838a-cfbdfe935169
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "main_package_size_fix",
  "source_extraction_id": "f112774c505640e3b6c48d36ad3aaf81",
  "version": 1,
  "memory_type": "entities"
}
-->