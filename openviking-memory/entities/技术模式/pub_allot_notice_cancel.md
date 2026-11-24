# 资金拨付通知作废接口（pubAllotNotice cancel）
禅道 bug 6950：资金拨付作废请求方式由 GET 改为 POST，接口为 /v2.0/benefit/pubAllotNotice/cancel/{id}。

## 接口与代码
- 作废请求：POST /v2.0/benefit/pubAllotNotice/cancel/{id}；旧实现 toVoid() 用 GET，生产报「不支持 GET」
- 代码位置：zhi2-web-admin 资金拨付详情 detail.vue:1195 已为 `method:'post'`（2026-11-24 只读核验确认，交接文档记录滞后）
- 列表接口：GET /api/v2.0/benefit/pubAllotNotice/page（实测共 48 条）
- 菜单与路由由后端 getRouters 动态生成，dist 内无静态路由可搜

## 业务条件
- 作废按钮仅在详情页显示，条件为 `tradeStateCode != '0000'` 且 `!= null`
- 典型可作废单据：id 2123239254058409985，tradeStateCode=9999（即禅道 bug 中的那条）

## 验收与流程
- 验收标准：作废成功无「不支持 GET」报错 + 代码提交推送 + 禅道 6950 回写附图 + 前端验证门走完
- 前端验证门：本地 8119 打开可作废单据→执行作废→抓 POST 请求→截图自检→present 内嵌→用户确认
- 截至 2026-11-24 尚未提交与禅道回写（遵守验证门，未验证不放行）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_allot_notice_cancel",
  "source_extraction_id": "355e7d99a2df4ccc9f923ed313d97321",
  "version": 1,
  "memory_type": "entities"
}
-->