# 物业区域面积自动重算统一修复（苏住房G）
苏住房G 在 3 个页面统一应用相同修复，使总建筑面积在粘贴、手动输入或程序化赋值后自动重算。

## 修改内容（一致）
- 移除地上/地下面积字段上的 @change 监听
- 新增 watch 监听 form.aboveFloorArea 和 form.underFloorArea
- 简化 handleChangeFloorArea 方法

## 涉及页面
- 物业管理区域编辑：property/complex/detail.vue
- 物业管理区域变更：property/complexChange/detail.vue
- 物业管理区域查询：building/complexSearch/detail.vue
- 说明：complexBuildingAuth/detail.vue 虽有同名方法，但模板无对应面积输入框，属未使用代码，未修改

## 验证与归属
- 所属项目：苏住房G；来源会话：0c58b1c2-0dda-4b30-a6fc-15ae19f0f03b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "property_area_calc",
  "source_extraction_id": "f2074fcee61d4e23857dd9d56f0de7d1",
  "version": 1,
  "memory_type": "entities"
}
-->