# zhi2-web-admin（苏住房G）
苏住房G 后台管理前端。

## 仓库与环境
- 本地仓库根 `D:/repository/苏住房G`（Windows）；本地站点端口 8101；`vite.config.js` 主检出构建输出到仓库根 `dist`，对应本地 nginx 站点（2026-11-14 确认候选站点 HTTP 响应与 worktree 构建一致）。
- 导航栏组件 `src/layout/components/Navbar.vue`；视觉回归用例 `e2e/home-v2/navbar-visual.spec.mjs`，整图验收阈值相似度 99.5%；调整视觉候选时真实 `meta.icon` 优先于标题兜底。
- 子模块主检出在 `develop/v2.6.2-suzhufang`（非 detached）；2026-11-24 起点快照：父仓 dirty=5、子模块 dirty=7 与本任务无关不得触碰，`screen-motion` worktree 不动，behind=1；bug 6941 交付时 behind=5，曾 stash 全部脏文件 `pull --rebase` 后恢复（进入的提交未触及这些文件）。
- 登录接口 `/security/auth/userLogin`（username/password/code/uuid）；管理端账号 {{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}}；图形算术验证码（2026-11-24 为 `6 * 9 = 54`，刷新后 `7 - 7 = 0`）；密码前端加密，用 agent-browser 读图后填账号密码并 JS 点击（按钮被遮罩时改 Enter 提交）；验证码图片 src 曾为 `base64,undefined`，刷新页面即恢复；被拒的验证码是过期图，需先在验证码图上刷新再重试。
- 侧栏菜单项点击常被 `.menu-title--text` 遮挡且 `--force` 无效，可直接 navigate 目标 hash 路由。

## 构建与提交
- 提交必须在隔离 worktree 中完成；基线构建与后续验证在原仓库根用同一套已装依赖运行（隔离 worktree 的依赖布局可能命中不到项目 Vite，基线构建 1 秒内退出不是源码错误）。
- Vite 把父仓库目录当作 `env` 与 `dist` 根，隔离 worktree 必须保留完整父仓结构；构建日志静默 120 秒仍可能在运行并能正常完成，不要重跑。
- ESLint 需在子模块工作目录用相对路径运行，绝对路径会报 `@/` alias 解析失败。
- 候选与正式构建都设绝对 staging `outDir`，staging 全量 E2E 与版本校验通过后才替换正式 `dist`，失败或扫到测试标记时恢复备份；测试模式构建（`npm test`）经 watchdog 后台执行并用临时目录存状态日志。
- E2E 经一次性 watchdog 包装，用 UI helper 在 `finally` 中停用再恢复原配置；验收须覆盖空权限、双向滚动、激活项可见性与测试标记扫描。

## 缺陷交付
- 任务 2468（导航栏视觉改版）细节见 `task2468_navbar_visual` 实体。
- Bug 6899（大屏实时报表 hover 详情卡）：2026-11-24 实机验证通过、截图入会话并经用户确认，禅道回写 resolved/fixed，指派人由 tiany 改为 lichandan，action comment 以真实带图 HTML 开头，附件 fileID=24101，事务已提交。
- Bug 6941（防台防汛隐患列表操作按钮）：2026-11-24 修复、实机验证、提交推送并完成禅道回写（resolved/fixed，resolvedBy=tiany，assignedTo=lichandan，附件 fileID=24190），细节见 `hazard_bug_6941` 实体。
- Bug 5239（业委会选举表决详情页行政区域）：2026-11-25 修复为精确区县（东城区）、实机验证经用户确认，子模块 `1683d89f2` 与父仓 `2b477d0` 已推送，禅道回写 resolved/fixed（附件 fileID=24286），细节见 `zentao_bug_5239` 实体。
- Bug 6953（街道/社区全称置于简称之前）：2026-11-25 改三个 Vue 文件共 6 处字段顺序，ESLint 与基线/改后 build 均通过，实机三页 DOM+截图验证经用户确认并选「提交并推送」，验证图上传禅道 fileID 24298/24299/24300；成本 1.01M 触发 P0 交接，禅道回写、子模块提交推送与清理留待 hop2，细节见 `zentao_bug_6953` 实体。
- 禅道 2788（新增按钮权限字符）交付链见 `zentao_2788` 实体。
- 2026-11-25 ZenTao 2730 (monthly report sticky-header rework): stale dist caused a false double-scroll; rebuilt and redeployed to nginx 8101 with live verification passing all three checks, but the verification gate was aborted so no commit/push/ZenTao write-back was done; handed off to hop3. Details in `zentao_bug_2730` entity.

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "ee14901f4a53466cbd622cc16829b2ac",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "source_extraction_ids": [
    "5d0db96366bc468f84e203438485ba92",
    "707754838db84be486464e18fa56198a"
  ],
  "version": 20,
  "memory_type": "entities"
}
-->