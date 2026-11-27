# 禅道 Bug 7035
苏住房防汛 C 端（zhi2-mobile-query-h5-c）求援提交后返回兜底丢失物业区域与预警事件参数、生成空白汛中巡检页压在原页之上；2026-11-27 全链路完成并终止。

## 工单与现象
- 禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7035；已确认存在且 active。
- 附图 24684.jpg＝提交后页面（物业区域空「请输入小区名称搜索」），24685.png＝再点返回后的正确页面（显示「嘉越时代花园」）；提交后无区域、再点返回才回到有区域页。
- 页面栈推断 […, 原 inspection(有区域), 新 inspection(无区域)]。

## 根因与代码
- `workbench/index.vue:66-70` 进入汛中巡检带 `complexId/complexName/eventId/eventName`，`inspection/index.vue:157-174` 据此锁定区域（`areaLocked=true`）。
- `inspection/index.vue:210-216` `openRescue()` 只透传 `complexId/complexName`，未传 `eventId/eventName`。
- `rescue/index.vue:96-99` 提交成功后优先 `navigateBack`，失败兜底 `uni.redirectTo('/pages/inspection/index?kind=mid')` 只带 kind，丢区域/事件参数，`fromStageDialog=false` 致区域不显示。

## 修复与验证（2026-11-27）
- 三点修复：`openRescue()` 补传 `eventId/eventName`（含编码）→ `rescue onLoad` 接收 → 兜底 `redirectTo` 带上 `complexId/complexName/eventId/eventName`；eventId/stageSelection 为 ref。
- 计划经 orchestrator 评审：reviewer 指出缺 e2e，补入 `page.route` mock API 免登录模式（参考 bug6769）后通过，人工确认实施；代码已改、H5 `npm run build` 通过（exitCode=0），后续 hop 仅改 e2e 定位器与断言、未动生产代码与 dist，build 基线沿用首次。
- e2e 三重根因：①baseURL=8095 实为惠山C端 local（root `D:/repository/惠山二期H5/dist`、旧构建 commit 2332361、主 JS `/js/index-e7dbaceb.js`），防汛C端 local 应为 8150（root `D:/repository/苏住房防汛C端/dist`、新构建 `index-OtwsmdoP.js`），用 `E2E_BASE_URL=8150` 覆盖不改配置；②uni-app H5 编译过滤 native input 的 `aria-label`/`placeholder`（快照 textbox 无 accessible name、DOM 仅剩 class/maxlength/type），改按稳定属性定位（物业区域 `input[maxlength="140"]`、联系人 `input[maxlength="30"]`、电话 `input[type="number"]`、两个 textarea 用 nth）；③`redirectTo` 双重编码（onLoad 解码中文后代码再 `encodeURIComponent`、uni-app 路由再编码，URL 呈 `complexName=%25E5%2598%2589...`），功能正确（inspection 显示「嘉越时代花园」、`fromStageDialog` 依赖的 queryComplexId/queryEventId 为 ASCII 不受影响），断言改 `decodeURIComponent(params.get(...) ?? '')` 还原比对。
- e2e 3/3 全绿（exitCode=0、2.8s，baseURL=8150）。
- 实机验证改用带参 URL 直接打开 inspection 页（无需登录，推翻 hop1「8150 验证码受阻」判断）；playwright 同进程 open+eval+截图产出 `C:/Users/Administrator/AppData/Local/Temp/bug7035-verify-20261127-091755.png`，显示「物业管理区域：嘉越时代花园」+「⚠️ 紧急求救」；「请求失败 HTTP 502」为未 mock 模板接口、与区域回填无关；用户已确认，按禅道免二次问规则授权提交推送+回写。

## 交付与收尾（2026-11-27）
- 提交 `0fbc7d6` 已推送 `origin/dev`：`inspection/index.vue:210-219`、`rescue/index.vue:26-35,100-112`、e2e spec 与专用配置；`ls-remote` 核对一致。
- 禅道 7035 `status=resolved / resolution=fixed / resolvedBy=tiany`，action `100944` 含截图附件 `24719`（已复核落库）；build 未重跑（按交接文档，hop1 基线 exitCode=0、本会话未改生产代码）。
- 清场排查过的 0 字节异常未跟踪文件 `({src`、`x.src.includes('code')`（08:41 shell 引号事故产物）与 `.task-state/`、`test-results/` 已清零，`job_list` 无残留后台任务；待定项无，链路终止不排程。
- hop1 硬交接文档 `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-禅道7035求援提交返回丢区域-hop1-20261127-0854.md`，排程 08:55:27 自动开新会话（hop1/10）。
- hop2 硬交接（触顶 P0 1.00M）文档 `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-禅道7035求援提交返回丢区域-hop2-20261127-0919.md`（9 节，第 4 节 4 项未完成），下一跳 `schedule-e0672784-1b62-4be8-a058-669574af7a2d` 2026-11-27 09:20:20 new_once 已完成收尾。


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7035",
  "source_extraction_id": "0a07c2af283e42238f7c965dfe1ad38c",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->