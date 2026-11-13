# zhi2-mobile-query-h5-c
苏住房防汛C端移动查询H5，uni-app Vue3 项目，GitLab suzhufang-fe/zhi2-mobile-query-h5-c，主分支 dev，前端目录 D:\repository\苏住房防汛C端。

## 项目概况与结构
- 首页 home/index.vue 含 `.scroll-tabs` 与 BottomNav；数智页 data/index.vue 静态注入 ref-assets.ts 的 REF_SEC0~REF_SEC5 设计 DOM，区域 chips 与指标原硬编码，ref-assets.ts 自动生成不可手改（2026-11-11）
- 我的页 mine/index.vue 用 `.user-card`(蓝渐变)/`.menu-card`(白)/`.mine-body`；菜单 flex 适配骨架屏（2026-11-09）
- 加载模式：`loading` 状态 `v-if="!loading"` + 骨架屏（home/mine 于 2026-11-09 加）
- 数智页数据绑定仅唯一标题标签（区域/面积/企业数等），明细子网格与物业评价保持设计（后端缺接口）（2026-11-11）
- 登录 useFloodStore().login 调 `/v2.0/security/auth/login` 返 nickName/userName/userId/phone/roles；我的页 portalData.ts fetchMine 组装（2026-11-11）
- 任务流：每任务建 git worktree，验证后合 dev 并清理（2026-11-11）

## 构建与部署
- uni-app Vue3；构建后台运行；worktree 无 node_modules，junction 到主仓避免复制，构建 exit 0 产 dist（2026-11-09）
- 默认 `bun run build` demo 模式（usePortalApi() false 用种子数据）；`uni build -m test` 远程模式用 .env.test（2026-11-11）
- nginx 站点 苏住房防汛C端.conf，root D:/repository/苏住房防汛C端/dist，监听 8095，/api/ 反代 dev 网关（2026-11-11）
- Playwright e2e 端口 8095，凭证 zsbase / Zs@2026Aa!（AES-CBC 加密见 src/utils/passwordEncrypt.js）（2026-11-11）
- 用 bun；无 ESLint，类型检查走 bun（2026-11-12）
- Vitest 含 `tests/**/*.test.ts`；远程模式 mock request 锁定 bizState→status 映射（2026-11-11）

## 接口与数据
- request util：`raw:true` 返回 `{code,msg,data}` 信封（调用方解 `.data`）；默认解包 data（2026-11-11）
- 区域列表 `GET /v2.0/system/region/list`(parentCode=320500) 返 `JsonResult<List<SysRegionVo>>` 数组 `{regionName,regionCode,level,parentCode}`；无需登录（2026-11-11）
- portal.ts detail() 解包信封；2026-11-11 追加 G-end 统计接口 getKeyData/getBenefitData/getRepairData/getSunshineOverview/getRegionList 同模式（2026-11-11）
- 首页与我的待办计数原取 getTaskCount().todoNum(12) 与列表 total(3) 不符；bug6457 改取列表 total，我的页改数字徽标，删 getTaskCount 提交 72bc8cf 回写禅道6457 已解决（2026-11-11）

## 修复记录
- Bug6456(2026-11-11)：数智页区域 chips 改由 region/list 动态生成（全市+区县），去“更多”按钮；统计接 G-end 接口；物业评价保持0；提交 54f89df 推 origin/dev，禅道 resolved/fixed assignedTo=lichandan（2026-11-11）
- Bug6502(2026-11-12)：App.vue token-blind-trust 修复；禅道 resolved/fixed assignedTo=tiany openedBy=lichandan product=79 project=141 exec=142 推 origin/dev（2026-11-12）
- 2026-11-12 UI走查9项（Excel 无禅道ID）：修复首页/项目检查字号间距箭头等（theme.css/home/records），提交 412ccd5 style(ui) 与 c112896 feat(agreement) 推 origin/dev(3dee5ab..c112896)；按钮蓝为 `--c-brand:#075ed1`（非 #004fd0）（2026-11-12）
- 登录验证码 placeholder 已为“请输入图形验证码”未改；用户协议/隐私协议改品牌蓝链接+新增静态协议页（agreementContent.ts 占位文本，因登录前配置接口401无法取线上文本），pages.json 加路由，docs/release-checklist.md 标记上线前需法务提供正式全文（2026-11-12）
- 构建 vue-tsc 26 错误为预存在（utils/index.ts 等未改动文件），本次零新增；H5 DevTools 未执行（2026-11-12）


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_mobile_query_h5_c",
  "source_extraction_id": "804b080039a54876a5328c132ab388a6",
  "version": 9,
  "memory_type": "entities"
}
-->