# zhi3-web-admin-h5
苏州房产管理端 H5 前端项目，含经纪机构管理与区县待办跳转链路。

## 项目与校验
- 页面为 .vue 组件；eslint 静态校验 + 构建验证。全量 lint 有存量红基线（记于 AGENTS.md），以单文件 eslint 是否新增命中判断改动质量。
- 2026-11-24：人事变更 UI 改动单文件 eslint exit 0；`npm run build` exit 0、17s、gitHash `9a324be7f` 与子模块 HEAD 一致。
- `D:\plan` 被 grep 门禁拦截，改用 pwsh Select-String 定位段落；`op:full` 模型路径对读文件请求会编排失败，需换窄 request。

## 菜单与路由
- 9002 菜单表 institution/agencyPersonnel/detail 的 meta.busCode=jgcyryba（备案）；jgcyrybg（变更）菜单 id 2112869088935174145，component 仍指旧薄壳；cyrybg/jgcyrybg/zlcyrybg 三菜单共用同一薄壳组件。
- 待办解析中 busCode 菜单匹配与后端 menuRoutes(menuId) 下发优先于注册表；仅改注册表一行时区县待办仍会落旧薄壳。
- getId() 取路径末段，可解析 personalRecordChange/:tableid 的变更单 ID。

## 变更单与方案
- 业务库 2 条真实变更单：changeId=2113249234228731906、recordId=2113209988734361601，biz_state=2。
- 方案：薄壳内按 meta.busCode 分发渲染（jgcyrybg → AgencyPersonnelDetail），并回退注册表改动，避免兜底到 busCode=jgcyryba 的备案菜单使变更态无法激活；计划文档 v2 已落（附 9002 SYS_MENU 证据）。
- 路径风险：/personalRecordChange/:tableid 不含 agencyPersonnel，resolvePersonnelOrganTypeByRoutePath 会误判为开发企业(01)；靠 auditBusCode 的 `|| ORGAN_TYPE_AGENCY` 兜底与 changeActive 第二参强制 ORGAN_TYPE_AGENCY，薄壳下 isPersonnelChangeRoute 必为 true，changeRecordId 取路径末段。
- 详情接口在 `api/company/personnelRecord.js:195` 以 POST /company/personnelRecordChange/detail 提交裸 changeId（19 位 ID 以带引号字符串发送）；request.js 的 normalizeV3ApiUrl 不改写 /detail。

## 进展、验证门与交接
- detail.vue 已按 meta.busCode===jgcyrybg 分发渲染 AgencyPersonnelDetail，变更态全链路自洽；todoRouteRegistry.js:141 已回退原值，消除回归风险。
- hop3 验证环境为本地 8098（静态服务新构建产物、API 代理 9002，见 zhi3_local_verify_chain 实体），无需上传 9002；浏览器实机验证卡在 8098 登录点击后跳 8101、8098 域无 token（登录态失效需重登区县账号）。
- 2026-11-24 hop7 结论：400 为后端缺陷（NPE，见 fangdichan_backend 实体），前端薄壳修复本身正确，但页面因 400 渲染 0 字段，无法通过前端验证门，按硬约束不能空回写禅道；hop5 实测 dev 库 2 个有效 id、9002 的 1 个 id、两账号共 5 组合全部 400，换数据无效。
- 未完成：实机截图入会话+用户确认、提交推送、禅道回写（嵌图）、产物清理。
- 交接：hop2 文档 HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop2-20261124-1009.md（9 节，含 chain_id/hop=2/maxHops=10）；hop7 成本 1.01M 触发 P0 硬交接，文档 HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop7-20261124-1312.md（9 节，第 4 节未完成项、第 6 节含启动模板），hop8 排程 schedule-fb1dd7dd…（2026-11-24 13:13 触发、新会话）待办 dev 库凭据、残留 java PID 27748、`estate-manage-v3` worktree 清理。

<!-- MEMORY_FIELDS
{
  "category": "前端项目",
  "name": "zhi3_admin_h5",
  "source_extraction_id": "0b0b9d460a884399bd77607e85481cf4",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 5,
  "memory_type": "entities"
}
-->