# 旧对话框因缺少 visible prop 而隐藏
在项目 Suzhou Real Estate Monitoring V3 中，当使用 `propsData: { visible: true }` 挂载时，未声明 `visible` prop 的旧对话框会被 Vue 2 隐藏；已通过 Shell `render` 在 `props` 和 `attrs` 中传递 `visible` 进行修复。

## 问题根因
- 旧对话框（例如：`superviseDialog.vue`）未声明 prop `visible`
- Vue 2 丢弃了 `propsData` 中未声明的字段
- 挂载后，对话框被隐藏

## 修复
- `mountDialog.js` 开始使用 Shell `render` 并通过 `props` 和 `attrs` 传递 `visible`
- 对话框组件添加了 `visible`/`syncVisible` 定义
- 影响风险登记详情页面（`riskregister/detail.vue`）

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/069.md
- 涉及文件: riskregister/detail.vue, superviseDialog.vue, selectDialog/index.js, superviseProject.js, generic.js, mountDialog.js, detailMixins.js, zs-input.vue
- 会话: 643201ce-b344-4b8f-9d1d-ca5948636201; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mount_dialog_visible",
  "source_extraction_id": "3b0e49c9a828485693063aa7ee803883",
  "version": 1,
  "memory_type": "entities"
}
-->