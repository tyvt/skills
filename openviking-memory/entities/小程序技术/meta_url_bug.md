# uni-app 小程序 import.meta.url 编译失败
uni-app 编译 mp-weixin 时页面 script 使用 import.meta.url 会触发 babel 编译失败，需分端处理静态资源解析。

## 问题根因
- 页面 `<script>` 内写 `new URL('../../static/...', import.meta.url).href`（常见于 resolveZhishuAsset）会在 babel 阶段报 `Module parse failed: Unexpected token`
- 报错链路含 babel-loader、webpack-uni-mp-loader，错误指向 `return new URL("./../static/images/zhishu/".concat(filePath), import.meta.url).href`
- 与 H5/Vite 不同：H5 可用 import.meta.url 解析静态资源，但小程序端编译链根本不支持该语法

## 解决方案
- 微信小程序端改用主包绝对路径 `/static/images/...`（或项目约定的 IMAGE_BASE 拼接），不要用 import.meta.url
- 若必须保留 H5 写法，用条件编译 `#ifdef H5` / `#ifndef MP-WEIXIN` 分端实现 resolveZhishuAsset
- 合并页面（如把 home 逻辑迁入 externalWebview）后优先检查 script 顶层是否仍含 import.meta 语法

## 验证与归属
- 验证证据：`Error: Module parse failed: Unexpected token (29:71)`
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue、static/images/zhishu/
- 所属项目：小程序；来源会话ID：b1d684d7-0aba-4f92-948d-241c1309f18c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "meta_url_bug",
  "source_extraction_id": "2b34d842ccf94a47b62d912a34a3a9c0",
  "version": 1,
  "memory_type": "entities"
}
-->