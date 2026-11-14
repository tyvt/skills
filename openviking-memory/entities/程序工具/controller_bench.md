# controller_bench
controller-bench 是 D:\repository\skills\controller-bench 下的主控模型批量测试技能，用于评估编排器在不同大模型下的工具选择、步骤依赖、路由校准与效率表现。

## 描述
- 类型：主控模型（planner/controller）批量基准测试工具/技能
- 路径：D:\repository\skills\controller-bench
- 测试集：原 M1-M5 五类共 25 题（工具选择、步骤依赖、噪声坏工具、路由校准、效率），现扩展为 T1-T11 共 29 道任务（T8-T11 为环境交互对抗题）
- PLANNER_SYSTEM 注入编排器 10 工具原文描述用于评测
- 直连网关测候选模型（ping→screen 96 组合→full 350 组合）

## 评测方式
- 拒绝校准（reject calibration）检验模型是否拒绝不应执行的工具调用
- 幻觉工具题检验模型是否误判 execute_tools 等工具
- 2026-11-13 曾在 commit 4eae5751 跑过一轮 16 候选、总花费 $3.96 的基准（详见事件记忆）

<!-- MEMORY_FIELDS
{
  "category": "程序工具",
  "name": "controller_bench",
  "source_extraction_id": "a8f596e6caa44c1f997b8900addef7bc",
  "version": 2,
  "memory_type": "entities"
}
-->