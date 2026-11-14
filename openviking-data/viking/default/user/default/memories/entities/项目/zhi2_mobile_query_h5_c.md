# zhi2-mobile-query-h5-c
苏住房防汛 C 端移动查询 H5，uni-app Vue3，GitLab `suzhufang-fe/zhi2-mobile-query-h5-c`，主分支 `dev`，前端目录 `D:\repository\苏住房防汛C端`。

## 页面与功能
- `home/index.vue`（`.scroll-tabs`+`BottomNav`）：2026-11-04 改为参考苏住房 C 端信息流首页（轮播/待办/学习园地/新闻列表）；2026-11-14 补骨架与数据映射——横幅读接口标题/图片、无内容显示固定品牌文案、待办读第一页任务摘要、保留来源/日期/分类标签，运行时列表仍由 C 端接口提供。
- `mine/index.vue`：`.user-card`（蓝渐变）/`.menu-card`（白）/`.mine-body` 均带骨架屏，数据由 `portalData.ts fetchMine` 组装。
- `data/index.vue`：静态注入 `ref-assets.ts`（自动生成、不可手改）的 `REF_SEC0~REF_SEC5` 设计 DOM；区域 chips 与指标原硬编码，仅绑定区域/面积/企业数等唯一标题标签，明细子网格与物业评价保留设计（后端缺接口）。
- 登录 `useFloodStore().login` 调 `/v2.0/security/auth/login`，返 `nickName/userName/userId/phone/roles`；验证码 placeholder 保持「请输入图形验证码」未改。

## 构建与接口
- 每任务建 git worktree（无 `node_modules`，junction 指向主仓避免复制），验证后合 `dev` 并清理；后台构建 exit 0 产 `dist`。提交前按仓库要求加载 `worktree-snapshot` 核对 worktree 隔离，并用 `submodule-commit` 完成提交与推送。
- 默认 `bun run build demo`（`usePortalApi()` false 用种子数据），远程 `uni build -m test` 用 `.env.test`；包管理 bun、无 ESLint；Vitest 覆盖 `tests/**/*.test.ts`，远程模式 mock request 锁定 bizState→status 映射。
- 首页空数据关键条件：`usePortalApi()` 仅在 API base 非空且令牌存在时才请求列表；预览构建显式设 `VITE_API_BASE_URL=/api`，浏览器只注入临时存储并拦截响应。
- request util：`raw:true` 返 `{code,msg,data}` 信封由调用方解 `.data`，默认解包 data；`portal.ts detail()` 解包信封；区域列表 `GET /v2.0/system/region/list(parentCode=320500)` 免登录，返 `JsonResult<List<SysRegionVo>>`（元素 `{regionName,regionCode,level,parentCode}`），2026-11-11 追加 G-end `getKeyData/getBenefitData/getRepairData/getSunshineOverview/getRegionList`，同解包模式。

## 相关实体
- 2026-11-14 预览收尾（恢复 Nginx 原配置、退出临时 Chromium、再按已授权分支提交推送）见实体卡「无限版查询H5测试服务器」。
- 2026-11-14 首页布局/样式与接口字段改造的授权、实施与截图核对见实体卡「zhi2 首页改版实施与截图核对」；缺陷修复见「bug6456」「bug6457」；UI 走查 9 项修复见「zhi2 UI 走查修复」。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_query_h5_c",
  "source_extraction_id": "c51eda4d06e84ffba67a65a4e962bb92",
  "version": 26,
  "memory_type": "entities"
}
-->