# dsh plan_review（orchestrate 计划评审）
DSH 编排器的计划评审接口，通过 orchestrate op=plan_review 调用，JS 层在 dsh/orchestrator/lib/index.js，Python 桥接层在 dsh/langgraph-orchestrator/src/jsonbridge.py，计划解析在 src/plan_versions.py；参数校验共三层（JS → jsonbridge → plan_versions）。

## 契约
- 修复前只传 plan_path 会被 JS 层以“需要 plan 参数”拒绝，且 Python 的 prepare 不会读取文件。
- 修复后 JS 仅在 plan、plan_path、delta 三者皆空时报错，并新增 validatePlanPath 预检（相对 workdir、须为 .plan/*.md 且存在）。
- 第三层校验在 Python 桥 jsonbridge.py:68-71：守卫原先只看 plan/delta、不认识 plan_path，会以“plan 或 delta 必填”把只给路径的请求挡在 run_plan_review 之前（2026-11-16 补修，守卫已纳入 plan_path，文案改为“plan 或 delta 或 plan_path 必填”）。
- Python prepare 在 text 为空且无 delta 时从 plan_path 读取文件；大小闸 MAX_PLAN_CHARS=16000（镜像 api.PLAN_REVIEW_CLIP_CHARS）。
- digest 由 canonical_plan 归一化（去 BOM、CRLF→LF）保证文件读取与内联文本一致；读取后不能 strip 再算 digest。

## 验证与部署
- 2026-11-16 修复后 pytest 34 passed（含 7 个新用例与 e2e run_plan_review(plan_path) 返回 pass），orchestrator selftest 全通过，本地提交 19616855。
- ~/.dsh/orchestrator 是指向仓库的符号链接，运行中的 Web 进程持旧 JS，需重启才生效；Python 侧每次调用重新 spawn 子进程、实时读 jsonbridge.py，改完无需重启。
- 2026-11-16 重启后 live orchestrate 只给 plan_path 验证：报错逐层推进，从 JS 的“需要 plan 参数”→“plan 或 delta 必填”→最终越过所有守卫真正跑起 plan_reviewer 模型（约 120s 停顿是在等模型，不是校验报错）。
- jsonbridge 直探（plan_path + 故意坏 workdir）不再报“必填”，而是进到 resolve_plan 才报 FileNotFoundError，证明守卫已放行、文件读入链路通。
- 提交 19616855（JS+prepare+测试）与 295dc63e（jsonbridge 补丁）均已 push 到 origin/main（99a0e514..295dc63e）。
- 范围外遗留：plan_review 同步阻塞（约 120s 阻塞宿主）属 P0-1(b)，需另立异步 job 计划。

## 相关
- 计划文档存放在仓库 .plan/ 目录，命名如 cost-meter-inject-fix-20261116.md；评审由 plan_reviewer 模型执行并给出评分与 PASS/失败。

<!-- MEMORY_FIELDS
{
  "category": "技术工具",
  "name": "dsh_plan_review",
  "source_extraction_id": "7636d9a2c8fe4ce7bacfce67f8a3b6f0",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->