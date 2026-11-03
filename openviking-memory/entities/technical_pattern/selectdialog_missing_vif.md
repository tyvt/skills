# 内联SelectDialog缺v-if致关闭残留空白
苏州市房地产监测V3 合同范本详情的内联 `SelectDialog` 未加 `v-if`，关闭后挂载于 flex 容器 `detail-container` 末尾产生空白占位。

## 问题根因
- 合同范本详情 `template/detail.vue` 内联 `SelectDialog` 未绑定 `v-if`
- 关闭后组件仍挂载于 flex 容器 `detail-container` 末尾
- 产生空白占位符影响布局

## 解决方案
- 为 `SelectDialog` 绑定 `v-if="showProjectDialog"`
- 实现关闭即销毁，消除空白占位

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/052.md
- 涉及文件：commercialHousingSales/presale/template/detail.vue、contractRevoke/detail.vue、detailMixins.js、exchangeContract/index.vue、OperationBtnGroup/index.vue、zs-select-dialog-func.vue、zs-dialog.vue、zs-select-dialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：31e3d43d-5804-493b-b7d0-f41ce35c1bc8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "selectdialog_missing_vif",
  "source_extraction_id": "bcf0b003094a4a44a50061529cd3e1a2",
  "version": 1,
  "memory_type": "entities"
}
-->