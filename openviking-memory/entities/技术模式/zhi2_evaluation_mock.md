# 苏住房防汛C端物业自查mock配置
苏住房防汛C端H5(zhi2-mobile-query-h5-c-unlimited)的物业自查(project-check)模块演示数据，按 Lead 要求于 2026-11-06 新增。

## 环境变量与开关
- `VITE_EVALUATION_MOCK=true` 时注入物业自查演示数据；`isEvaluationMockEnabled()` 仅认此值
- test 构建(`uni build -m test`)读 `.env.test`：2026-11-09 起 `VITE_EVALUATION_MOCK` 改为显式 `false`(原 `true`)；`.env.example` 增补说明
- 生产 `.env`(`VITE_DATA_MODE=remote`)未设此 flag，联调真实接口不受影响

## 演示数据
- 种子文件 `src/mock/evaluationSeed.ts`(446行)：统计(128/76/34/9)、待办2条、已完成4条、物业管理区域5个、五类服务检查表单、检查详情与整改详情
- `src/stores/evaluation.ts` 所有读接口在 `isEvaluationMockEnabled()` 为真时返回 mock，其余行为不变
- `src/utils/dataMode.ts` 新增 `isEvaluationMockEnabled()`

## 验证与归属
- 2026-11-06 提交 ae35a7d 并推送 origin/dev(83bddfa..ae35a7d)
- nginx 8095 站点部署 test 构建 dist，Playwright 探针 19/19 全通过(列表/发起/填写/详情/整改)
- worktree 开发后 rebase 到 dev 合并，临时分支清理
- 2026-11-09 随 flood mock 一同关闭：`.env.test` 改 `VITE_EVALUATION_MOCK=false`，提交 fd05a55 推送 origin/dev；test 包走真实接口

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_evaluation_mock",
  "source_extraction_id": "f85698defd2b4f5295e604b8f00a496d",
  "version": 3,
  "memory_type": "entities"
}
-->