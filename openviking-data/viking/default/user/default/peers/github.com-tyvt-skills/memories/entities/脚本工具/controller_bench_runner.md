# controller-bench 评测运行器
controller-bench 评测套件的运行脚本 run-bench.ps1，位于 D:\repository\skills\controller-bench\，由 github.com/tyvt-skills 维护，用于多模型编排全量评测。

## 功能
- 按 model+task 组合跑全量评测，结果写入 results/bench-full.json
- 断点续跑：每行跑完即落盘，按 model+task 幂等跳过已完成项
- 支持 -Suite 参数指定套件（如 full）、-Gw 参数指定网关地址

## 设计要点
- runner 按断点设计，重启后可续跑
- 网关端口（重启前为 3425）可能随 DSH Web 重启变化，需 -Gw 传入新端口
- 续跑前需先停止后台 job，避免重启时被硬杀留下半写文件

## 关系
- 属于 D:\repository\skills 技能仓库的 controller-bench 子目录

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "脚本工具",
  "name": "controller_bench_runner",
  "source_extraction_id": "7203f5af392e467abc5a6d53d1c39f2f",
  "version": 1,
  "memory_type": "entities"
}
-->