# 预售楼幢列表工程形象进度即时维护修复
苏州市房地产监测V3 中预售许可详情页与楼幢表的工程形象进度即时维护已修复，保存后保持编辑态并支持补保存。

## detail.vue 改动
- `editCallback`：保存后不再切到查看态，改为调用 `refreshDetailSnapshot()` 刷新楼幢快照并保持编辑态
- `refreshDetailSnapshot()`：封装可 await 的详情刷新
- `saveForProgress()`：进度维护前的补保存（校验 + `/save`，不跳转查看页）
- `openProgressDialog()`：检测无 `presalePermitBuildingId` 的楼幢 → 确认后自动保存 → 刷新详情 → 再打开进度弹窗

## PresaleBuildingTable.vue 改动
- `handleProgressMaintain`：将完整勾选行传给父组件，由 `openProgressDialog` 处理补保存逻辑
- `progressButtonTitle`：未保存楼幢时显示提示

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：presale/permit/components/detail.vue、presale/permit/components/PresaleBuildingTable.vue、presale-permit-helpers.js、presale-permit-real-api-flow.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：4ad74818-9e10-4ec9-a586-ce529fd33e4b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_progress_fix",
  "source_extraction_id": "79970fc9e96f4f2f88b06a0b0e2a2a8f",
  "version": 1,
  "memory_type": "entities"
}
-->