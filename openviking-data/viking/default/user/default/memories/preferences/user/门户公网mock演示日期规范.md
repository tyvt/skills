- 公网门户（`publicPortal/mock` 及少量页面内联 mock）若需让列表/公示时间「看起来是当前」，只改用户可见的演示日期（公告时间、信用公示、合同编号前缀、备案日期、建成/抵押展示等）到 2026，并同步 README 说明。
- 不要动非展示语义的年份：预售/证件到期仍可 2027/2028；「2016 版商品房买卖合同」等法规范本 PDF/菜单文案保持原规范年份。
- 接口公告失败时首页会回退 `publicNotices` 等 mock，改 mock 后应确认回退列表时间一致。
- 验证来源：会话 5a79e058 用户要求「首页 mock 数据的日期时间都改为 2026 年」，改 notices/rental/brokers、InformationPages、PropertyDetailDialog、README，明确未改 2017/2018 证件到期与 2016 版合同文案；涉及 zhi2-web-admin/src/views/home/publicPortal 下 mock 与组件及 README.md；所属项目门户；代码基线 dfee5a6。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "门户公网mock演示日期规范",
  "source_extraction_id": "731ed82de4844f9c8dc4884c40a5bb81",
  "version": 1,
  "memory_type": "preferences"
}
-->