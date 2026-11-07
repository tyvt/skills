# 备案新增宗地编号改手输并移除选地逻辑
苏州市房地产监测V3 的 ParcelDialog.vue 将地块编号由只读+SelectDialog 选择改为 zs-input 手输，并移除选地逻辑。

## 变更内容
- 地块编号由只读 + SelectDialog 选择改为 `zs-input` 手输
- 已备案宗地（`registeredFlag=='1'`）仍禁用编号输入
- 移除 `openLandSelect`/`fillFromLand` 等选地逻辑，地址面积等字段改为逐项录入

## 注意事项
- 需对齐后端 `landPlot` 接口校验

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/229.md
- 涉及文件：company/institutionRegister/detail.vue、路由信息.json、projectManagement/customerProject/components/ParcelDialog.vue、projectManagement/buildland/detail.vue
- 来源会话：a315f4c9-cedc-49db-bc6e-99df0d3ae524；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parcel_dialog_manual_input",
  "source_extraction_id": "4fe7174ff6a848f997b961c458a1194b",
  "version": 1,
  "memory_type": "entities"
}
-->