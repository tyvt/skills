# 户室管理列表操作列按钮顺序修复
苏州市房地产监测V3 项目中，户室管理列表操作列按钮顺序与项目默认不一致的问题已修复。

## 问题根因
- projectManagement/houseinfo/index.vue（户室管理列表）操作列 buttons 被写成「编辑 → 查看」
- 项目默认顺序（见 table.js）为「查看 → 编辑」

## 修复内容
- 将按钮配置改为与默认一致：buttons 返回 [this.viewButton, this.editButton]
- 刷新后操作列显示：查看（蓝色）在前，编辑（白底边框）在后
- 已备案行的编辑按钮仍按 disableButton 逻辑禁用

## 涉及文件与归属
- 涉及文件：projectManagement/houseinfo/index.vue、table.js
- 所属项目：苏州市房地产监测V3
- 来源会话ID：8ea4efe8-fef1-4e59-9f97-854556663559；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "houseinfo_buttons",
  "source_extraction_id": "2f30ec58d9394013bd84cd5ef6e15455",
  "version": 1,
  "memory_type": "entities"
}
-->