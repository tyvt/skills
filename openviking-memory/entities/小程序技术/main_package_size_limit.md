# 微信小程序主包源码体积上限2048KB
微信小程序主包源码体积硬上限为 2048KB，超限将触发编译或上传报错。

## 限制说明
- 主包源码超过 2048KB 时报错：main package source size XXXXKB exceed max limit 2048KB
- 验证：会话 aa2b122d 实际报错 main package source size 2053KB exceed max limit 2048KB

## 超限处理
- 拆分分包，将页面从主包迁移至 subPackages
- 压缩静态资源或移出非必要依赖
- 不能仅靠改写业务代码来规避体积限制

## 验证与归属
- 验证证据：005.md 会话 aa2b122d 报错记录
- 涉及文件：manifest.json
- 所属项目：小程序；来源会话ID：aa2b122d-243c-48b0-8db4-1b520bba1bf3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "main_package_size_limit",
  "source_extraction_id": "a6d4e30572d84a80a5b86aae629a08fc",
  "version": 1,
  "memory_type": "entities"
}
-->