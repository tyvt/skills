# ref8443详情页与tab高亮修复
苏住房C H5 ref8443 构建的详情页「不存在」与历史 tab 高亮缺失修复（2026-11-06）。

## 详情页「不存在」修复
- 根因：Ref8443History「查看详情」跳 `/pages/detail/index?id=FX-20260712-0005&kind=pre`，详情页 `store.getRecord` 本地无此 demo id → `getRecordAsync` 请求真实后端 `/v2.0/safety/flood/inspection/FX-...` → 404 → 弹「记录不存在」
- 参考 8443 详情页为静态页（InspectionDetail/RescueDetail 写死内容不查数据），故本端对齐为静态还原
- 修复：新增 Ref8443Detail.vue 按 kind 分派，1:1 还原「汛中巡检工单详情」「求援工单详情」（摘要、明细卡、自救处置、照片网格、工单信息、处置时间线、底部操作栏）；detail/index.vue 在 isRef8443() 下渲染并 onLoad 早返回跳过后端查询；补齐 5 张详情图（6e68b/d7427/230fe/95178/248ae）与整段详情 CSS

## 历史 tab 高亮缺失修复
- 根因：`.tab-btn` 基础规则 `background:transparent!important`，而 `.tab-btn.active{background:#fff}` 缺 `!important` 被基础规则压掉 → 激活 tab 无白底；chip 同理
- 修复：给 `.tab-btn.active`/`chip-btn.active` 加 `!important`；验证激活 tab 计算样式 `background rgb(255,255,255)`+`color rgb(0,79,208)` 与 8443 一致，激活 chip `rgb(0,79,208)` 蓝底白字

## 验证与归属
- 验证证据：2026-11-06 推进记录（会话消息 0、15、25、42、45、50、62、94）及 06:00 排查会话
- 本地提交 b7a9549 fix(ref8443): static detail pages + tab active highlight（未推送）
- 所属项目：苏住房C（zhi2-mobile-shimin）


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_detail_tab_fix",
  "source_extraction_id": "e6976f4e59f24b80b343c3ab24a61785",
  "version": 1,
  "memory_type": "entities"
}
-->