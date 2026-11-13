# 路由缺失日志系统
在 langgraph 编排器中补充的路由可观测性方案，用于记录"该选未选"的工具分流错误，并于 2026-11-13 实施 P1 修复消除误报。

## 核心设计
- [ROUTE-MISS] 标记：明确该用更专精工具却选了 code_editor 或 planner 时记录
- route_source 三态：planner（规划器正常返回并选中，计入命中率）、fallback_planner（规划解析失败静默强塞 planner，不计入）、unknown_tool（规划器给了未定义工具名，单独统计）
- node_plan:712-714 存在静默失败：规划失败时默认给 planner，与跑题兜底相同，须靠 route_source 区分归因
- log_route 落盘 decision（miss/ok/ambiguous/exec）+ why，弱命中仅观测不计 MISS

## 统计脚本
- route_stats.py：分母为每一次规划决策，输出 route_source 分布、decision 分布、分流命中率（仅 planner）、兜底率、MISS 去向附 why、旧行口径兼容
- offtask_stats.py：分母为已选中的代码类调用，衡量输出质量
- 两脚本分母不同：路由日志分母是每次规划决策，off-task 分母是代码类调用

## 判定逻辑
- expected_tool()（graph.py:153-169）原做单词子串匹配致误报（"验证"命中 signal、"代码/脚本"命中 code_words），已改三级判定：命令形态执行标记压倒工具词 → signal 触发词 → code 词排除纯分析
- 新增 _classify_request 做请求分类；plan_tools 反向验证仅限 code_editor 路径（signal 不豁免，强信号路径不作用反向豁免以免破坏真 MISS 测试）
- route_miss（graph.py:827 唯一生产调用点，L194 返回 Optional[Dict]）现带 why 键可解释化，非破坏性扩展
- 关键测量警示：ROUTE-MISS 计数不等于路由失效率，REPORT.md 7.0 节已写入以防止二次误读

## 相关文件
- dsh/langgraph-orchestrator 下的 graph.py、route_stats.py、REPORT.md（7.0 节"ROUTE-MISS 计数不是路由失效率"）、test_route_miss_weak_signal.py（6 用例锁 4 条误报）、.plan/route-miss-weak-signal-20261113.md


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_miss_logging",
  "source_extraction_id": "f5091b65c3c641668461b7ea772d9e9d",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->