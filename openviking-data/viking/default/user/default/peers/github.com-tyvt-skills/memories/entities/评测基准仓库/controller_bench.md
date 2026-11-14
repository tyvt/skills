# controller_bench
github.com-tyvt-skills 维护的主控模型评测基准仓库，实际目录名为 controller-bench，位于 D:\repository\skills\controller-bench。

## Description
- 用于评测多模型编排器中主控模型的工具选择、计划完整性、计划效率、路由/拒绝校准四维能力
- 测试题定义在 tasks-master.json，2026-11-14 含 T1–T11 + M6–M10 共 35 道任务（T1–T7 执行层 + T8–T11 综合对抗 + M6–M10 多轮纠错/扇出去重/长上下文判读/多模态判读/diff评审，提交 b013ef3f）
- 含 run-bench.ps1（支持 -Suite full -DryRun 仅打印不调网关）、score.ps1、score-t.ps1（T题单独聚合不进混淆矩阵）、compare.ps1（M vs T 对照）等评测脚本

## Relations
- 隶属于 D:/repository/skills 根仓库，为普通子目录而非 git submodule
- T8–T11 为"环境交互"对抗题：防拦截自救、长任务异步化、插件崩溃恢复、并发防挤兑

<!-- MEMORY_FIELDS
{
  "category": "评测基准仓库",
  "name": "controller_bench",
  "source_extraction_id": "e98da92f15f34cb2b92ccd6e9d16a846",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->