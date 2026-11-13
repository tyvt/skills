# zhi2_web_admin
苏州市房地产监测V3的前端管理后台子模块仓库，承载预售与现售方案维护等页面。
## 描述
- 是父仓库“苏州市房地产监测V3”的 git 子模块，路径为 zhi2-web-admin。
- 基于 Vue 的前端 H5 管理项目，主分支 develop/v3.0.0。
- 主仓库中的 `zhi2-web-admin` 子模块目录曾为空且 `.git` 链接缺失（预存在未初始化/损坏状态，非 agent 任务 worktree 造成；子模块 gitdir 含全部提交可 `git submodule update` 恢复）（2026-11-09）
## 相关页面
- 现售方案维护页：src/views/presale/cashsale/plan/detail.vue
- 预售方案页：src/views/presale/permit/plan/detail.vue
- 预售资金监管 → 合同换房列表页：src/views/commercialHousingSales/presale/exchangeContract/index.vue
## 构建部署
- 使用 vite 8.3.5 构建，产物输出至父仓库 dist。
- 修复 bug6169 提交哈希 b1bb05685。
## 组件约束
- `zs-table` 内容溢出时进入 content-scroll 模式，将 `.el-table` 设为 `max-content` 变宽；`.list-card{overflow:hidden}` 会裁掉变宽部分及右侧固定「操作」列，故 `.zs-table-container--content-scroll` 需自行提供横向滚动，否则右侧「操作」列会被窗口右缘截断
- `index.scss` 的 `--content-scroll` 规则块已添加 `.zs-table-container--content-scroll{overflow-x:auto;overflow-y:hidden}`（bug-6358 修复），提供横向滚动使右侧固定「操作」列可达
- `v-dialogDrag` 指令曾吞掉 `el-dialog` 关闭按钮 click：`ImageViewer` 将 `:visible.sync` 绑定 store computed，X 按钮 click 被拖拽指令拦截无法关闭；`zs-dialog` 用相同指令但因 `visible` 为普通 data prop 正常关闭。已在 bug 6373 修复（提交 d71a36607）：drag.js 头部 `onmousedown` 内对 `.el-dialog__headerbtn` 直接 `return`，命中关闭按钮不重定位弹窗，保留其 `click`
- AGENTS.md 第7条：`zs-table-column` 的字典/tag 列必须传 `dictUrl`（如 `dictUrl: 'BIZ_STATE'`）；`displayColumns` 仅在列签名变化时重算，异步字典（`options` 绑定 `getDicts` 结果）不会自动回填，否则显示原始码值。bug 6436 修复（提交 7ea6073b1）已将 exchangeContract 业务状态列从 `options: this.bizStateOptions` 改为 `dictUrl: 'BIZ_STATE'`

## Bug 6514 修复（2026-11-13）
- 经纪机构注册工商提取后 GIS 校验死锁：提取映射不含坐标（registeredLat/Lng 无来源），agency 分支地址输入与 GIS 按钮被 isExtracted('registeredAddress') 锁死，校验又强制要坐标，形成死锁
- 产品确认口径：开发企业/经纪机构/租赁机构通过提取的GIS地图自动带出后且允许手动编辑修改
- 修复：mapQxtEntInfo.js 的 QXT_PREFILL_ONLY_FIELDS 增加 registeredAddress，提取地址仅预填不锁定（开发企业/经纪/租赁注册及 companyManagement 各提取入口同步解锁）
- e2e：institution-register-extract.spec.js 补「提取→GIS弹窗→选点→坐标回写」闭环断言
- 父仓 docs/frontend/common-errors.md 登记 E-051
- 运维：8098 vhost API upstream 由死掉的本地 8080 切至 dev 网关（备份 .bak-6514）
- 提交：子模块 e8b351511、父仓 f35f9e7；npm run build exit 0（gitHash b61b9c547）
- 禅道 bug 6514 → resolved/fixed，assignedTo 退回 zhunan

## Bug 6520 修复（2026-11-13）
- 预售资金监管银行-资金解款-划拨（用款）通知书详情页「验证标识」「通知书状态」显示数字码值（DetailTemplate tag 项缺 options）
- 修复：notice/detail.vue:956 与 noticeChange/detail.vue:478 两处 tag 项补 options: this.hasVerificationOptions / this.noticeStateOptions
- 子模块提交 65b114c93 推送 develop/v3.0.0，父仓 gitlink 1cc13cf 推送
- eslint 与 npm run build 均 exit 0（build 2.6.1，2026-11-13 10:37:18，102s），本地 nginx 8098 部署完成
- 禅道 bug 6520 → resolved/fixed，resolvedBy=tiany，assignedTo zhunan

<!-- MEMORY_FIELDS
{
  "category": "代码仓库",
  "name": "zhi2_web_admin",
  "source_extraction_id": "c983f42172af414c99d36805e11da495",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 9,
  "memory_type": "entities"
}
-->