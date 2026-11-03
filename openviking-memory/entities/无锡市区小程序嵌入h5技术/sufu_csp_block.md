# 苏服办内嵌灵犀H5Vote CSP拦截缺陷
苏服办轻应用WebView直接打开wxzj.wxwgzx.com/lxapptp/H5Vote失败，控制台net::ERR_BLOCKED_BY_RESPONSE。

## 问题根因
- 灵犀站点返回X-Frame-Options: SAMEORIGIN与Content-Security-Policy: frame-ancestors 'self'
- 跨域嵌入被浏览器拦截
- 本方VITE_WEBVIEW_ALLOW_HOSTS只能放行己方H5内web-view跳转，无法改写灵犀响应头

## 解决方案
- 优先联系灵犀运维在H5Vote路径放宽frame-ancestors（含*.jszwfw.gov.cn等苏服办域）
- 苏服办侧用JSSDK openUrl + showMode: 'outer'或先进/szh5/再window.location.href顶层跳转，勿iframe/web-view嵌套
- 排查时区分「白名单拦截」与「frame-ancestors拦截」两种报错

## 验证与归属
- 验证证据：会话c2d03879苏服办打开业主自治三方页失败
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/.env.production、src/utils/webViewUrl.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：c2d03879-fbdf-4092-8416-a9b7a9d79600；代码基线：7de00b1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sufu_csp_block",
  "source_extraction_id": "adced483888e4affbfd1ba77e6e3ce85",
  "version": 1,
  "memory_type": "entities"
}
-->