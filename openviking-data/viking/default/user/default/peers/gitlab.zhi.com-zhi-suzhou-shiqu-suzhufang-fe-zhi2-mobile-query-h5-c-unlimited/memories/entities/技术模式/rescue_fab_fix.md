# 紧急求救浮标上移避开底部按钮框修复
苏住房防汛C端移动查询H5中"紧急求救"悬浮按钮因 bottom 值过小而贴住底部固定操作栏的CSS修复（2026-11-10）。

## 问题根因
- 底部固定操作栏 `.action-bar` 高 88px（16px 内边距 + 56px 按钮）
- 浮标原 `bottom` 仅 72px（`Ref8443Inspection` 页）和 84px（`inspection` 页）
- ref8443 的 `!important` 规则把浮标压到 72px，正好落在"提交"按钮顶边，导致贴住甚至轻微压住按钮框

## 修复方案
- 三个出现位置统一抬到 `bottom:100px`
- `src/styles/ref8443.css`：`.floating-rescue` 强制规则 `72px → 100px`（实际生效那条）
- `src/styles/ref8443.css`：`.ui-ref8443 .floating-rescue` 兜底规则 `84px → 100px`
- `src/styles/theme.css`：`.rescue-fab` `84px → 100px`
- 涉及组件：`pages/inspection/index.vue`（`.rescue-fab`）、`components/flood/Ref8443Inspection.vue`（`.floating-rescue`）

## 部署与验证
- 提交 `5b735ed fix(flood): 紧急求救浮标上移避开底部按钮框`，仅含两个 CSS 文件，推送至 `origin/dev`
- 构建：`bun run build:h5`（即 `uni build --outDir ./dist`）完成
- nginx：`防汛C端.conf`（端口 8095）`root` 指向 `D:/repository/苏住房防汛C端/dist`，重建 dist 后 `nginx -s reload`
- 验证：`http://localhost:8095` 返回 200，重建 CSS 含三个 `bottom:100px` 规则，原 `72px/84px` 无残留（仅 `.form-alert` 的 `84px` 有意保留）

## 验证与归属
- 验证证据：2026-11-10 会话消息 0-66（Lead 提出，助手修复并部署）
- 所属项目：苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c-unlimited）

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "rescue_fab_fix",
  "source_extraction_id": "4d35ba325a4c40cface2568976c41f52",
  "version": 1,
  "memory_type": "entities"
}
-->