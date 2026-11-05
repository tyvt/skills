# 苏服办内业主自治三方页面打不开
无锡市区小程序嵌入 H5 在苏服办轻应用 WebView 打开灵犀投票三方页失败的根因分析。

## 问题现象
- 苏服办内打开业主自治三方页面报错 `net::ERR_BLOCKED_BY_RESPONSE`
- 目标地址为 `https://wxzj.wxwgzx.com/lxapptp/H5Vote/?token=...`（灵犀投票系统 H5，非自研 `/szh5/`）

## 根本原因
- 灵犀投票站点返回 `X-Frame-Options: SAMEORIGIN` 与 `Content-Security-Policy: frame-ancestors 'self'`
- 苏服办以轻应用内置 WebView 跨域嵌入，被上述响应头直接拦截
- 与自研 H5 白名单（如 `.env.production` 中配置）无关

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：index.html、.env.production、src/store/app.js 等
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：c2d03879-fbdf-4092-8416-a9b7a9d79600；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sufuban_blocked_page",
  "source_extraction_id": "b17238a633cf40de87c63c276c47e01c",
  "version": 1,
  "memory_type": "entities"
}
-->