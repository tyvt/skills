# 苏服办H5内联样式相对路径图片不显示
苏住房C市民端H5部署到苏服办后，内联 :style 写的相对路径背景图整块不显示，根因是内联样式绕过 Vite 构建且 H5 base 为 './'。

## 问题现象
- 同一套代码微信小程序图标正常，苏服办 H5 页面图标整块不显示（如 pages_owner/repair/add.vue 报修/报事分类背景图标）
- 易被误判成「苏服办没加载资源」

## 根因
- 图标通过内联 :style 拼背景图写相对路径 url('../../static/images/icon-repair-xxx.png')
- 内联样式里的字符串不经过 Vite 的 CSS 资源处理，相对路径不会被改写成带 hash/正确前缀的产物地址
- H5 生产构建 base 为 './'，页面 URL 与文件系统层级不一致，'../../static/...' 在 WebView 里解析到错误位置
- 小程序端因相对目录结构恰好对上，问题只在 H5 暴露

## 解决方案
- 任何用 JS 拼静态资源 URL 的地方（内联 style、:src、背景图）都不要写相对路径，统一走项目已有的 resolveStaticUrl
- resolveStaticUrl 按 import.meta.env.BASE_URL 生成正确地址（首页菜单、随手拍列表等页面已在用）
- 排查时在浏览器开发者工具看图片请求 URL 是否变成 ./static/images/icon-xxx.png 即可确认

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 80e004b0 用户报「这个页面的图片在苏服办里面没法正常显示」，定位 add.vue 内联 :style 写死相对路径，改用 resolveStaticUrl(`images/icon-${prefix}-${icon}.png`) 后重新打包部署正常
- 涉及文件：src/pages_owner/repair/add.vue、vite.config.ts、src/utils/index.js
- 所属项目：苏住房C；来源会话ID：80e004b0-7fee-4cde-af50-62f07a822d3a；代码基线：e04432d

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "h5_inline_style_static",
  "source_extraction_id": "ff4e295f73a04f89870b32c194302e72",
  "version": 1,
  "memory_type": "entities"
}
-->