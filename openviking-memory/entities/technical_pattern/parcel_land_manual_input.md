# 项目备案新增宗地信息地块编号改手输
苏州市房地产监测V3 的 ParcelDialog.vue 内地块编号由只读选择改为 zs-input 手输。

## 实现要点
- ParcelDialog.vue 内地块编号由只读选择改为 zs-input 手输
- registeredFlag == '1' 时仍不可改
- 移除 SelectDialog 及 openLandSelect/fillFromLand/clearLandFields 逻辑

## 影响与约束
- 移除后地址面积等不再自动填充
- 保存校验须对齐后端 landPlot 接口

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/029.md
- 涉及文件：views/projectManagement/customerProject/components/ParcelDialog.vue、company/institutionRegister/detail.vue、路由信息.json、views/projectManagement/buildland/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：a315f4c9-cedc-49db-bc6e-99df0d3ae524；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "parcel_land_manual_input",
  "source_extraction_id": "c16e59fc81ec457286441b3da25ad8e7",
  "version": 1,
  "memory_type": "entities"
}
-->