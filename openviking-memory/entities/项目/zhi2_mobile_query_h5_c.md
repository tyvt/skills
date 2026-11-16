# zhi2-mobile-query-h5-c
苏住房防汛 C 端移动查询 H5；uni-app Vue3；GitLab `suzhufang-fe/zhi2-mobile-query-h5-c`；主分支 `dev`；目录 `D:\repository\苏住房防汛C端`。

## 页面与功能
- `home/index.vue`（`.scroll-tabs`+`BottomNav`）：2026-11-04 参照苏住房 C 端信息流首页（轮播/待办/学习园地/新闻列表）；2026-11-14 补骨架与数据映射：横幅取接口标题/图片，无内容用固定品牌文案，待办取第一页任务摘要，保留来源/日期/分类标签，列表仍走 C 端接口；推送 `fix/home-visual-20261114`（`a8f6c97652f4ae242135198bc2e3e335f73b527d`）；底栏默认五项仅「我的」改「个人中心」。
- `mine/index.vue`：`.user-card`（蓝渐变）/`.menu-card`（白）/`.mine-body` 带骨架屏，数据由 `portalData.ts fetchMine` 组装。
- `data/index.vue`：静态注入 `ref-assets.ts`（自动生成、不可手改）的 `REF_SEC0~REF_SEC5` 设计 DOM；区域 chips 与指标原硬编码，仅绑定区域/面积/企业数等唯一标题标签；明细子网格与物业评价保留设计（后端缺接口）。
- 登录 `useFloodStore().login` 调 `/v2.0/security/auth/login`，返 `nickName/userName/userId/phone/roles`；验证码 placeholder 保持「请输入图形验证码」未改。
- 2026-11-16 新需求：点击汛前/汛中/汛后弹窗选「物业管理区域」「预警事项」，工单列表顶部展示所选内容，弹窗 UI 参考提供的 HTML。

## 构建与接口
- 每任务建 git worktree（无 `node_modules`，junction 指主仓免复制），验证后合 `dev` 清理；后台构建 exit 0 产 `dist`；提交前用 `worktree-snapshot` 核对隔离，`submodule-commit` 提交推送。
- 默认 `bun run build demo`（`usePortalApi()` false 用种子数据），远程 `uni build -m test` 用 `.env.test`；包管理 bun、无 ESLint CLI；Vitest 覆盖 `tests/**/*.test.ts`，远程 mock request 锁定 bizState→status 映射。
- 首页空数据：`usePortalApi()` 仅在 API base 非空且令牌存在时请求列表；预览构建设 `VITE_API_BASE_URL=/api` 并拦截响应；部署需配 `VITE_API_BASE_URL` 或 `VITE_AUTH_BASE_URL`；截图学习/新闻数据来自 fixture，未用真实接口响应验证字段映射。
- request util：`raw:true` 返 `{code,msg,data}` 信封由调用方解 `.data`，默认解包 data；`portal.ts detail()` 解包信封；区域列表 `GET /v2.0/system/region/list(parentCode=320500)` 免登录，返 `JsonResult<List<SysRegionVo>>`（元素 `{regionName,regionCode,level,parentCode}`）；2026-11-11 追加 `getKeyData/getBenefitData/getRepairData/getSunshineOverview/getRegionList`，同解包模式。

## 相关记忆
- 预览收尾见「无限版查询H5测试服务器」；首页改造授权/实施/截图核对见「zhi2 首页改版实施与截图核对」；缺陷修复见「bug6456」「bug6457」；UI 走查 9 项修复见「zhi2 UI 走查修复」。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_query_h5_c",
  "source_extraction_id": "fa547b53633e4184aa173652d9bf1334",
  "version": 31,
  "memory_type": "entities"
}
-->