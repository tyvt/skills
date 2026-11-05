# zs-dialog下拉层被遮修复
在 zs-dialog 的 .el-dialog__wrapper 设 z-index:9999 !important 时，内部 el-select 下拉层默认 z-index 约2000会被挡住，需通过 popper-class 抬升下拉层。

## 问题根因
- zs-dialog 组件对 .el-dialog__wrapper 写了 z-index:9999 !important（见 src/components/zs-dialog/zs-dialog.vue）
- Element UI 的 el-select 下拉层默认 z-index 仅两千多，渲染在弹窗下方被遮挡，看起来像无数据

## 修复方案
- 在 parkingDialog.vue 所有 el-select 增加 popper-class="pub-parking-dialog-select-dropdown"
- 增加非 scoped 样式将该下拉层 z-index 提至 10050（高于 9999）
- 收费标准接口改为 /v2.0/benefit/pubParkingChargeStandard/page（前导/）并对返回列表做 res.rows || res.data 兼容

## 补充说明
- 「车位类型」未选「产权类型」时为空是原有逻辑，选后由 propertyRightList/publicList 填充，非 bug
- 涉及文件：src/components/zs-dialog/zs-dialog.vue、parkingDialog.vue
- 来源会话ID：7fa31206-b0fe-47be-9388-3aedc6b7e8ed；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_select_dropdown_zindex",
  "source_extraction_id": "3ae729020360482ea3dfabb58ecf123c",
  "version": 1,
  "memory_type": "entities"
}
-->