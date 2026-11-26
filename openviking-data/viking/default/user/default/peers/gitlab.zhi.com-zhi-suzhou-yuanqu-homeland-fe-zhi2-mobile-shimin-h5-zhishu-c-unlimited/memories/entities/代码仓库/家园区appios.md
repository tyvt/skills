# 家园区appios
家园区appios（MatroBBC）是用户参考的 iOS 仓库，业主决策功能通过 WKWebView 承载的 H5 提供。
## 描述
- 用户引用的仓库路径为 D:\repository\家园区appios。
- 仓库内 .m/.h 源码均为 UTF-8。
- 业务代码中没有发现原生决策或投票逻辑。
## 业主决策入口
- “业主决策”出现在 menu.json:192 和 Common/menus.json:987。
- 对应菜单项为 url: "3_0_0" 加图标素材。
- 未发现与业主决策对应的原生页面或接口实现。
- iOS 端后端接口与当前 H5 同属 /version/1/app/* 链路。
## 核查限制
- 该仓库不包含内嵌 H5 源码，无法直接证实 H5 文案逻辑是否一致。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited",
  "category": "代码仓库",
  "name": "家园区appios",
  "source_extraction_id": "2fa7e4471f7b42978f85c124b9720f21",
  "version": 1,
  "memory_type": "entities"
}
-->