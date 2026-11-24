# 大屏报险详情卡 hover 与滚动修复
苏住房G 大屏「实时报险」列表行 hover 时由 LiveReportPanel 派发事件、父组件渲染 `.live-detail-card` 详情卡，并修复了卡片无法滚动的缺陷。

## 触发机制
- LiveReportPanel 组件行元素绑定 `@mouseenter="hover($event, item)"`，触发后 emit 给父组件，父组件 `onReportHover(payload)` 渲染 `.live-detail-card`
- 详情卡样式：display:block、pointer-events:auto、z-index:60；命中标题文字无效，需向上找到真正的行卡片（如 i=3，281×86，pointer 事件）

## 修复②实机验证结果
- hover「里双桥小区·处置中」行 → 详情卡正常弹出
- 卡片可滚：scrollHeight 534 > clientHeight 416，scrollTop 0→118 到底，卡片不消失
- 滚到底后第 8 条「电气配电室及线路漏电情况:进水受潮」与「现场填报人: 601005175」均 inView=true（卡片可视框 y 413-656 内）
- 修复①基准仍在：共 2 条报险、17:57:51=处置中、17:55:58=已解除；修复①无需重验

## 取证注意
- 大屏为锁定布局不可滚，取证需临时 zoom 缩放（用后还原，曾残留 zoom=1.6 需重置）
- 合成滚轮事件不触发浏览器默认滚动，只能用程序式 scrollTop 验证

## 归属
- 涉及文件/组件：LiveReportPanel 及其父组件；所属项目：苏住房G；禅道任务 6899
- 2026-11-24 验证通过并获用户确认，提交方式=提交并推送；随后恢复 nginx conf 为 dev（401=代理通）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "苏住房G技术修复",
  "name": "live_detail_card_hover",
  "source_extraction_id": "c48961d284834f84883e133aeb508277",
  "version": 1,
  "memory_type": "entities"
}
-->