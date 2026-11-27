# openviking-retrieval-help-埋点
openviking 检索帮助链路的插件采纳/返工上报闭环工程任务，于 2026-11-27 由 github.com-tyvt-skills 完成收尾并提交推送。

## 目标与过程
- 目标：完成插件采纳/返工上报闭环并收尾，链路处于 hop=3、无 maxHops，不因跳数终止。
- 计划经 plan_review（PASS，82 分），审核提出 3 个 P1 灰区并入同一次人工确认，不拆多轮。
- 计划获人工确认后回填审批元数据并按 worktree-snapshot 检查落地。

## 实现要点
- 服务端新增 POST /api/v1/search/help-feedback，经 middleware / datasource / projection 入审计（projection.py:299）。
- 插件 recall 注入 X-Request-ID、采集 URI，commit/dispose 批量上报（runtime.mjs、client.mjs）。
- 反馈循环原被缩进包在 if retrieval_operation: 内，/help-feedback 不属检索操作故从未执行；修正缩进后重启复验。
- 幂等性由 sqlite upsert 天然保证。

## 验证与结果
- 验证：search→feedback→SQL 断言行更新为 (1,1)，重复上报幂等，非法 request_id accepted=0，Node 客户端 SQL 断言通过，py_compile/node --check 通过。
- 构建未执行（仓库根无 package.json，纯 Python/插件补丁）。
- 提交 e34e7d36 已推送，origin/main 哈希一致；临时探针已清理，无后台任务。
- 遗留：插件 runtime e2e 未实机跑通（CLI 环境缺 @deepseek-ai/dsh-llm），仅静态语法检查；DSH web 重启后新逻辑生效。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "工程项目",
  "name": "openviking-retrieval-help-埋点",
  "source_extraction_id": "019dd0f00c31469991d20f59a8b8912e",
  "version": 1,
  "memory_type": "entities"
}
-->