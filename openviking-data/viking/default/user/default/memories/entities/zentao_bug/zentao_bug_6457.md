# 禅道 Bug 6457
禅道缺陷 6457 为苏住房防汛C端移动查询H5「首页/我的页待办计数不符及待处理文案」问题，2026-11-11 由助手实现修复、提交并回写禅道为已解决。

## Description
- 问题：首页待办角标显示 12，但进入任务列表仅显示 3；手持端应与G端一致（该账号G端为0）。附截图。
- 产品备注要求移除「待处理」文案（我的页任务菜单徽标上的字面文案）。

## 根因与改动
- 首页与我的页待办计数取自流程引擎 `getTaskCount` 接口（`/v2.0/flowable/task/taskCount`）返回的 `todoNum`（演示种子值12），而任务中心列表取自 `getTodoTaskList` 接口（`/v2.0/flowable/task/todoTaskList`）返回的 `total`（3），两接口口径不一致造成不符。
- 修复：首页 badge 与 mine badge 统一改为读取 `getTodoTaskList().total`，使「首页显示X = 进入列表X」。
- 我的页 `mine/index.vue:34` 原展示字面「待处理」徽标，改为展示数字计数（保留信息且移除文案）。
- 移除不再被引用的 `getTaskCount` API 包装（无测试引用），提交 `72bc8cf`。

## 处理时间线
- 助手在 worktree 探索代码，定位计数来源与文案位置，应用编辑并通过 vue-tsc 类型检查（exit 0）。
- 提交 `72bc8cf`（三文件改动：src/utils/portalData.ts、src/pages/mine/index.vue、src/api/portal.ts）并推送到 `origin/dev`，随后通过 DBX 事务回写禅道：bug 置 resolved/fixed，`resolvedBy=tiany`，`assignedTo` 退回 `lichandan`；`zt_action 90929`（resolved/fixed/read=0）已落库。
- 禅道元数据：`openedBy=lichandan`，`product=79`，`project=141`，`execution=142`。

## 当前状态
- 禅道 6457 为 resolved/fixed，assignedTo=lichandan。
- 代码已推送到 `origin/dev`；验证仅执行 `vue-tsc` 类型检查（exit 0），未执行 H5 全量构建/本地 8099 部署（vitest 与 vite 版本不匹配）；建议本地联调确认计数一致。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6457",
  "source_extraction_id": "f74056f0fe39462c9b5f98c8aca19145",
  "version": 2,
  "memory_type": "entities"
}
-->