# 预售许可流程信息抽屉宽度自适应
苏州市房地产监测V3 的「流程信息」抽屉宽度已改为按节点数量与名称长度动态计算，避免步骤条被裁切。

## 原因
- 预售许可详情「流程信息」打开 `attachmentDraw.vue` 右侧抽屉，宽度原先固定 480px
- `ApprovalProcess` 顶部横向步骤条节点多或名称长时会被 Element UI 省略显示（如「维护预售公…」）

## 修改要点
- `flowApi.js` 新增 `computeApprovalDrawerWidth`：默认最小 480px，按节点数与最长节点名估算，上限视口 85%
- `attachmentDraw.vue` 审核流程 Tab 用动态 `:size`，打开先回最小宽，流程数据加载后再加宽
- `ApprovalProcess/index.vue` 节点列表拉取完成后 `$emit('drawer-width-change')` 通知父级
- `ApprovalHeader.vue` 节点描述允许换行，步骤条区域改 `min-height` 避免多行被裁切

## 影响范围与归属
- 影响所有「制单信息 / 审核流程 / 附件信息」抽屉查看流程的详情页（含预售许可申请），不仅限于预售模块
- 涉及文件：attachmentDraw.vue、flowApi.js、ApprovalProcess/index.vue、ApprovalHeader.vue
- 所属项目：苏州市房地产监测V3；来源会话：1a75c0f7-7b23-4efc-83cd-c2e23b96bd02；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "approval_drawer_width",
  "source_extraction_id": "16a1550171f04a6c8f38bcb58d4c2d6a",
  "version": 1,
  "memory_type": "entities"
}
-->
