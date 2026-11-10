# op=tool 审计链路与账单修复
多模型编排系统在 op=tool 模式下审计链路断裂、账单缺失及 stdout 污染问题的修复方案。

## 问题根因
- op=tool 下编排器把 [usage] 打进 stdout，导致解析崩溃且单次调用未记账单
- 工作期间 stdout 混入日志、报错、[usage]，无法保证只输出最终 JSON

## 修复方案
- src/router.py：[usage] 改打到 sys.stderr
- src/jsonbridge.py：工作期间把 sys.stdout 换 stderr，最终只向真实 stdout 写一行 JSON
- src/api.py：run_tool 增加 session_id，按 op=full 同格式追加 .sessions/<id>.costs.jsonl
- orchestrator/lib/index.js：op=tool 也带上宿主 session_id
- 新增 tests/sample_billing/prorate.py 和 tests/test_prorate.py（原 bug 分子分母写反、负数未归零）

## 账单与验证
- op=full 规划、读文件、生成、审查、生成命令、汇总均跑通并写出完整账单，四个断言通过
- 本机 pytest 会话启动崩溃（NodeId._str_cache），改用等价直接断言验证
- op=full 未带 session id 时落在 .sessions/anonymous.costs.jsonl
- op=full payload 原仅从 `exec.sessionId` 取会话 ID，宿主实际挂在 `exec.agent.id` 上，导致一直为空而落 anonymous；已补上 `exec.agent.id` 取值（2026-11-10）
- 宿主调用 orchestrate（op=full）自身输入、缓存、输出 Token 无接口可取，不报数字

## 部署注意事项
- 宿主实际加载的插件为 `~/.dsh/orchestrator`，而非开发目录 `skills\dsh`；安装目录插件是旧副本（非链接），修改后需同步进安装目录并重启 Web 进程方能生效（2026-11-10）

## 涉及文件
- src/router.py、src/jsonbridge.py、src/api.py、orchestrator/lib/index.js
- scripts/cost_bill.py、tests/sample_billing/prorate.py、tests/test_prorate.py

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "audit_link_fix",
  "source_extraction_id": "76556331c9454f4cafe584abf72d12b7",
  "version": 2,
  "memory_type": "entities"
}
-->