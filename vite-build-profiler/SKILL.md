---
name: vite-build-profiler
description: 排查前端打包慢 / 包体积过大时，先用打包可视化工具生成报告定位真凶，禁止靠反复全量构建手动消融（Ablation）盲猜。当需求出现「打包慢、build 卡、bundle 太大、首屏加载慢、某个 chunk 特别大」时使用。
---

# vite-build-profiler — 打包性能画像

## 何时用

- 用户说「打包慢 / vite build 卡 / 构建要几分钟」；
- 「bundle 太大 / 某个 chunk 异常大 / 首屏加载慢」；
- 需要回答「到底是哪几个文件把包撑爆了」——先出报告，别先猜。

## 怎么用（先出报告，再动手）

**禁止**用「删一段 → 全量 build → 看快没快」的手动消融跑 4–5 次全量构建来定位真凶（复盘实例：靠消融跑到第 5 次才发现 1.85MB SVG 内联）。

1. 选一个可视化插件（按项目现有技术栈，二选一，不要两个都装）：
   - `rollup-plugin-visualizer`：`npm i -D rollup-plugin-visualizer`，在 `vite.config.{js,ts}` 的 `plugins` 里加
     ```js
     import { visualizer } from 'rollup-plugin-visualizer'
     plugins: [ visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true, open: false }) ]
     ```
   - 或 `vite build --mode production` + `--report`（若项目已配置）。
2. **构建走编排器或后台**（预期 >30s，禁止主模型前台直跑，见 AGENTS.md「前台长任务硬约束」）：
   - `orchestrate {op:"full", execution:{program:"npm", args:["run","build"]}}`（workdir 用绝对路径）；
   - 或 `pwsh` 加 `run_in_background:true`，日志落 `.task-state/build-profiler.state.json`，半分钟读一次。
3. 打开 `dist/stats.html`（treemap / sunburst），按 **size 从大到小** 排序，记录 Top 5 大文件与各自占比。

## 产出（≤30 行结论）

- 报告文件路径（如 `dist/stats.html`）+ 生成时间；
- Top 5 最大依赖/文件清单：`文件名 —— size（gzip）—— 占比%`；
- 每条给一句处置建议（如「1.85MB SVG 内联 → 改外链 / 压成 webp / 移出首屏 bundle」）；
- 明确「真凶是 X」而不是「可能是 X」——有报告就是证据。

## 约束

- 先有报告再动手优化，不许盲猜消融；
- 只装**一个**可视化插件，别重复引入增大构建；
- 报告是中间产物，别把 `dist/stats.html` 提交进仓库（加 .gitignore）；
- 结论超 30 行本身就是上下文污染，只回精炼清单。
