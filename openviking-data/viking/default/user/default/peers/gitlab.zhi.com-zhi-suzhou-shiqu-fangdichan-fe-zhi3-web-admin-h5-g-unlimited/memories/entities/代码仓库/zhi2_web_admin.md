# zhi2_web_admin
苏州市房地产监测V3的前端管理后台子模块仓库，承载预售与现售方案维护等页面。
## 描述与页面
- 是父仓库“苏州市房地产监测V3”的 git 子模块，路径 zhi2-web-admin；基于 Vue 的前端 H5 管理项目，主分支 develop/v3.0.0。
- 使用 vite 8.3.5 构建，产物输出至父仓库 dist；修复 bug6169 的提交哈希为 b1bb05685。
- 主仓库中的 `zhi2-web-admin` 子模块目录曾为空且 `.git` 链接缺失，属预存在未初始化/损坏状态，非 agent 任务 worktree 造成；子模块 gitdir 含全部提交，可通过 `git submodule update` 恢复（2026-11-09）。
- 相关页面：现售方案维护页 `src/views/presale/cashsale/plan/detail.vue`；预售方案页 `src/views/presale/permit/plan/detail.vue`；预售资金监管 → 合同换房列表页 `src/views/commercialHousingSales/presale/exchangeContract/index.vue`。
## 注册页横幅
- 注册页顶部 banner 由共享组件 `RegisterPageHeader` 统一渲染；该组件被 `companyRegister.vue`、`InstitutionRegisterPage.vue` 及其两个路由入口引用，覆盖 companyRegister、institutionRegister、leaseInstitutionRegister 三个注册页。
- `/unitRegister` 与 `/propertyRegister` 顶部是「logo + 平台名」文字头部，没有图片，不属于顶部 banner 替换范围。
- `RegisterPageHeader/index.vue` 已把背景从 `@/assets/images/register-page-banner.svg` 改为 `@/assets/images/register-page-banner.png`；`aspect-ratio` 从 `1024 / 128` 改为 `3840 / 322`，`background-position` 从 `right center` 改为 `center center`；旧 `register-page-banner.svg` 仍保留但已无引用。
- 当前 `register-page-banner.png` 由 `portal_city_banner.png` 替换而来（3840×322，苏州城市天际线 + 平台标题，SHA256 与原图一致）；部署后需在 1366 与超宽屏确认裁切，未启动 dev server。
## 组件约束
- `zs-table` 内容溢出进入 content-scroll 后会用 `max-content` 放宽 `.el-table`，`.list-card{overflow:hidden}` 会裁掉右侧固定「操作」列；`index.scss` 的 `--content-scroll` 规则块已在 bug-6358 修复中加入 `.zs-table-container--content-scroll{overflow-x:auto;overflow-y:hidden}` 提供横向滚动（原问题会导致右侧操作列被窗口右缘截断）。
- `v-dialogDrag` 曾拦截 `el-dialog` 关闭按钮 click：`ImageViewer` 的 `:visible.sync` 绑定 store computed 时 X 按钮无法关闭，而 `zs-dialog` 因 `visible` 是普通 data prop 可关闭；bug 6373（提交 d71a36607）在 drag.js 的 `onmousedown` 内对 `.el-dialog__headerbtn` 直接 `return`，不重定位弹窗并保留 `click`。
- AGENTS.md 第7条要求 `zs-table-column` 的字典/tag 列传 `dictUrl`（如 `dictUrl: 'BIZ_STATE'`）；`displayColumns` 只在列签名变化时重算，异步字典（`options` 绑定 `getDicts` 结果）不会自动回填否则显示原始码值，bug 6436 修复（提交 7ea6073b1）已把 exchangeContract 业务状态列从 `options: this.bizStateOptions` 改为 `dictUrl: 'BIZ_STATE'`。
- AGENTS.md 规定 `public/version.json` 是构建产物禁止提交；该文件被跟踪，提交前需单独 stash/恢复并只暂存目标文件。
## 修复记录
- 各次 bug 修复的改动点、commit 与禅道状态见对应 zentao_bug 实体（如 zentao_bug_6297、zentao_bug_6514、zentao_bug_6520、zentao_bug_6909）。

<!-- MEMORY_FIELDS
{
  "category": "代码仓库",
  "name": "zhi2_web_admin",
  "source_extraction_id": "955314ce34404803aed611d61c869231",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 11,
  "memory_type": "entities"
}
-->