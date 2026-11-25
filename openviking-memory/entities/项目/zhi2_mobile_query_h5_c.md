# zhi2-mobile-query-h5-c
苏州住房防汛 C 端移动查询 H5；uni-app + Vue3；GitLab `suzhufang-fe/zhi2-mobile-query-h5-c`；主分支 `dev`；本地 `D:\repository\苏住房防汛C端`。

## 页面与功能
- `home/index.vue`（`.scroll-tabs`+`BottomNav`）：2026-11-04 C 端信息流首页含轮播/待办/学习角/新闻列表；2026-11-14 加骨架屏和映射：banner=API title/image（空回退品牌文案），待办=首页任务汇总并留 source/date/category，列表=C 端 API；推送 `fix/home-visual-20261114`（`a8f6c97652f4ae242135198bc2e3e335f73b527d`）；底部五项仅“我的”→“个人中心”。
- 2026-11-25 禅道 6955：移除 MOCK、区分 B 端展示、接真实数据；见“ZenTao bug 6955 remove MOCK”。
- 2026-11-25 禅道 6968：G 端求援详情操作栏（立即受理/上报/进度反馈/完结）在角色不含 `wyqy`/`wyqygly` 时显示；并发会话 `43f282f` 修 detail.vue 且真机截图通过；受理 POST 未持久化（工单仍 `status=1`）。
- `mine/index.vue`：`.user-card` 蓝色渐变、`.menu-card` 白色、`.mine-body` 骨架屏；数据由 `portalData.ts fetchMine` 组装。
- `data/index.vue`：静态注入 `ref-assets.ts` 设计 DOM `REF_SEC0~REF_SEC5`（自动生成勿手改）；区域标签/指标原硬编码，现仅绑定唯一标题文本（area/area size/enterprise count）；详情子网格和物业评估因 API 缺失仍是设计稿。
- `project-check/form/index.vue`：禅道 6931 评估级别选择器取消注释并传 level（3 个前端文件未提交；本地草稿切换级别后重载问题，`startCheck` 传 level）；后台根因/提交/双端验收见“ZenTao bug 6931 evaluation level transmission”。

## 登录与需求
- 登录：`useFloodStore().login`→`/v2.0/security/auth/login`，返回 `nickName/userName/userId/phone/roles`；验证码占位符“请输入图形验证码”；token=`flood-token-v1`（`request.ts setToken`），用户=`flood-login-user-v1`（roles/roleKeys/deptId）；注入两 key 可模拟登录。
- 2026-11-16 需求：汛前/汛中/汛后弹窗选“property management area”和“warning item”，列表头显示所选，弹窗样式按提供 HTML。

## 构建与工作流
- 每任务一个 git worktree（无 `node_modules`，junction 指向主仓）；验证后合并 `dev` 并清理；后台构建 exit 0 产出 `dist`；提交前 `worktree-snapshot` 隔离、`submodule-commit` 提交/推送。
- 默认 `bun run build demo`（`usePortalApi()` false 用种子数据）；远端 `uni build -m test` 用 `.env.test`；bun、无 ESLint CLI；Vitest 覆盖 `tests/**/*.test.ts`；远端 mock 请求锁定 bizState→status 映射。
- 坑：`onShow` 须从 `@dcloudio/uni-app` 导入（从 `vue` 导入 TS2305）；浏览器需 hash query 绕旧懒加载块（`pages-home-index.*.js`），hash 变化不触发 `onShow`，角色切换需整页重载；`store/user.ts`/`utils/index.ts`/`responseDecrypt.ts` 类型错误预存在。

## API、部署与说明
- `usePortalApi()` 仅 API base 非空且有 token 时请求列表；预览构建设 `VITE_API_BASE_URL=/api` 并拦截响应；部署须设 `VITE_API_BASE_URL` 或 `VITE_AUTH_BASE_URL`；学习/新闻来自 fixtures，字段映射未用真实 API 验证。
- request：`raw:true` 返回 `{code,msg,data}` 供调用方解包，默认解包 data；`portal.ts detail()` 解包；`GET /v2.0/system/region/list(parentCode=320500)` 免登录，返回 `JsonResult<List<SysRegionVo>>`（`{regionName,regionCode,level,parentCode}`）；2026-11-11 同模式新增 `getKeyData/getBenefitData/getRepairData/getSunshineOverview/getRegionList`。
- 2026-11-24 求援详情问题：`raw:true` 未解包加日志/区域字段名不一致；修复方案批准（见“Rescue work order detail”）；本地预览 `localhost:8162` 直读 `dist`，2026-11-25 指向刚构建 `dist`。
- nginx 8095 上游 `192.168.1.31`；本地后台改动通常不影响实机验证；本地后台 `mvn compile` 需先装兄弟 API jar（zhi2-property-api、common-framework-api）到本地 Maven 仓库。
- 2026-11-25 构建/单测通过，接着查部署面板和双账号验证；修复 `dist` 已部署测试站。


<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_query_h5_c",
  "source_extraction_id": "ba9beb4df4884e3f83fb497196215a9b",
  "version": 51,
  "memory_type": "entities"
}
-->