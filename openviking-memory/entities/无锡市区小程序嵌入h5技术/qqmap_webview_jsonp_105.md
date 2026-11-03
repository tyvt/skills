# 小程序 web-view 内腾讯地点搜索 JSONP 报 105 修复
无锡市区小程序嵌入H5中 H5 被微信小程序 web-view 打开时腾讯地点搜索 JSONP 稳定 105 的修复约定。

## 现象
- 浏览器用 apis.map.qq.com 直链 nearby 返回 status:0，但 web-view 内走 JSONP 稳定 105。
- 旧代码 nearby 失败降级 region(adcode) 同样 105，表现「Key/额度/域名都配了仍无周边」。

## 根因
- web-view 里 JSONP 鉴权链路与浏览器直链不等价，不能拿直链成功反证前端 Key 配置无误。

## 解决方案
- 去掉 region 降级，边界策略与联调通过的 nearby 保持一致。
- H5 改请求同源路径 /qqmap/...，用 uni.request + output=json（开发 vite 配 proxy，生产 nginx location /qqmap/ { proxy_pass https://apis.map.qq.com/; proxy_set_header Host apis.map.qq.com; }）。
- 部署后用 https://{H5域名}/qqmap/ws/place/v1/search?... 自测 status:0，再在 web-view 强刷验证日志不再出现 region(adcode) 与 JSONP 降级。

## 验证与归属
- 验证会话：ba685907-d68a-4e81-8abb-1388fb268339（基线 5241320），用户验证 nearby 直链 Success、web-view 内 JSONP 105，结论写明 nearby 失败→region(320513) 二次 105，修复为固定 nearby + /qqmap 代理 + uni.request JSON。
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/index.js、src/utils/qqMapKey.js、src/pages_owner/project/info/index.vue、vite.config.ts。
- 所属项目：无锡市区小程序嵌入H5。

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "qqmap_webview_jsonp_105",
  "source_extraction_id": "a7ccb2bad8e148e3977562a553bc29a0",
  "version": 1,
  "memory_type": "entities"
}
-->