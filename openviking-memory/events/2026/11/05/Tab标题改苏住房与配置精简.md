# Summary
苏住房C 将5个tab页标题改为“苏住房”，隐藏navbar，并按网关文档移除未用环境变量、将固定值改为代码默认，dispatcher.js 写死默认值。
# 2026-11-05 (Thursday) ChatLog:
**user**: 【记忆类型】fact
【标题】5个tab页标题都改为苏住房，隐藏所有页面navba
【内容】已按网关接口文档精简配置，变更如下： ### 移除的环境变量 | 参数 | 原因 | |------|------| | `VITE_APP_SFB_APP_KEY` | 文档未要求，代码未使用 | | `VITE_APP_SFB_APP_SECRET` | 文档未要求，代码未使用 | | `VITE_APP_SFB_VERSION` | 固定值 `1.0.0`，改为代码默认值 | | `VITE_APP_SFB_CHARSET` | 固定值 `UTF-8`，改为代码默认值 | | `VITE_APP_SFB_ORIGIN` | 固定值 `1`，改为代码默认值 | ### 保留的环境变量（需在开放平台申请） - `VITE_APP_USE_SFB_DISPATCHER` — 是否走网关 - `VITE_APP_SFB_APP_ID` — 应用标识 `app_id` - `VITE_APP_SFB_GET_INTERFACE_ID` — GET 网关 `interface_id` - `VITE_APP_SFB_POST_INTERFACE_ID` — POST 网关 `interface_id` `dispatcher.js` 中 `version`、`charset`、`origin` 已按文档示例写死为默认值；验签仍使用文档规定的 `app_id`、`interface_id`
【验证证据】extracted source=cursor project=苏住房C
【涉及文件】`dispatcher.js ; 涉及文件：d:/repository/苏住房C/zhi2-mobile-shimin、d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/home.vue、d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/project.vue、d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/property.vue、d:/repository/苏住房C/zhi2-mobile-shimin/src/pages/index/community.vue
【所属项目】苏住房C
【来源会话ID】0f1c6af9-9dca-4fad-8282-c48ebf2f048d
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "Tab标题改苏住房与配置精简",
  "goal": "记录配置变更",
  "summary": "苏住房C 将5个tab页标题改为“苏住房”，隐藏navbar，并按网关文档移除未用环境变量、将固定值改为代码默认，dispatcher.js 写死默认值。",
  "ranges": "0-4",
  "source_extraction_id": "2d3f203c03d84e25a3c003479966ebf2",
  "version": 1,
  "memory_type": "events"
}
-->