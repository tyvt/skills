# 嵌入式对话框缺少 v-if 导致关闭时出现空白
苏州房地产监测V3 中的 Bug：嵌入在 template/detail.vue 中的 zs-select-dialog 在关闭时留下空白。

## 问题根因
- 嵌入在 template/detail.vue 中的 `zs-select-dialog` 没有 `v-if`，在关闭后仍然挂载在 flex 容器 `detail-container` 的末尾。

## 修正
- 为 SelectDialog 添加 `v-if="showProjectDialog"`，在打开时挂载，在关闭时销毁。

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/105.md
- 所属项目: 苏州房地产监测V3; 会话: 31e3d43d-5804-493b-b7d0-f41ce35c1bc8; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "缺陷修复",
  "name": "inline_dialog_vif",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "entities"
}
-->
