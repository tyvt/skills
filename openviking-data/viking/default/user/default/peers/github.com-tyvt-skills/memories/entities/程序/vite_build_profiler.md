# vite-build-profiler
DSH skills 仓库中的构建性能排查专属 Skill，2026-11-13 作为 Fix4 新增（commit ce99ed19）。

## Description
- 用途：遇到「排查打包慢」时先加载本 skill 生成 bundle 报告，定位真凶（如内联大体积 SVG），禁止盲猜消融
- 实现：封装 vite-bundle-analyzer 或 rollup-plugin-visualizer，可直接调用生成可视化报告
- 构建执行：要求走编排器或后台，不阻塞主模型前台

## Relations
- 隶属 skills 仓库，与 agent-guard、dsh-explore 同属 DSH 工具链
- 由 github.com-tyvt-skills 于 2026-11-13 创建

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "vite_build_profiler",
  "source_extraction_id": "a94e055443a94543b7aee1591b418711",
  "version": 1,
  "memory_type": "entities"
}
-->