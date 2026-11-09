# zhi2_web_admin
苏州市房地产监测V3的前端管理后台子模块仓库，承载预售与现售方案维护等页面。
## 描述
- 是父仓库“苏州市房地产监测V3”的 git 子模块，路径为 zhi2-web-admin。
- 基于 Vue 的前端 H5 管理项目，主分支 develop/v3.0.0。
- 主仓库中的 `zhi2-web-admin` 子模块目录曾为空且 `.git` 链接缺失（预存在未初始化/损坏状态，非 agent 任务 worktree 造成；子模块 gitdir 含全部提交可 `git submodule update` 恢复）（2026-11-09）
## 相关页面
- 现售方案维护页：src/views/presale/cashsale/plan/detail.vue
- 预售方案页：src/views/presale/permit/plan/detail.vue
## 构建部署
- 使用 vite 8.3.5 构建，产物输出至父仓库 dist。
- 修复 bug6169 提交哈希 b1bb05685。
## 组件约束
- `zs-table` 内容溢出时进入 content-scroll 模式，将 `.el-table` 设为 `max-content` 变宽；`.list-card{overflow:hidden}` 会裁掉变宽部分及右侧固定「操作」列，故 `.zs-table-container--content-scroll` 需自行提供横向滚动，否则右侧「操作」列会被窗口右缘截断
- `index.scss` 的 `--content-scroll` 规则块已添加 `.zs-table-container--content-scroll{overflow-x:auto;overflow-y:hidden}`（bug-6358 修复），提供横向滚动使右侧固定「操作」列可达
- `v-dialogDrag` 指令曾吞掉 `el-dialog` 关闭按钮 click：`ImageViewer` 将 `:visible.sync` 绑定 store computed，X 按钮 click 被拖拽指令拦截无法关闭；`zs-dialog` 用相同指令但因 `visible` 为普通 data prop 正常关闭。已在 bug 6373 修复（提交 d71a36607）：drag.js 头部 `onmousedown` 内对 `.el-dialog__headerbtn` 直接 `return`，命中关闭按钮不重定位弹窗，保留其 `click`

<!-- MEMORY_FIELDS
{
  "category": "代码仓库",
  "name": "zhi2_web_admin",
  "source_extraction_id": "4f341c27510048b787426e26c71a1255",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 6,
  "memory_type": "entities"
}
-->