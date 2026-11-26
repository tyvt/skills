# 禅道 Bug 7008
苏住房防汛 C 端移动查询 H5「汛后整改与复盘」提交必填校验缺失缺陷；2026-11-26 完成代码/单测/build 修复、实机 toast 验证、提交推送与禅道回写，chain `bug7008-flood-post-validate` 已终止。

## 工单与现象
- 禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7008；openedBy=lichandan，product=79/project=141/execution=142，原 status=active；2026-11-26 会话先加载 zentao-analyzer 拉取工单详情与部署环境。
- 缺陷：汛后「整改与复盘」提交时缺少必填校验，工作区为防汛 C 端 H5。
- 根因：`bug6754` 注释写明汛后表头字段「不设必填」，工单 7008 要求提交时校验。
- 定位到 `src/pages/inspection/index.vue`（汛后「整改与复盘」）的 `submit` 与校验逻辑，整改区块在源码中已存在；检索 `防汛C端`/`suzhufang-c` 部署配置与 `views` 目录，中文关键词未命中。

## 代码改动与验证
- 必填范围：「整改与复盘」五字段 + 现场照片均带红色 `*`，而非仅「物业管理区域」必填。
- 新增 `src/utils/postInspectionValidate.ts:1` 的 `validatePostExtraForm`；`src/pages/inspection/index.vue:217` 提交前调用并加 `*` 标签；`src/styles/theme.css:140` 红星号样式。
- `tests/flood.test.ts` 新增 bug7008 用例，共 127 tests 通过；`npm run build` exitCode=0。
- 截图 `bug7008-post-section-20261126-110119.png` 证整改区块与星号；PC 端在苏住房 G 仓，本仓未改。

## 实机 toast 验证（2026-11-26）
- 关键逻辑：URL 带 `complexId` + `eventId` 两个非空参数即进入 `fromStageDialog` 分支锁定区域并设置 `complexId`，提交时 `buildRemoteValues` 越过「请选择物业管理区域」命中 `validatePostExtra`（「请输入整改措施」）。
- dev 8161（与 local 同一 dist）带参打开汛后检查页，五项留空点「提交」→ 页面中央深色 toast「请输入整改措施」，命中核心验收点。
- 证据图 `C:/Users/Administrator/AppData/Local/Temp/bug7008-post-toast-20261126-111900.png` 已入会话、自检五项通过并经用户确认。
- 实操坑：URL 中 `&` 被 Windows cmd 截断，用 `eval` + `String.fromCharCode(38)` 规避；Edge newtab 抢焦点、session 不跨命令持久，改用 `agent-browser batch` 单进程完成导航+提交+截图；8150 无监听改用 8161/8162。

## 提交、回写与收尾
- 仅提交 3 个 7008 文件：`theme.css` 红星号 + `postInspectionValidate.ts` + `postInspectionValidate.test.ts`；`index.vue`/`flood.test.ts` 已在先前 HEAD，他人 notice-preview 改动未混提；commit `3abf23b` 推送 dev，remote/local SHA 一致。
- 禅道回写 resolved/fixed，resolvedBy=tiany、指派回 lichandan；验证图 fileID 24561 内嵌评论并挂载（zt_action files），事务复核通过已提交。
- 收尾：TEMP 过程产物清零、后台任务全部停止、交接文档 `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-bug7008-hop1-20261126-1105.md` 第 4 节标注清空与链路终止。
- 待定：PC 端（苏住房 G 仓）同需求属另仓，不在本 chain 范围。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7008",
  "source_extraction_id": "322662b2de7a4de69f00264add4b7168",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->