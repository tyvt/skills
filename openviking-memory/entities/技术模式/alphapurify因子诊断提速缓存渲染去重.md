# AlphaPurify 因子诊断提速：进程内缓存与报告渲染去重
在不改官方 alphapurify 1.0.6、不降级分层/horizon 精度的前提下，瓶颈多在重复加载快照与指标聚合。

## 提速方案
- alphapurify_bridge/adapters/cache.py 做进程内缓存（冷启动仍慢，三次平均后单因子 10 年可 <5s、六因子批量 <30s）
- Markdown/HTML 共用一次图表渲染去重
- verify/compare_perf 脚本落 perf_baseline.json 与 logs/alphapurify_perf.log

## 配置约定
- 默认与 --full 保持 10 层与完整 horizons
- 仅 --fast 才 5 层/3 horizons
- 全历史诊断仍可能 ~80% 时间在指标聚合

## 验证与归属
- 验证证据：单因子 10.43s→3.08s（70.4%）；六因子 37.57s→12.17s；数值最大误差 0；回归 12/12；峰值内存增量 3.75GB
- 涉及文件：alphapurify_bridge/adapters/cache.py、alphapurify_bridge/utils/profiler.py、alphapurify_bridge/diagnostics/runner.py
- 所属项目：投资推送；来源会话ID：rollout-2026-08-26T09-55-01-01a03bc7-20de-7822-91d4-cba7500e47ba

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "AlphaPurify因子诊断提速缓存渲染去重",
  "source_extraction_id": "7eac30c14d0d4f3587b7971c8785e48f",
  "version": 1,
  "memory_type": "entities"
}
-->