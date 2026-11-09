# 禅道Bug 6358 菜单管理操作项截断
zhi2-web-admin 系统管理→菜单管理页「操作」列按钮在奇安信(QAX)可信浏览器被表格右边缘截断，已修复合入 develop/v3.0.0。

## 现象
- Bug 6358（http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6358），2026-11-09 提出，禅道 resolved（效果「已实施待联调」；本机 Chrome 无法复现奇安信旧内核，需客测确认）
- 「操作」列（新增/编辑/删除）由 `zs-operate-column` 渲染，width 由 `zs-table` JS 计算（stretch/width），非固定 CSS，列宽≈182px 足够 3 按钮
- 浏览器：奇安信(QAX)可信浏览器，旧 Chromium 内核，字体度量略大→列宽测量偏大更易触发

## 根因与修复
- 根因：`zs-table` 内容滚动模式加 `.zs-table-container--content-scroll` 并把 `.el-table` 设 `width:max-content` 变宽；父级 `.list-card{overflow:hidden}` 裁掉变宽部分，右侧 fixed 操作列被窗口右缘截断无滚动条
- 修复：`zhi2-web-admin/src/components/zs-table/zs-table.vue` 新增 `.zs-table-container--content-scroll{overflow-x:auto;overflow-y:hidden}` 与子级 `.el-table{width:max-content;min-width:100%}`，容器自身承担横向滚动
- 提交 `c838c35f2`（fix(zs-table): content-scroll 容器横向滚动，修复奇安信旧内核下操作列被裁断(禅道#6358)），推送 `origin/fix/bug-6358`；`npm run build`（vite 8.3.5）退出码 0

## 合入与推送
- 子模块 zhi2-web-admin：develop/v3.0.0 ff 到 `200124782`（含 bug6363）再 merge fix/bug-6358 → `05a1a4421`，已推送
- 父仓「苏州市房地产监测V3」（remote 实际 zhi3-web-admin-h5-g-unlimited）：rebase 后于 `99f511e`/`956cdca` 之上 `f2ea8cd` 更新 gitlink（指向 05a1a4421）；`0245da5` docs 新增台账 E-045（docs/frontend/common-errors.md）
- 主工作区无关改动 git stash 暂存；worktree `zhi2-web-admin-wt-6358` 已删，node_modules 软链已移除

## 禅道回写与关联
- zt_bug 6358：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、resolvedDate=2026-11-09 18:03:48、assignedTo=zhunan
- zt_action 89610：action=resolved、extra=fixed，备注含根因+修复+验证+提交号；DBX 事务内与提交后双校验落库
- 关联：缺陷跟踪禅道（zentao-biz.zhi.com），数据查询新禅道（DBX）


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6358",
  "source_extraction_id": "8392458833e7446b9db475d1c44d32c3",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 7,
  "memory_type": "entities"
}
-->