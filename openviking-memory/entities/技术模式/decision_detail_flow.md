# 查看表决流程接入
泰兴小程序维修项目已接入「查看表决」流程，从对象详情跳转至表决详情页。

## 修改内容
- `maintainProject.js` 新增接口封装 `selectDecisionDetail(params)` -> `GET /v2.0/maintenance/miniapp/owner/selectDecisionDetail`
- 同文件新增 store 方法 `fetchDecisionDetail(applyNo)`，返回 `decisionId`、`decisionType`（保留 `raw`）
- `object-detail.vue` 修改 `onVoting`：取 `applyNo` 调 `fetchDecisionDetail`，取到后跳转 `/pages_owner/decision/detail?id=xxx&type=xxx`
- 缺少参数或接口无有效数据时给出 toast 提示

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`src/pages_maintain_project/maintainProject.js`、`src/pages_maintain_project/object-detail.vue`、`src/pages_owner/decision/detail.vue`
- 来源会话ID：2556aaf2-f445-49f4-aeff-5894b26d8360
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_detail_flow",
  "source_extraction_id": "737837da48e84bd3b1294514eb020349",
  "version": 1,
  "memory_type": "entities"
}
-->