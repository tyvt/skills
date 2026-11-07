# 灵犀投票H5WebView白名单拦截缺陷
业主决策外链（灵犀H5Vote含Base64 query）在H5内打开报「该链接不在允许访问的域名范围内」。

## 问题根因
- webViewUrl.js的isHostInWebViewWhitelist校验主机名
- wxzj.wxwgzx.com未写入VITE_WEBVIEW_ALLOW_HOSTS且各环境变量为空时所有外链被拦
- 报错来自本方白名单，与灵犀服务器响应头无关

## 解决方案
- 在.env.development/.env.production/.env.test加入wxzj.wxwgzx.com
- 改env后必须重启dev server
- 走小程序原生h5ExternalWebview还需在微信公众平台配置该业务域名

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话406654b6用户投票URL被拦截
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/webViewUrl.js、.env.production
- 所属项目：无锡市区小程序嵌入H5；来源会话：406654b6-603a-41e0-9bc2-ae70c13fbcbd；代码基线：7de00b1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "lingxi_whitelist_block",
  "source_extraction_id": "adced483888e4affbfd1ba77e6e3ce85",
  "version": 1,
  "memory_type": "entities"
}
-->