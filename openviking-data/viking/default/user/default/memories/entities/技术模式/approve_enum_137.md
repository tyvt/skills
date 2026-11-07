# 审批动作枚举仅 1/3/7
审批结果 approveResults 合法值只有 1/3/7，传 '2'（直觉退回）会被引擎拒为「审批结果不合法」并 500。

## 合法值语义
- 1：终审（同意），置 bizState=2 并把 pending 回写为五类等级/evalLevel/频次，变更记录+1。
- 3：另一合法值（具体语义待补）。
- 7：撤回，回退 bizState 到 0 且 pending 不回写。

## 排查教训
- 审批结果枚举来自流程引擎，前端/脚本按日常语义猜（1=同意、2=拒绝）会在引擎层被拒，错误信息不告知合法值。
- 需用探针脚本逐值试出合法集（submit→approval(2)=500），结论写进 API 映射文档。

## 调用规范
- 审批体固定 {dataId, busCode, key, approveResults, approveMessage}。
- key 从 POST /v2.0/flowable/task/flowViewer {busCode,dataId} 响应取 completed:false 节点 id（不硬编码）。
- 撤回与终审副作用不同（撤回不清 pending，终审清 pending 回写业务字段），断言分别写。

## 验证与归属
- 来源会话 00e04b09-06b5-44c0-9662-cf41dca07319（基线 05caac8）
- 涉及文件：e2e/std-evaluation/cases/02-service-grade-crud.cjs；e2e/std-evaluation/lib/std-eval-lib.cjs；docs/std-evaluation/api-map-grade.md
- 结论：D12 中 | 新发现（已报给 Lead）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approve_enum_137",
  "source_extraction_id": "6f248a62204c446d94da2fddb78663b8",
  "version": 1,
  "memory_type": "entities"
}
-->