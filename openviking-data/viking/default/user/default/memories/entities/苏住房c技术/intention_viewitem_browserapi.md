# 小程序列表复用详情方法误用浏览器API致ReferenceError
苏住房C（uni-app mp-weixin）在 pages_transaction/intention 的 list.vue 与 my.vue 共用 viewItem 时，因误用 sessionStorage/window 等浏览器API，点击「联系方式」抛 ReferenceError 致跳转失效。

## 问题现象
- 点击「联系方式」调用 viewItem 时微信开发者工具报 `ReferenceError: sessionStorage is not defined`，栈指向 my.js 的 viewItem，跳转详情完全失效
- 错误仅在运行时点击暴露，编译期与预览首页不报，易被当成偶发
- 同文件 editItem 已正确用 `uni.setStorageSync`，viewItem 却是浏览器写法，两套并存只坏一条路径

## 根因
- uni-app 编译到 mp-weixin 后代码跑在小程序 appservice，没有 `window`、`sessionStorage`、`localStorage`、`document`
- 项目里同源复制自 Web 后台的代码片段（尤其列表项→详情页传参）被直接搬过来

## 解决方案
- 小程序端存储一律 `uni.setStorageSync/getStorageSync`，禁止 `sessionStorage/localStorage`
- 读侧加空值兜底：`JSON.parse(uni.getStorageSync(key) || '{}')`，避免首次无缓存 JSON.parse(undefined) 再抛错盖住根因
- 排查顺序：同页面 grep `sessionStorage|localStorage|window\.|document\.`，Web 后台复制来的页面/方法优先怀疑
- 列表页与详情页共用方法时（list 复用 my.vue），改一处要检查另一处是否也有同样浏览器 API

## 验证与归属
- 会话 f3006cc6：报错 ReferenceError at viewItem (appservice/my.js)，根因为 list 复用 my.vue 的 viewItem 误用浏览器 API
- 修复为 my.vue 的 viewItem 改 uni.setStorageSync（与同文件 editItem 一致），detail.vue 改 uni.getStorageSync 并加 `|| '{}'` 防解析报错
- 涉及文件：src/pages_transaction/intention/my.vue、detail.vue、list.vue；所属项目：苏住房C；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "intention_viewitem_browserapi",
  "source_extraction_id": "f9c3a7f4992547a18e59f7352998fcc3",
  "version": 1,
  "memory_type": "entities"
}
-->