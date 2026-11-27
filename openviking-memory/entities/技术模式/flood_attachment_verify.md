---
audit_status: valid
last_checked: 2026-11-27T20:10:30+08:00
verdict_note: 防汛C端src/stores/flood.ts含photosToInspectionFiles/photosToAttachUrl/buildSavePayload，附件字段实现属实。
---
# 苏住房防汛C端H5 附件字段保存验证
`zhi2-mobile-query-h5-c-unlimited` 在 chain `flood-attachment-local-verify`（2026-11-26）完成汛前检查保存请求附件字段补齐、实机抓包验证与提交推送，链路已收口。

## 链路目标与进度
- chain_id=flood-attachment-local-verify，hop3 收口、第 4 节未完成项清零；目标为 8162 浏览器 UI 实操「汛前检查→上传现场照片→存草稿/提交」，Network 证 save body 含 `inspectionFileUrl`/`inspectionFileName`（求援含 `attachUrl`），出全页截图并过用户验证门。
- 验收口径「存草稿或提交」body 含字段 + 全页截图 + 用户确认；用户上一轮选「补 UI+Network」，两轮验证门（提交路径 hop3、存草稿路径末跳）均通过。
- hop1 做 8162 登录闭环与附件字段抓包/截图（单测 121 passed）、hop2 build（等效成本约 1.02M 触发 P0 硬交接）、hop3 提交路径抓包均未在末跳重跑；按交接文档第 9 节核对目标与待办回报，不重跑已通过项。

## 代码改动与修复
- 附件字段核心实现在 `src/stores/flood.ts`（hop1，勿重做）：`photosToInspectionFiles`/`photosToAttachUrl` + 两处注入；`buildSavePayload`(:286) 调 `photosToInspectionFiles(values.photos)`；提交走 `buildRemoteValues()`(:254，带 `photos: form.photos`) 与 `submitInspectionRemote`(:334，也走 buildSavePayload)。
- 存草稿缺口已修：原 `index.vue:261` draft 未带 `photos`（提交路径 :254 有），save body 无附件字段、实测 400（汛前必填选择项：雨水井清掏、配电房防水封堵、低洼楼栋疏通）；末跳 draft 补 `photos` 并加一条回归用例（draft 带 photos → syncDraftToCloud save 含附件字段），vitest 121→128 passed、build DONE、dist chunk 更新为 `flood.BL-SK-Y-.js`（hop2 为 `flood.BDbx-9of.js`）。
- 修复走计划审批：plan_review PASS 84/100、approved_sha256 `25bdbcc5…`；P1 建议（实机先选图再存草稿、单测覆盖、用例名断言）在实施的落实且不改已审版本以免 sha 失配；计划确认通过，禅道回写用户明示跳过。

## 验证方法与证据
- 早期窄路径：查路由鉴权后注入 token 直达检查页核对保存载荷附件字段；2026-11-26 02:53–03:02 模板项未加载，改为页面内注入照片抓 save body，先窄读照片 store 持久化键，先跑 `npm run build` 过 build-gate 再注入 token 验证。
- 提交路径：`POST .../inspection/save` 200，body 含 `inspectionFileUrl:"/zhi2-dev/2026/r/4/t/332be3a5-...jpg"`+`inspectionFileName:"332be3a5-...jpg"`，随后 `/inspection/submit` 200；网关详情回读 id `2125782711004164098` 一致。截图 `C:/Users/Administrator/AppData/Local/Temp/flood-ui-form-photo-20261126-111500.png`（1256×1956、76982B，表单+现场照片 1/6）。
- 存草稿路径（修复后）：实机上传照片点「存草稿」，`POST .../inspection/save` body 含 `inspectionFileUrl:"/zhi2-dev/2026/m/t/v/4afa54fe-...png"`+`inspectionFileName`（修复前无）；status 400 为汛前必填项全空业务校验、与附件字段无关，本地草稿已存。截图 `C:/Users/Administrator/AppData/Local/Temp/flood-draft-verify-20261126-112440.png`（1256×1956、84089B，底部「草稿已保存在本设备」）。两图自检五项通过、内嵌、用户确认。

## 浏览器实操要点
- 登录态用 `sessionStorage`（`authStorage.ts:16-17`）而非 localStorage；仅 set localStorage + reload 会停登录页，须注入 sessionStorage 再 reload；URL token 为同文档 hash 变化不触发 onLaunch；token 经 `/api/v2.0/system/user/getInfo` 校验（网关前缀 `/api`、`VITE_API_BASE_URL`）。
- UI 流：工作台→防台防汛→汛前检查→弹窗选预警事项/小区→确定；选「20261110001汛前检查」+「苏锦一村（锦月新居）」。上传走 `uni.chooseImage → store.add → uploadFile`（fetch+FormData，非 XHR），须先点「＋拍摄」/`.photo-upload` 触发 choose() 再 upload，接口 `./api/v2.0/file/file/upload`，成功 1/6，用自检有效表单截图 png 作上传源（约 75KB）。
- 缓存坑：8162 曾加载旧 chunk `flood.Bc6gUIj1.js`，清缓存硬刷加载 `flood.BDbx-9of.js` 后 save body 仍无字段，确认为真实代码现象非缓存；末跳 reload(true) 加载 `flood.BL-SK-Y-.js`。Windows 下用 `eval` + `fromCharCode(38)` 设 hash，避免 `&` 被 cmd 拆开。

## 提交与收尾
- 用户确认验证门并授权提交推送；本仓为独立项目（`D:/repository/苏住房防汛C端 | dev`，非子模块），eslint 未安装跳过（vitest+build 已过），ahead=0 behind=0 免 rebase。
- 两提交推送 dev（远端 `c1cf01cf`）：`c1cf01c` feat(flood) 补附件字段 helpers（hop1 核心实现此前遗漏未提交、末跳补提）、`9516c95` fix(flood) 存草稿路径补 photos；`flood.ts` 21 行 diff 属本任务必须一并提交，否则远端修复残缺。
- 禅道回写按用户明示「本任务无禅道」跳过（三份交接文档均无禅道链接）。过程产物（TEMP 截图/日志、`.task-state/`、shell 垃圾）全清、后台 job 完结；工作区其他在途改动（`notice-preview/index.vue`、`theme.css`、`postInspectionValidate`）非本任务、未触碰。
- 交接文档 `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-flood-attachment-local-verify-hop3-20261126-1115.md`（9 节）、早前 `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-flood-attachment-hop2-20261126-1101.md`（排程 schedule-831e5c0b-1a41-49a3-96cd-69473c09c214，new_once 约 11:02:15）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flood_attachment_verify",
  "source_extraction_id": "03fe6609a2774fd48a84dd74d340ad1f",
  "version": 5,
  "memory_type": "entities"
}
-->