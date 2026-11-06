# 合同范本详情SelectDialog残留空白修复
修复了苏州市房地产监测V3中合同范本详情页因内联SelectDialog缺少v-if导致关闭后残留空白区域的问题。

## Description
- 现象：合同范本详情页底部多出一块空的「项目名称」弹窗状空白区域。
- 根因：项目选择用内联 `SelectDialog`，未像其它详情页加 `v-if`；弹窗关闭后组件仍挂在 flex 布局的 `detail-container` 末尾，`zs-select-dialog` 壳子占出空白。

## Solution
- 在 `template/detail.vue` 的 `SelectDialog` 增加 `v-if="showProjectDialog"`，仅点击「项目名称」打开时挂载，关闭后销毁。

## Verification
- 验证方式：重新进入新增合同范本详情确认底部干净；点项目名称弹窗应正常打开；若异常需说明是整块白底还是带标题/关闭按钮的框。
- 涉及文件：zhi2-web-admin/src/views/commercialHousingSales/presale/template/detail.vue。
- 所属项目：苏州市房地产监测V3；来源会话ID：31e3d43d-5804-493b-b7d0-f41ce35c1bc8。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_selectdialog_vif",
  "source_extraction_id": "23d2035267364d4a8767fdb7aec62216",
  "version": 1,
  "memory_type": "entities"
}
-->