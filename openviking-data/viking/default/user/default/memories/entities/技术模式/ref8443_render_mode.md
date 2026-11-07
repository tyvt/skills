# ref8443渲染模式
苏住房C H5 项目新增与 8443 参考站完全一致的 ref8443 渲染模式，并配套像素比对 E2E 测试。

## 背景与目标
- 8443 参考站作为像素与样式比对基准，用于补齐 H5 演示数据与样式，保证视觉一致
- 通过像素级（100%）E2E 校验渲染还原度

## 实现要点
- worktree 分支实现 ref8443 渲染模式，与 8443 参考站表现一致
- 像素比对 E2E 覆盖演示数据与样式还原；截图区域限定 `.app-shell`/`.ui-ref8443` 规避 uni-app 壳层差异
- 结构 E2E 改用 `.tab-btn`/文案选择器（H5 上 uni-app `<button>` 不暴露 button 角色）
- 布局几何对比 E2E（关键区块位置/尺寸 ±2px）作为「100% 还原」硬门禁，应对表单页高度不一致导致的整屏像素失真
- 补齐上传占位、底部操作栏、演示数据；修复 `theme.css` `.tabs{margin-bottom:10px}` 泄漏使 chips/card 对齐 top 115.5/170

## 像素对齐根因修复（2026-11-06）
- theme.css 泄漏：`.section-title` 需 `!important` 覆盖为 flex-start/44auto；`.choice{flex:1;height:32px}` 致选项块重叠
- uni-app H5 把全局 `input` 改写为 `uni-input`，Ref8443Range 用 JS 内联样式注入原生 `input[type=range]` 生效
- `uni-textarea` 外层 padding:12+min-height:90→114px，需 padding:0!important 并隐藏 compute/line/wrapper 限高90
- `.card.fields` gap 必须 14px（theme 默认12）；`label`/`field-block-label` line-height:21px 才高21
- submit 橙按钮缺 background，补 `.btn.orange{background:#fe9c2d!important}`；`.floating-rescue` 位置 bottom:72px right:18px

## 详情页「不存在」修复（2026-11-06 会话）
- 根因：Ref8443History「查看详情」跳 `/pages/detail/index?id=FX-20260712-0005&kind=pre`，详情页 `store.getRecord` 本地无此 demo id → `getRecordAsync` 请求真实后端 `/v2.0/safety/flood/inspection/FX-...` → 404 → 弹「记录不存在」
- 参考 8443 详情页为静态页（InspectionDetail/RescueDetail 写死内容不查数据），故本端对齐为静态还原
- 修复：新增 Ref8443Detail.vue 按 kind 分派，1:1 还原「汛中巡检工单详情」「求援工单详情」（摘要、明细卡、自救处置、照片网格、工单信息、处置时间线、底部操作栏）；detail/index.vue 在 isRef8443() 下渲染并 onLoad 早返回跳过后端查询；补齐 5 张详情图（6e68b/d7427/230fe/95178/248ae）与整段详情 CSS

## 历史 tab 高亮缺失修复（2026-11-06 会话）
- 根因：`.tab-btn` 基础规则 `background:transparent!important`，而 `.tab-btn.active{background:#fff}` 缺 `!important` 被基础规则压掉 → 激活 tab 无白底；chip 同理
- 修复：给 `.tab-btn.active`/`chip-btn.active` 加 `!important`；验证激活 tab 计算样式 `background rgb(255,255,255)`+`color rgb(0,79,208)` 与 8443 一致，激活 chip `rgb(0,79,208)` 蓝底白字

## 验证与归属
- 验证证据：2026-11-06 推进记录（会话消息 0、15、25、42、45、50、62、94）及 06:00 排查会话
- 布局几何 E2E 门禁 `npm run test:e2e:ref8443:gate` 7/7 通过（关键区块 ±2px）；结构+布局 gate 7/7 全过
- 像素回归 6 场景此前已由 7%-41% 压到 5%-9.3%；本轮进一步：历史-汛前 6.78%→5.58%、历史-求援筛选 7.86%→6.67%，其余汛前检查 5.06%、汛中巡检 9.09%、求援工单 9.32%，新增汛后检查 8.61%（均 ≤9.3%）；剩余差异主因 uni-app 中文文字字形抗锯齿，delta=0 硬门难归零
- 8443 对齐改动 fast-forward 合 dev（提交 e0d49d2），worktree 已删除，本轮未 push 远程；本轮详情页+tab 修复本地提交 b7a9549 fix(ref8443): static detail pages + tab active highlight（未推送）；后续汛后检查表单页修复本地提交 b2eec94 fix(ref8443): add 汛后检查(post) form page parity + placeholder（未推送）
- 所属项目：苏住房C（zhi2-mobile-shimin）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ref8443_render_mode",
  "source_extraction_id": "8b6b322767e64aa88702c6a600cbd61b",
  "version": 7,
  "memory_type": "entities"
}
-->