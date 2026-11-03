# 审批key从flowViewer响应动态获取（std-evaluation）
在标准化评价E2E审批中，ApprovalInfoDto的key必须是当前实例待办节点id，从flowViewer响应里取completed:false节点的id，禁止硬编码。

## 背景与约束
- Flowable流程版本id与任务节点id均为运行时生成，环境重建或流程版本变更后硬编码立即失效，失败表现为审批无反应或报节点不存在
- 审批key须与当前实例待办节点对应，任何写死的值只是「这次能用」

## 正确做法
- 审批前调 POST /v2.0/flowable/task/flowViewer {busCode, dataId} 获取节点列表
- 从响应挑 completed:false 的节点取它的 id 作为 key，不要取第一个或固定index
- 组装审批体 {dataId, busCode, key, approveResults:'1', approveMessage}（approveResults:'1'为同意）
- 用例断言真实 0→1→2 流转，不用mock节点id
- 取key逻辑封装进公共库 e2e/std-evaluation/lib/std-eval-lib.cjs 供所有审批动作共用

## 验证与归属
- 来源会话 d38c482b-a854-4693-99d7-ccd429f31165（基线05caac8）用户诉求3
- 涉及文件 e2e/std-evaluation/lib/std-eval-lib.cjs、e2e/std-evaluation/cases/01-standard-crud.cjs

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_approval_key",
  "source_extraction_id": "3e2e7f4e118548deb96ba4904d71db2b",
  "version": 1,
  "memory_type": "entities"
}
-->