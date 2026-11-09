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

## 验证与归属
- 所属项目：苏住房防汛C端；来源会话：2026-11-09 登录用户信息修复任务
- 被苏住房C端(zhi2-mobile-shimin)参考其接口与跳转模式（2026-11-09）

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_query_h5c",
  "source_extraction_id": "471b9e3284e046c4958b756a246ad8cc",
  "version": 1,
  "memory_type": "entities"
}
-->