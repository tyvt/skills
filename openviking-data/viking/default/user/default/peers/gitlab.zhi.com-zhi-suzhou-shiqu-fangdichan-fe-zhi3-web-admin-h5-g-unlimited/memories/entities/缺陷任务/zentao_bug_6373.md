# 禅道Bug 6373 预览X关闭按钮无法关闭弹窗
zhi2-web-admin 中预览弹窗 X 关闭按钮点击无反应的缺陷任务，根因为 v-dialogDrag 指令吞掉关闭按钮 mousedown，已修复并推送 fix/bug-6373-preview-close。

## 根因与修复
- 根因：v-dialogDrag 指令把 onmousedown 挂在 .el-dialog__header 上，关闭按钮 .el-dialog__headerbtn 位于 header 内部，其 mousedown 冒泡到拖拽处理器导致 .el-dialog 被重定位，浏览器取消后续 click，handleClose/closePreview 不触发，showViewer 保持 true
- 影响：共享指令缺陷，影响所有 el-dialog/zs-dialog 调用方；zs-dialog 因 visible 为普通 data prop 正常关闭，仅 ImageViewer 因 :visible.sync 绑定 store computed 受影响
- 修复：zhi2-web-admin/src/directives/dialog/drag.js 头部 onmousedown 内加守卫 if (e.target.closest && e.target.closest('.el-dialog__headerbtn')) return，命中关闭按钮直接返回不重定位，保留其 click；头部拖拽与 resize 手柄不受影响

## 验证
- worktree 构建 → 部署临时 nginx 8099 → Playwright 复现脚本返回 {"click":1,"mousedownHeader":1,"mousedownTargetIsClose":1,"closed":true}（修复前 click:0/closed:false），确认关闭按钮 click 触发、预览关闭
- 验证后删临时站点并 reload nginx，线上 8098 仍指向修复前 dist

## 提交与推送
- 子模块 zhi2-web-admin @ d71a36607（分支 fix/bug-6373-preview-close）— drag.js 守卫（仅 4 行插入，version.json 已还原未提交）
- 父仓库 @ 05621b2 — 升级子模块指针至 d71a36607
- 父仓库 @ f254e07 — 常见错误台账 docs/frontend/common-errors.md 新增 E-046（含触发/根因/修复/验证/状态）
- 均已推送至 origin（父仓库用 git -C 正常解析；子模块因本地 worktree 解析怪象用显式 gitdir 形式推送），上游跟踪已设置

## 禅道状态
- 当前（2026-11-09 查询）：status=active、resolution=空、openedBy=zhunan、assignedTo=tiany、resolvedBy=空
- 2026-11-09 用户要求回写禅道；按本机流程（禅道 API 被风险策略拦截时走 DBX 直连「新禅道」库事务回写），加载 zentao-analyzer 技能遵循规范回写步骤与 zt_action 落库格式（避免 #6363 回写未生效）
- 后续建议：GitLab 创建 MR 合入 develop/v3.0.0；合并后删除 worktree；回写禅道状态为「已解决」

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6373",
  "source_extraction_id": "03a5d07586ac46c8b0a1a959ae8193dc",
  "version": 1,
  "memory_type": "entities"
}
-->