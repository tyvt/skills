# 派生汇总字段必须用 watch 而非 @change
苏房G 物业管理区域编辑页中由子字段相加得出的只读派生字段（如总建筑面积），挂 @change 会因复制粘贴/程序化赋值不触发而存脏数据。

## 问题根因
- 原实现把重算挂在子字段 `@change` 上，@change 语义是「用户交互引发的值变化」
- 鼠标右键粘贴、拖拽填充、上游回填、程序化赋值只改 model 不派发 change，监听不触发
- 总建筑面积又是只读展示/参与保存字段，于是静默存成脏数据

## 解决方案
- 改用 `watch` 监听 `form.aboveFloorArea` 与 `form.underFloorArea`（可带 `immediate: true` 保证详情回填后立刻算一遍）
- `handleChangeFloorArea` 只留纯计算体、不再绑模板 change 事件
- 三处同构页面一次改齐：`property/complex/detail.vue`（编辑）、`property/complexChange/detail.vue`（变更）、`building/complexSearch/detail.vue`（查询）
- 先 grep 同名方法：`complexBuildingAuth/detail.vue` 有同名 handleChangeFloorArea 但模板无对应面积输入框，属死代码勿改

## 验证与归属
- 推论：凡是只读派生字段（合计、面积、里程、比例）都由 watch 驱动，勿依赖交互事件
- 验证：移除面积字段 @change、新增 watch 监听 aboveFloorArea/underFloorArea，同步到 complex、complexChange、complexSearch 三处
- 涉及文件：zhi2-web-admin/src/views/property/complex/detail.vue、property/complexChange/detail.vue、building/complexSearch/detail.vue
- 所属项目：苏住房G；来源会话：0c58b1c2-0dda-4b30-a6fc-15ae19f0f03b；代码基线：320507d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "derived_field_watch",
  "source_extraction_id": "38ebea9130674fadb31f6f1b20393453",
  "version": 1,
  "memory_type": "entities"
}
-->