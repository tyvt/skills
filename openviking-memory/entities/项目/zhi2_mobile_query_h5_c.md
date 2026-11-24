# zhi2-mobile-query-h5-c
苏住房防汛C端移动查询 H5，uni-app + Vue3；GitLab `suzhufang-fe/zhi2-mobile-query-h5-c`，主分支 `dev`，本地目录 `D:\repository\苏住房防汛C端`。

## 页面与功能
- `home/index.vue`（`.scroll-tabs` + `BottomNav`）：2026-11-04 C 端信息流首页（轮播/待办/学习角/资讯列表）；2026-11-14 加骨架屏与数据映射（banner 取接口标题/图片，空时回退固定品牌文案；待办用首页任务摘要并保留来源/日期/类别标签；列表走 C 端接口），推送 `fix/home-visual-20261114`（`a8f6c97652f4ae242135198bc2e3e335f73b527d`）；底部五项仅「我的」改名「个人中心」。
- `mine/index.vue`：`.user-card` 蓝色渐变、`.menu-card` 白色、`.mine-body` 骨架屏；数据由 `portalData.ts fetchMine` 组装。
- `data/index.vue`：静态注入 `ref-assets.ts` 的设计稿 DOM `REF_SEC0~REF_SEC5`（自动生成，禁止手改）；区域标签与指标原为硬编码，现仅绑唯一标题文案（区域/面积/企业数）；详情子网格与物业评估仍为设计稿（后端接口缺失）。
- 登录：`useFloodStore().login` 调 `/v2.0/security/auth/login`，返回 `nickName/userName/userId/phone/roles`；验证码占位仍为「请输入图形验证码」。
- 2026-11-16 需求：点汛前/汛中/汛后弹窗选择「物业管理区域」与「预警事项」，列表头部显示所选，弹窗样式参照给定 HTML。
- `project-check/form/index.vue`：2026-11-24 禅道 bug 6931 取消注释评价等级选择器（3 个前端文件未提交），本地草稿改等级后按新等级重载题目、`startCheck` 透传等级参数；实机确认入口可见（01 综合能力显示「评价等级（可修改）」、五个市标选项与切换确认弹窗），但改等级后部署的后端仍返回「市标三级」且 contentId 集合不变，核心功能失败；hop3 定位为后端问题：`/check/start` 忽略五个等级字段，而 `GET /checkRecord/initItems` 按等级生效（g=1→…0001-3、g=2→…0016-8、g=3→…0031-3），故在分支 `develop/v2.6.2-suzhufang-dev` 改两文件（`H5CheckStartDto` 等级字段 + `start()` 透传）编译通过但未提交；hop4（2026-11-24）重新打包并在本地后端用 curl 证实透传生效（见「查询H5本地后端验证环境」）；hop5 PC+移动端 UI 验证通过（grade=1↔3 首题 `…000001`↔`…000031`，其余四类不变），提交前端 dev `c6fb38e`、后端 `8855536` 并推送，禅道 6931 已 resolved/fixed（附件 24168 GIF、24169 PNG），仅余清理（见 zentao_bug_6931）。

## 构建
- 每个任务一个 git worktree（无 `node_modules`，junction 指向主仓避免复制），验证后并回 `dev` 并清理；后台构建 exit 0 产出 `dist`；提交前跑 `worktree-snapshot` 查隔离、`submodule-commit` 提交推送。
- 默认 `bun run build demo`（`usePortalApi()` false 用种子数据）；远端 `uni build -m test` 用 `.env.test`；bun 为包管理器，无 ESLint CLI；Vitest 覆盖 `tests/**/*.test.ts`，远端 mock request 锁定 bizState→status 映射。
## 接口与部署
- 首页空数据：`usePortalApi()` 仅在 API base 非空且有 token 时请求列表；预览构建设 `VITE_API_BASE_URL=/api` 并拦截响应；部署必须设 `VITE_API_BASE_URL` 或 `VITE_AUTH_BASE_URL`；学习/资讯来自 fixtures，字段映射未对真实接口验证。
- request 工具：`raw:true` 返回 `{code,msg,data}` 外壳由调用方解包，默认解包 data；`portal.ts detail()` 解包外壳；`GET /v2.0/system/region/list(parentCode=320500)` 免登录，返回 `JsonResult<List<SysRegionVo>>`（items `{regionName,regionCode,level,parentCode}`）；2026-11-11 按同一解包模式增加 `getKeyData/getBenefitData/getRepairData/getSunshineOverview/getRegionList`。
- 2026-11-24 求援工单详情页问题定位为 `raw:true` 外壳未解包叠加日志/区域字段名不一致，补充修复方案已评审通过（见「求援工单详情」）。
- nginx 8095 上游为远程测试服 `192.168.1.31`，本地后端改动默认不影响实机验证；本地后端 `mvn compile` 需先把同级 API jar（zhi2-property-api、common-framework-api）装进本地 Maven 仓库。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_query_h5_c",
  "source_extraction_id": "cc2cabee31a04543999aef0c83603367",
  "version": 41,
  "memory_type": "entities"
}
-->