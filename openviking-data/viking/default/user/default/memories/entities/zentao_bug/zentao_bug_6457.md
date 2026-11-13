# 禅道 Bug 6457
禅道缺陷 6457 为苏住房防汛C端移动查询H5「首页/我的页待办计数不符及待处理文案」问题，历经两轮修复（首轮 2026-11-11 提交 72bc8cf，次轮 2026-11-12 提交 3dee5ab），均已回写禅道为已解决。

## Description
- 问题：首页待办角标显示 12，但进入任务列表仅显示 3；手持端应与G端一致（该账号G端为0）。附截图。
- 产品备注要求移除「待处理」文案（我的页任务菜单徽标上的字面文案）。
- 次轮（2026-11-12 lichandan 反馈）：待办角标显示 0，但任务中心列表仍显示 3 条待处理，两处应一致且正确。

## 根因与改动
- 首轮根因：首页与我的页待办计数取自流程引擎 `getTaskCount` 接口（`/v2.0/flowable/task/taskCount`）返回的 `todoNum`（演示种子值12），而任务中心列表取自 `getTodoTaskList` 接口（`/v2.0/flowable/task/todoTaskList`）返回的 `total`（3），两接口口径不一致造成不符。
- 首轮修复：首页 badge 与 mine badge 统一改为读取 `getTodoTaskList().total`，使「首页显示X = 进入列表X」；我的页 `mine/index.vue:34` 原展示字面「待处理」徽标改为数字计数；移除不再被引用的 `getTaskCount` API 包装，提交 `72bc8cf`。
- 次轮根因：首轮修复后首页角标已正确显示 0（该账号确实无待办），但任务中心列表在 remote 模式下接口返回空列表时，`fetchList` 仍回退到 3 条 demo 假待办（`mock/portalSeed.ts` 的 `seed-task-1/2/3`，状态均为「待处理」）——即「角标 0 / 任务中心 3 条」的来源。
- 次轮修复：按用户指示，remote 模式下移除全部 mock/seed 回退，一律真实数据/空态；`portalData.ts` 的 `fetchList`/`fetchHome`/`fetchStudyTab`/`fetchMine`/`fetchDetail` 的 seed 兜底全部限定 demo 模式，空数据与接口异常显示真实空态或 0；`home/index.vue`、`mine/index.vue` 初始 ref 不再挂 `SEED_HOME`/`SEED_MINE`，remote 初始为空态（骨架屏）；`portal.test.ts` 新增「remote 空数据不回退 seed」用例，提交 `3dee5ab`。

## 处理时间线
- 首轮（2026-11-11）：助手在 worktree 探索代码，定位计数来源与文案位置，应用编辑并通过 vue-tsc 类型检查（exit 0）；提交 `72bc8cf`（三文件：src/utils/portalData.ts、src/pages/mine/index.vue、src/api/portal.ts）推送到 `origin/dev`；DBX 回写禅道 resolved/fixed，`resolvedBy=tiany`，`assignedTo` 退回 `lichandan`，`zt_action 90929` 已落库；禅道元数据 `openedBy=lichandan`，`product=79`，`project=141`，`execution=142`。
- 次轮（2026-11-12）：提交 `3dee5ab`（含 src/utils/portalData.ts、src/pages/home/index.vue、src/pages/mine/index.vue、tests/portal.test.ts）推送到 `origin/dev`；`npm test` 38/38 通过（含新增 remote 空态用例），`uni build -m test` 构建通过；vue-tsc 报错均为预存在（store/user.ts、utils/index.ts、watermark.ts，非本次文件），eslint 仓库未配置未执行；未执行 remote 手工部署验证（无测试账号凭据，已在禅道备注请测试回归）；禅道 6457 二次回写 resolved/fixed，`assignedTo` 退回 lichandan；计划存档 `.plan/bug-6457-round2.md`。

## 当前状态
- 禅道 6457 为 resolved/fixed，assignedTo=lichandan。
- 代码已两轮推送到 `origin/dev`（72bc8cf、3dee5ab）；建议测试回归确认计数一致。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6457",
  "source_extraction_id": "fd2bbc92fd8b447f94bc750ebc26ef59",
  "version": 4,
  "memory_type": "entities"
}
-->