# zhi2-web-admin（苏住房G）
苏住房G 后台管理前端，由苏住房前端项目 Lead（禅道账号 tiany）负责任务分配与实现方案决策，并负责开发与视觉验收。

## 仓库与环境
- 本地仓库根目录 `D:/repository/苏住房G`（Windows，D 盘）；导航栏组件 `src/layout/components/Navbar.vue`，视觉回归用例 `e2e/home-v2/navbar-visual.spec.mjs`，整图视觉验收阈值为相似度 99.5%；调整视觉候选时真实 `meta.icon` 优先于标题兜底。
- 本地站点端口 8101；管理端账号 {{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}}，用图形算术验证码登录（2026-11-24 为 `6 * 9 = 54`，刷新后 `7 - 7 = 0`），agent-browser 读图后填账号密码并 JS 点击（按钮被遮罩覆盖）。
- 登录接口 `/security/auth/userLogin`（username/password/code/uuid），密码前端加密故用浏览器填表最稳；验证码图片 src 曾为 `base64,undefined`，刷新页面即恢复；被拒的验证码是过期图，需先在验证码图上刷新再重试；登录按钮被遮挡时用 Enter 提交。
- 侧栏菜单项点击常被 `.menu-title--text` 遮挡、`--force` 也无效，可直接 navigate 目标 hash 路由。
- 2026-11-24 起点快照与交接一致：父仓 dirty=5、子模块 dirty=7 与本任务无关不得触碰，`screen-motion` worktree 也不动；子模块主检出在 `develop/v2.6.2-suzhufang`（非 detached）、起始 behind=1，bug 6941 交付时 behind=5 曾 stash 全部脏文件后 `pull --rebase` 再恢复（进入的提交未触及这些文件）。

## 构建与提交
- 提交必须在隔离 worktree 中完成，使主工作区和其它 worktree 的保留改动不被波及。
- 基线构建与后续验证在原仓库根、用同一套已装依赖运行；隔离 worktree 的依赖布局可能命中不到项目 Vite，基线构建 1 秒内退出不是源码错误。
- Vite 把父仓库目录当作 `env` 与 `dist` 根，隔离 worktree 必须保留完整父仓结构；构建日志静默 120 秒仍可能在运行并能正常完成，不要重跑。
- ESLint 需在子模块工作目录用相对路径运行，绝对路径会报 `@/` alias 解析失败。
- 候选与正式构建都设绝对 staging `outDir`，staging 全量 E2E 与版本校验通过后才替换正式 `dist`，失败或扫到测试标记时恢复备份；测试模式构建（`npm test`）经 watchdog 后台执行并用临时目录存状态日志。

## 验收与任务
- 候选站点 HTTP 响应须与 worktree 构建一致（2026-11-14 已确认）；`vite.config.js` 主检出构建输出到仓库根 `dist`，与本地 nginx 站点对应。
- E2E 经一次性 watchdog 包装，用 UI helper 在 `finally` 中停用再恢复原配置；验收须覆盖空权限、双向滚动、激活项可见性与测试标记扫描。
- 任务 2468（导航栏视觉改版）细节见 `task2468_navbar_visual` 实体。
- Bug 6899（大屏实时报表 hover 详情卡）：2026-11-24 实机验证通过、截图入会话并经用户确认，禅道回写 resolved/fixed，指派人由 tiany 改为 lichandan，action comment 以真实带图 HTML 开头，附件 fileID=24101，事务已提交。
- Bug 6941（防台防汛隐患列表操作按钮）：2026-11-24 修复、实机验证、提交推送并完成禅道回写（resolved/fixed，resolvedBy=tiany，assignedTo=lichandan，附件 fileID=24190），细节见 `hazard_bug_6941` 实体。

## 禅道 2788 交付链
- 禅道 2788（新增按钮权限字符）hop2 已完成环境与登录：nginx v2.0 代理修复（见 `suzhufang_nginx_env` 实体）、test 环境 8167 注册、8165 站点登录成功并进入 `#/ShFund/leaseManagement/ggsy/resourcesLeaseContractFiling`，「新增」按钮可见。
- hop2 留给 hop3 的未完成项：实机权限断言 → 截图取证+用户确认 → 提交推送 → 回写禅道（附图）→ 清产物。
- 交付链末端流程为：实机验证 → 截图入会话 → 用户确认 → 提交并推送 + 禅道回写 → 清理；hop4 已完成验收到带图回写，剩余「提交并推送 + 清理」写入交接文档第 4 节，由 hop5（2026-11-24 11:47:04 一次性投递，target=new）接续。
- hop2 交接文档 `D:\plan\苏住房G\HANDOFF-CHAIN-禅道2788-新增按钮权限字符-hop2-20261124-175320.md`（9 节）；hop3 已排程 `schedule-0354ebd1-7c1c-4d23-829e-d51e1b24373d`，2026-11-24 17:54:09 触发，target=new，prompt 仅四项。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "f8303174bada44ae9cff759a99ae421c",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "source_extraction_ids": [
    "5d0db96366bc468f84e203438485ba92",
    "707754838db84be486464e18fa56198a"
  ],
  "version": 15,
  "memory_type": "entities"
}
-->