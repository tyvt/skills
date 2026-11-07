# 泰兴小程序主包体积测量报告
泰兴小程序主包构建产物体积未超 2048KB 限额，dev 与 build 差异源于过期 dev 产物及 vendor/static 体积不同。

## 测量结论
- `dist/build/mp-weixin` 主包 9 页（与 `src/pages.json` 一致），体积 1901.7 KB，低于限额 146.3 KB。
- `dist/dev/mp-weixin` 主包 3 页（过期，缺 login + 5 个 staff 页），体积 1876.9 KB，低于限额 171.1 KB。
- 报告的 2051 KB > 2048 KB 与当前 `dist/build` 有约 149 KB 差距。

## 差异原因
- 使用了 dev 编译产物或未完整 rebuild：dev 的 `vendor.js` 为 902 KB（build 仅 453 KB），dev 的 `static/` 为 317 KB / 178 文件（build 仅 91 KB / 39 文件）。
- `dist/dev` 已过期：`app.json` 只有 3 个主包页，源码 `pages.json` 已有 9 个。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：`src/pages.js`、`vendor.js`、`app.js` 等。
- 来源会话ID：5a1f78af-e1da-490b-b9a5-cb8ff88db9ce

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "main_pkg_size_report",
  "source_extraction_id": "f14ea4addc6543e1b47221f41498e9f0",
  "version": 1,
  "memory_type": "entities"
}
-->