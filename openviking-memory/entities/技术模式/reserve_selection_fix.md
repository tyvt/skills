# 物业管理区域备案跨页保留选中修复
产品2.0 物业管理区域备案列表全选含未备案数据点击同步时，因跨页保留选中导致校验失败。

## 问题原因
- `zs-select-column` 默认 `reserve-selection: true` 跨页保留选中
- 第1页全选含未备案数据后翻页再全选，`this.ids` 仍含第1页未备案 ID
- 点击「权利人信息同步」接口校验到未备案数据并提示

## 修复要点
- `complex/index.vue` 设置 `:reserve-selection="false"`
- 重写 `listCallback`，翻页/搜索加载新数据后调用 `clearSelection()`
- 翻页后选中重置，同步只提交当前页实际选中数据

## 涉及文件
- zhi2-web-admin/src/views/property/complex/index.vue
- zhi2-web-admin/src/mixins/listMixins.js

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：f30c7962-32af-468a-9d91-311b5e899302

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "reserve_selection_fix",
  "source_extraction_id": "3f14e79c13954057ad98487b06daa383",
  "version": 1,
  "memory_type": "entities"
}
-->