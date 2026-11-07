# 主包白名单误加图致上传预估超限
苏住房C小程序主包磁盘未超但上传预估(source size)超2048KB，因 mainStaticPaths 白名单误加回分包已有大图。

## 问题现象
- npm run build 失败，主包磁盘 1790.9KB(<2048KB) 但上传预估 2095.4KB 超限约47KB
- 超出量等于误加回白名单的两图：images/empty.png(19KB) 与 images/bg_szf.png(28KB)

## 根因
- 两图本应留各分包 static（已有 migrate-main-empty-static.mjs 迁移逻辑），却被加回 mainStaticPaths.js
- prune-main-static.mjs 构建时保留它们在主包；判定口径是上传预估非磁盘体积

## 解决方案
- 从 mainStaticPaths.js 移除这两项；bg_szf.png 迁到 pages_vote/static/images/
- 在 utils/index.js 的 SUBPACKAGE_STATIC_IMAGES 注册该图走分包路径解析；删主包副本
- 重新构建核对磁盘与上传预估两行都 ok；主包余量仅约7KB，后续加大图优先放分包 static
- 体积统计用 scripts/size-main-package.mjs 看「磁盘+上传预估」两个数

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 60972d80 构建日志磁盘1790.9KB/2048KB、上传预估2095.4KB/2048KB；修复后 MAIN 磁盘1744.4KB ok、上传预估2040.9KB ok、[validate-dist] ok
- 涉及文件：zhi2-mobile-shimin/src/utils/mainStaticPaths.js、scripts/prune-main-static.mjs、scripts/size-main-package.mjs、src/utils/index.js
- 所属项目：苏住房C；来源会话ID：60972d80-2ade-40e7-a35c-5daa665ecffd；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "whitelist_img_size",
  "source_extraction_id": "a54db745c05a4f788c392edfc908a8f7",
  "version": 1,
  "memory_type": "entities"
}
-->