# index.html脚本绝对路径注入
zhi2-mobile-shimin的index.html脚本须按location.pathname计算资源根再用绝对路径，避免无尾斜杠入口404。
## 问题现象
- 微信/支付宝WebView内index.html第19-22行四个加密脚本加载失败，苏服办App内正常
- 脚本提供window.Hex/window.SM3Digest/window.CryptoJS，是网关SM3签名与业务接口签名必需
## 根因
- 原相对路径./static/js/...按当前页面URL解析；无尾斜杠入口https://域名/szffluzm被解析到https://域名/static/js/...少了/szffluzm段
- 苏服办WebView入口带尾斜杠故正常，表现为部分容器正常
## 解决方案
- index.html根据location.pathname计算资源根（兼容有/无尾斜杠、带index.html三种），以绝对路径注入脚本
- 保证/szffluzm、/szffluzm/、/szffluzm/index.html均解析到/szffluzm/static/js/...
- H5内嵌App/公众号时禁止任何相对资源路径
## 验证与归属
- 所属项目：苏住房C；来源会话ID：43c2d24d-9340-4131-a043-2b0f220ba0b9；代码基线：77666f8
- 涉及文件：index.html、szffluzm/index.html、src/static/js/sign.js、vite.config.ts

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "index_html_script_path",
  "source_extraction_id": "81d7f40afe12428c8e47232291933096",
  "version": 1,
  "memory_type": "entities"
}
-->