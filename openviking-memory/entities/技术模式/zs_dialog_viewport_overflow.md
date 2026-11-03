# 宗地变更弹窗超视口致底部关闭按钮裁切
`zs-dialog` 在 `overflow: hidden` 下按内容算高度，宗地变更详情弹窗内详情加地图总高超过视口使 footer 被挤出可视区域。

## 问题根因
- `zs-dialog` 在 `overflow: hidden` 下按内容计算高度
- 宗地变更详情弹窗内详情加地图总高超过视口，使 footer 被挤出可视区域

## 修复方案
- `ParcelDialog.vue` 固定 `height="92vh"` 与 `top="4vh"`
- 增 `parcel-land-dialog` 样式使 body 内滚动且 footer 完整
- 地图 iframe 高改 `min(500px, 42vh)`

## 验证与归属
- 验证证据：extracted source=cursor session=d9ab42f3-48a5-4cf9-9d77-e54010a4511c
- 涉及文件：src/views/projectManagement/customerProject/changeDetail.vue、src/views/projectManagement/customerProject/components/ParcelTable.vue、src/views/projectManagement/customerProject/components/ParcelDialog.vue、src/components/zs-dialog/zs-dialog.vue、src/views/projectManagement/customerProject/components/ProjectCertificateDetailDialog.vue、src/views/autonomy/candidateCollect/components/CandidateDialog.vue
- 所属项目：苏州市房地产监测V3 zhi2-web-admin；来源会话ID：d9ab42f3-48a5-4cf9-9d77-e54010a4511c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_viewport_overflow",
  "source_extraction_id": "a62e595feba04ff1a28335d435f6b094",
  "version": 1,
  "memory_type": "entities"
}
-->