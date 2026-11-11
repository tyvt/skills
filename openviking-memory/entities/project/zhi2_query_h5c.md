# 苏住房防汛C端移动查询H5
uni-app Vue3 H5 项目（苏住房防汛C端移动查询），GitLab 仓库 suzhufang-fe/zhi2-mobile-query-h5-c，主开发分支 dev，前端目录 D:\repository\苏住房防汛C端。

## 构建与部署
- 构建：`uni build -m test --outDir ./dist` 为 remote 模式（用 .env.test），默认 `bun run build` 为 demo 模式（usePortalApi() 返回 false 走 seed 数据）
- 部署：nginx UI 站点「苏住房防汛C端.conf」root 指向 D:/repository/苏住房防汛C端/dist，监听 8095，/api/ 反代到 dev 网关
- 验证：Playwright 真机联调走端口 8095，e2e 凭据 zsbase / Zs@2026Aa!（密码需 AES-CBC 加密，参考 src/utils/passwordEncrypt.js）

## 登录与用户态
- 登录：useFloodStore().login 调 /v2.0/security/auth/login，响应 data 含 nickName/userName/userId/phone/roles/roleKeys 等
- 「我的」页：portalData.ts 的 fetchMine 负责组装我的页数据
- 任务流程：每任务建 git worktree，验证后合并 dev 再清理 worktree

## 数智页（data page）状态
- src/pages/data/index.vue 为纯静态：注入 ref-assets.ts 的 REF_SEC0~REF_SEC5 设计稿 DOM，区域 chips 与各指标全写死假数据，无接口调用
- ref-assets.ts 为自动生成（请勿手改），数据需在注入后通过 DOM 绑定
- Bug 6456（2026-11-11）：数智页区域显示不全（高新区），需区域顺序对齐 G端、「全市数据」→「全市」
- 改造方案（2026-11-11）：接入 5 个已有 G端接口 + 区域列表，修显示，物业评价暂留静态 0（后端缺失）

## 验证与归属
- 所属项目：苏住房防汛C端；来源会话：2026-11-09 登录用户信息修复任务
- 被苏住房C端(zhi2-mobile-shimin)参考其接口与跳转模式（2026-11-09）

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_query_h5c",
  "source_extraction_id": "387bf149ce1b4686b2e6b90ec45925ed",
  "version": 2,
  "memory_type": "entities"
}
-->