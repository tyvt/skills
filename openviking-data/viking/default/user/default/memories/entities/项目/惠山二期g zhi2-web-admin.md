# 惠山二期G zhi2-web-admin（惠山物管）
无锡惠山二期G（产品2.0）房地产综合服务平台物管管理端的前端子模块，缺陷在禅道跟踪并回写。

## 仓库与环境
- GitLab 项目 `gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited`；本地路径 `D:\repository\惠山二期G\zhi2-web-admin`；分支 `develop/v2.6.2-huishan`。
- 本地 nginx 站点 `惠山二期G.conf` 原监听 `http://localhost:8119`，2026-11-24 改为监听 8120（reload 后 HTTP 200，backend 指公司开发网关）部署 `dist`；登录页有图形算术验证码（2026-11-24 为 `4*5=20`），登录后主页显示「惠山区」「待办事项」。
- 生产站点 `http://www.hsqhoafunds.cn:5777/` 可达（HTTP 200）；HTTPS 在 5777 报 SSL 协议错误，只能走 HTTP；登录为 admin + 图形验证码（识别返回 "0" 不可靠，需直接看图）。
- 部署面板端口 18098，面板机制与 registry 细节见「部署看板」实体。2026-11-24 前未登记该项目环境、登录用登记表通用 admin 凭据；当日先登记 prod（port 5777、port_base 5773）与 local（8119），随后迁移为唯一 dev 槽位 8120、账号 {{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}}，凭据隐私引用 `deploy_env-huishan-g-dev` 注入看板内存（reveal 成功）；看板仍显示 `listen_ports:[8119]`、health=down，属旧端口缓存滞后。
- `gen_nginx_sites.ps1` 会覆盖所有项目故不用于此站点；sync 脚本 null 索引 bug 见「部署看板」。
- 计划与交接文档写在 `D:\plan\惠山二期G`，另有 `.plan/` 目录（如 task2393.md）。

## 路由与代码
- 菜单路由动态生成：静态路由仅 18 条、无 parking，动态路由在 vuex `state.permission.originalRoutes`；点「更多功能」无弹出、侧边栏折叠不出业务菜单。
- 停车泊位列表页 component 为 `benefit/parkingSpace/index`，真实路径 `/ShFund/xqgll/business/parking/parkingSpace`；`router.push` 会被路由守卫弹回 `#/index`，改用 `open` 带真实 hash 路径可直接进入（此前失败路径 `#/benefit/parkingSpace` 有误）。
- 资金拨付列表页路径 `/benefit/pubAllotNotice`，详情页为 `/{id}?formMode=view`；直接导航详情被路由守卫弹回 `#/index`。dev 环境 `getRouters` 报 500，改由 dist 静态路由兜底定位 path；dev 有可作废单据（state=0008/9999，如 `2077233286180032514`），列表接口需带 token，{{ov_privacy:default:viking://~/privacy/credential/deploy_env-huishan-g-dev#/values/username}} 账号可用。
- grep 需缩窄到子模块目录，仓库根会被拦截。
- eslint 须在 zhi2-web-admin 目录下用父仓本地 eslint 运行（父目录跑有 16 个 alias 误报）；提交时 lint-staged 仍报 `@/` alias 解析错误，属既存环境问题。
- 惠山文件与苏住房基线差异极小时用 `git merge-file` 三方合并；整文件冲突常为 CRLF/LF 行尾差异，统一行尾后可合并。

## 任务与验证
- 每次改动前确认构建基线；`npm run build` 超过编排器 180s 上限，需改后台进程跑完再轮询日志（2026-11-24 基线 exit 0，改后 verify-build 亦 exit 0）。
- 缺陷修复完成后回写禅道；已处理 bug 6939（停车泊位工具栏隐藏「审批」按钮，见 bug6939_停车泊位审批按钮）、bug 6950（作废接口 GET→POST，见 bug6950_cancel_request_method）、task 2768（维修资金表决 url，见 maintain_vote_url）。
- bug 6950 于 2026-11-24 收尾完成：禅道 resolved/fixed（action 99120 含内嵌验证图 24229，附件已挂 bug）、子模块 `79093564e` 与父仓 `2d3ca6cc` 已推送、临时产物（`zentao-6950\` 目录与子模块/父仓 `.task-state\`）已清理，交接链 `bug6950-cancel-get-to-post` 终止；前端验证门与代码改动沿用 hop2，未重跑。
- 禅道接口文档附件若需登录无法直接下载，可参考苏住房已实现提交移植（task 2104：dbd161219 + 7b937cd63）。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "惠山二期G zhi2-web-admin",
  "source_extraction_id": "2370fda52b0f40e2a19c85f898630070",
  "version": 5,
  "memory_type": "entities"
}
-->