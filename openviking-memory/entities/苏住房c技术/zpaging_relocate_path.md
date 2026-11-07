# relocate-z-paging 复制后未更新依赖路径
苏住房C(zhi2-mobile-shimin)的 relocate-z-paging.mjs 脚本复制 z-paging 到分包后未修正其 require 路径，导致指向分包内不存在的文件而报错。

## 问题根因
- relocate-z-paging.mjs 复制 z-paging 到分包后未更新其 require('../.../common/vendor.js') 路径
- 错误指向分包内不存在的文件，运行时加载失败

## 修复做法
- 更新 scripts/relocate-z-paging.mjs，复制后遍历分包内 z-paging 的 .js 文件
- 动态修正 common/vendor.js 的 require 路径为主包路径
- 支持对已构建产物重新修补

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 498170bd 用户反馈 z-paging 跨分包加载异常，agent 修正脚本路径修补逻辑
- 涉及文件：src/pages.json、package.json、scripts/relocate-z-paging.mjs、scripts/relocate-datetime-picker.mjs、scripts/validate-dist.mjs、dist/pages_transaction/node-modules/z-paging/components/z-paging/z-paging.js、dist/pages_transaction/components/ZsPaging/ZsPaging.js、scripts/merge-main-leaks.mjs
- 验证证据：src=苏住房C/043.md；来源会话ID：498170bd-f084-43ab-8e01-034612613ebd；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zpaging_relocate_path",
  "source_extraction_id": "2c47098b9b9847d2b91828f0ccce3081",
  "version": 1,
  "memory_type": "entities"
}
-->