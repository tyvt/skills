# DSH 构建基线门禁
提交前需先补构建基线：后台跑 `npm test`（test 模式构建）并配 watchdog 监听。

## 要点
- eslint 通过后再跑构建基线，然后进入禅道带图回写与提交决策
- watchdog 脚本路径：`D:\repository\skills\dsh\scripts\task-watchdog.ps1`
- watchdog 参数多次不匹配时，改为直接后台跑 `npm test`、日志落 `.task-state` 更稳妥

## 归属
- 来源会话：2026-11-24 苏住房G 禅道任务 6899 收尾流程

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "dsh_build_gate",
  "source_extraction_id": "c48961d284834f84883e133aeb508277",
  "version": 1,
  "memory_type": "entities"
}
-->