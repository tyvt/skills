# 户室管理操作列按钮顺序配置颠倒
苏州市房地产监测V3 的户室管理列表操作列按钮误写为编辑→查看，与默认查看→编辑顺序不符，已修复。

## 问题根因
- `projectManagement/houseinfo/index.vue` 操作列 `buttons` 误写为 `[this.editButton, this.viewButton]`
- 与 `table.js` 默认查看→编辑顺序不符导致按钮顺序颠倒

## 修复方案
- 按钮配置改为 `return [this.viewButton, this.editButton]` 恢复查看→编辑顺序

## 验证与归属
- 验证证据：extracted source=cursor session=8ea4efe8-fef1-4e59-9f97-854556663559
- 涉及文件：houseinfo/index.vue、houseinfo/detail.vue、building/house/index.vue、listMixins.js、table.js
- 来源会话ID：8ea4efe8-fef1-4e59-9f97-854556663559

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "houseinfo_button_order",
  "source_extraction_id": "64e817141a014c119f2d75e08fa51c85",
  "version": 1,
  "memory_type": "entities"
}
-->