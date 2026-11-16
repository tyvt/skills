# 数据湖分析产出目录
数据湖选股项目在 D:\repository\数据湖\分析产出 下的分析脚本与产物目录。

## 概况
- 2026-11-16 清理后由 64 个文件精简至 21 个：14 个活跃脚本、当期产物、治理清单与持仓面板。
- 活跃脚本包括 final_portfolio_v3.py、annual_review.py、screen_sh.py、screen_sz.py 等。
- 目录约 90 个文件中的过时与冗余项已删除，保留项均通过 py_compile 或无悬空引用复查。

## 关联与依赖
- Update 定时任务走 scripts/update_selection_lake.py，仅依赖 update_external_lake/external_lake，不依赖本目录待删文件。
- Audit 定时任务独立写抽检两件。
- 策略与代理配置位于 configs/selection_lake_policy.json，GitHub 推送使用本地代理 127.0.0.1:7890。

## 关键事实
- 2026-11-16 删除 8 个过时产物、3 个孤儿脚本（build_bench.py、rebuild_sz_md.py、audit_lake.py）、归档_20261105 目录（33 文件）及 __pycache__。
- _review.json 是数据湖 parquet 清单快照，无脚本引用，删前备份为 .task-state/_review.json.bak-20261116。
- final_portfolio_v3.py:16 默认 base 由 2026-11-06 改为 2026-11-13，11-13 版成员权重与替补席 CSV 已入库。
- 清理提交 98c907d3 含 63 文件（+1599/−10201），经本地代理推送 origin/main 成功。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "项目目录",
  "name": "analysis_output_directory",
  "source_extraction_id": "86c8710ec78b425096e1592a00d8680d",
  "version": 1,
  "memory_type": "entities"
}
-->