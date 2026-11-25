# 禅道 Bug 6457
苏住房防汛 C 端移动查询 H5「首页/我的页待办计数不符及待处理文案」缺陷，2026-11-11、2026-11-12 两轮修复（72bc8cf、3dee5ab 已推 origin/dev），当前禅道 resolved/fixed、assignedTo=lichandan，建议测试回归确认计数一致。

## 问题现象
- 首轮：首页待办角标 12，任务列表仅 3；手持端应与 G 端一致（该账号 G 端为 0），附截图。
- 产品备注要求移除我的页任务菜单徽标上的「待处理」字面文案。
- 次轮（lichandan 反馈）：角标已为 0，任务中心仍显 3 条待处理，两处需一致且正确。

## 根因与修复
- 首轮根因：首页/我的页取 getTaskCount（/v2.0/flowable/task/taskCount）todoNum（演示种子 12），列表取 getTodoTaskList（/v2.0/flowable/task/todoTaskList）total（3），口径不一致。
- 首轮修复：首页/我的页 badge 统一读 getTodoTaskList().total；mine/index.vue:34「待处理」徽标改数字计数；删除无引用的 getTaskCount API 包装。
- 次轮根因：remote 空列表时 fetchList 仍回退 3 条 demo 假待办（mock/portalSeed.ts 的 seed-task-1/2/3，状态均「待处理」），造成「角标 0 / 任务中心 3 条」。
- 次轮修复：remote 移除全部 mock/seed 回退；portalData.ts 的 fetchList/fetchHome/fetchStudyTab/fetchMine/fetchDetail seed 兜底仅限 demo，空数据与接口异常显示真实空态或 0；home/index.vue、mine/index.vue 初始 ref 不再挂 SEED_HOME/SEED_MINE（remote 初始骨架屏空态）；portal.test.ts 新增「remote 空数据不回退 seed」用例。

## 提交与回写
- 首轮（2026-11-11）：worktree 定位计数来源与文案位置，vue-tsc 通过（exit 0）；提交 72bc8cf（src/utils/portalData.ts、src/pages/mine/index.vue、src/api/portal.ts）；DBX 回写 resolved/fixed、resolvedBy=tiany、assignedTo 退回 lichandan，zt_action 90929 落库。
- 禅道元数据：openedBy=lichandan、product=79、project=141、execution=142。
- 次轮（2026-11-12）：提交 3dee5ab（src/utils/portalData.ts、src/pages/home/index.vue、src/pages/mine/index.vue、tests/portal.test.ts）；npm test 38/38 通过（含 remote 空态用例），uni build -m test 构建通过。
- 次轮检查：vue-tsc 报错均预存在（store/user.ts、utils/index.ts、watermark.ts，非本次文件）；eslint 未配置未执行；未做 remote 手工部署验证（无测试账号凭据，已备注请测试回归）。
- 次轮回写 resolved/fixed 并退回 lichandan；计划存档 .plan/bug-6457-round2.md。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6457",
  "source_extraction_id": "3253f0e28f0d4f8da93c093238b6d10d",
  "version": 12,
  "memory_type": "entities"
}
-->