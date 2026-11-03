# 嵌 web-view 的 H5 轮播/静态资源绝对路径约定
无锡市区小程序嵌入H5中接口返回的媒体路径须拼发布前缀绝对路径，禁止 ./ 相对当前路由的约定。

## 现象
- banner 接口返回 pictureUrl 如 /zhi2/2026/.../xxx.jpg，前端拼成 ./sfb/zhi2/... 或裸相对路径后，在 /szh5/pages/webview/home 等页面被解析为 /szh5/pages/webview/sfb/zhi2/...（路由污染），图片 404。

## 根因
- SPA 内相对 URL 相对的是当前 pathname，不是静态资源根。

## 做法
- 用 VITE_APP_H5_PUBLIC_BASE（与 manifest h5.router.base 一致，如 /szh5）得到 getH5PublicBase()。
- 媒体路径统一为绝对路径：raw 以 /sfb/ 开头则保留，否则 `/sfb${raw}`，再 `${getH5PublicBase()}${mediaPath}`，最终形如 https://host/szh5/sfb/zhi2/...。
- 不要用「仅相对站点」的 ./sfb 指望在所有路由下正确。

## 验证与归属
- 验证会话：47414239-c758-44c5-b55e-6c30c3687109（基线 6c9a164），用户反馈图片 URL 含 pages/webview 路由段，结论说明 ./sfb 相对当前页解析错误，改为 getH5PublicBase() + /sfb 前缀绝对路径。
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/zhishuAsset.js、src/hooks/usePortal.js、.env.production、src/manifest.json。
- 所属项目：无锡市区小程序嵌入H5。

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "webview_asset_abs_path",
  "source_extraction_id": "a7ccb2bad8e148e3977562a553bc29a0",
  "version": 1,
  "memory_type": "entities"
}
-->