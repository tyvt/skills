# zs-table-column 误判 v-if 未渲染列为自定义列
列表页用 v-for + v-if 动态渲染 zs-table-column 时整表列宽塌陷成固定 80px，根因为插槽误判。

## 现象
- 列表页动态渲染列时整表列宽塌陷成固定窄列（如 80px），自动宽度没生效。

## 根因
- zs-table-column 检测到 $scopedSlots.default 存在即按自定义插槽列固定列宽；Vue2 在 v-for+v-if 下为每列注册插槽函数，即使 v-if=false 也误判为自定义列。

## 解决方案
- 修复必须落在公共组件 zs-table-column（不能只改单个业务文件，全项目多处同样问题）。
- 新增 hasEffectiveCustomSlot 实际执行插槽函数判断真渲染内容，过滤 v-if=false 空插槽。
- 新增 isMeasurableFlexSlot 区分文本类插槽（弹性 min-width）与复杂组件插槽（固定 width，可用 slot-width 覆盖）。
- 新增 measureSlotContentWidth 从插槽 vnode 提取文本算列宽；watch isFlexColumn 动态注册/注销弹性列保证 fit 正确。
- 业务文件恢复原插槽写法，个别复杂插槽列偏窄加 slot-width。

## 关联信息
- 涉及文件：src/components/zs-table/zs-table-column.vue、src/views/credit/evaluationPlanReport/index.vue。
- 所属项目：园区物管2.0；来源会话：0c43b56c-d4b3-4a08-9e9f-7c6394b3a716；代码基线：8f4427ecd。
- 验证：会话 0c43b56c 用户要求改公共组件，最终实现三个函数修复。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "zstable_column_slot",
  "source_extraction_id": "300b3a9ed67245bca01dea527f6bd86b",
  "version": 1,
  "memory_type": "entities"
}
-->
