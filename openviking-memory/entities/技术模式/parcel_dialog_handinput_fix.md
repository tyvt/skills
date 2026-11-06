# 项目备案宗地信息地块编号改手输
苏州市房地产监测V3 项目将项目备案新增宗地信息弹窗的地块编号改为手动输入。

## 修改位置
- zhi2-web-admin/src/views/projectManagement/customerProject/components/ParcelDialog.vue
- 由 ParcelTable 在备案详情中引用

## 变更说明
- 地块编号：由只读+搜索图标弹窗选择，改为普通 zs-input，占位符「请输入地块编号」
- 已备案宗地（registeredFlag == '1'）仍不可改编号
- 移除 SelectDialog 及 openLandSelect / fillFromLand / clearLandFields 等相关逻辑
- 其余字段（不动权证号、用途、面积等）仍须自行填写

## 使用注意
- 改手输后不再自动带出地址、面积、出让价等，需逐项录入
- 保存报编号重复或校验失败需与后端 landPlot 接口规则对齐
- 变更流程若用同一弹窗行为一并生效

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：a315f4c9-cedc-49db-bc6e-99df0d3ae524
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parcel_dialog_handinput_fix",
  "source_extraction_id": "d2241605997b4738a763da461ea5ccb9",
  "version": 1,
  "memory_type": "entities"
}
-->